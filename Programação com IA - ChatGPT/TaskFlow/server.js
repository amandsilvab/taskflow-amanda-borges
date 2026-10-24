import http from 'node:http';
import { readFile, writeFile, rename, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';

const root = path.dirname(fileURLToPath(import.meta.url));
const dataDirectory = path.join(root, 'data');
const dataFile = path.join(dataDirectory, 'taskflow.json');
const port = Number(process.env.PORT || 4173);
const statuses = new Set(['todo', 'in_progress', 'review', 'done']);
const priorities = new Set(['low', 'medium', 'high']);
const mimeTypes = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon' };

function demoData() {
  const now = new Date().toISOString();
  const dateAfter = days => { const d = new Date(); d.setDate(d.getDate() + days); return d.toISOString().slice(0, 10); };
  return {
    version: 1,
    members: [
      { id: 'member-ana', name: 'Ana Silveira', area: 'Liderança técnica', email: 'ana@taskflow.example' },
      { id: 'member-marina', name: 'Marina Costa', area: 'Design de produto', email: 'marina@taskflow.example' },
      { id: 'member-lucas', name: 'Lucas Almeida', area: 'Desenvolvimento', email: 'lucas@taskflow.example' },
      { id: 'member-joao', name: 'João Ribeiro', area: 'Produto', email: 'joao@taskflow.example' }
    ],
    projects: [
      { id: 'project-taskflow', name: 'Plataforma TaskFlow', description: 'Evolução da experiência de gestão de tarefas.', color: '#fbe8d8', accent: '#c2652a', icon: 'dashboard', createdAt: now },
      { id: 'project-research', name: 'Pesquisa de produto', description: 'Entender necessidades e oportunidades para o produto.', color: '#e9e8f3', accent: '#706a99', icon: 'search_insights', createdAt: now },
      { id: 'project-brand', name: 'Identidade visual', description: 'Uma linguagem visual clara e acolhedora para o TaskFlow.', color: '#e8eee4', accent: '#5d785d', icon: 'palette', createdAt: now }
    ],
    tasks: [
      { id: 'task-brief', title: 'Revisar briefing do produto', description: 'Consolidar os requisitos e critérios de aceite para a primeira entrega.', projectId: 'project-taskflow', assigneeId: 'member-ana', status: 'todo', priority: 'high', dueDate: dateAfter(1), category: 'Produto', tags: ['planejamento', 'MVP'], subtasks: [{ id: 'subtask-brief-1', title: 'Revisar critérios de aceite', done: true }, { id: 'subtask-brief-2', title: 'Compartilhar versão final', done: false }], comments: [{ id: 'comment-brief-1', text: 'Vamos revisar os últimos pontos na próxima conversa.', author: 'Ana Silveira', createdAt: now }], createdAt: now, updatedAt: now },
      { id: 'task-dashboard', title: 'Criar wireframes do dashboard', description: 'Explorar uma hierarquia visual simples para destacar prioridades e prazos.', projectId: 'project-taskflow', assigneeId: 'member-marina', status: 'in_progress', priority: 'medium', dueDate: dateAfter(3), category: 'Design', tags: ['interface', 'dashboard'], subtasks: [], comments: [], createdAt: now, updatedAt: now },
      { id: 'task-interviews', title: 'Sintetizar entrevistas com usuários', description: 'Agrupar aprendizados e oportunidades de melhoria.', projectId: 'project-research', assigneeId: 'member-joao', status: 'review', priority: 'medium', dueDate: dateAfter(5), category: 'Pesquisa', tags: ['usuários'], subtasks: [], comments: [], createdAt: now, updatedAt: now },
      { id: 'task-colors', title: 'Definir paleta de cores', description: 'Documentar as cores principais e estados de interface.', projectId: 'project-brand', assigneeId: 'member-marina', status: 'done', priority: 'low', dueDate: dateAfter(-2), category: 'Identidade', tags: ['visual'], subtasks: [], comments: [], createdAt: now, updatedAt: now },
      { id: 'task-api', title: 'Preparar estrutura de dados local', description: 'Criar a estrutura para tarefas e projetos com armazenamento no dispositivo.', projectId: 'project-taskflow', assigneeId: 'member-lucas', status: 'todo', priority: 'high', dueDate: dateAfter(-1), category: 'Desenvolvimento', tags: ['API', 'MVP'], subtasks: [], comments: [], createdAt: now, updatedAt: now },
      { id: 'task-usability', title: 'Validar fluxo de criação de tarefa', description: 'Conferir os campos e estados do formulário de tarefa.', projectId: 'project-taskflow', assigneeId: 'member-ana', status: 'in_progress', priority: 'medium', dueDate: dateAfter(7), category: 'Produto', tags: ['usabilidade'], subtasks: [], comments: [], createdAt: now, updatedAt: now }
    ]
  };
}

let data;
let writeQueue = Promise.resolve();
async function loadStore() {
  await mkdir(dataDirectory, { recursive: true });
  try {
    data = JSON.parse(await readFile(dataFile, 'utf8'));
    if (data.version !== 1 || !Array.isArray(data.projects) || !Array.isArray(data.tasks) || !Array.isArray(data.members)) throw new Error('Formato local não reconhecido.');
    data.members = data.members.map(member => ({ ...member, area: member.area ?? member.role ?? '', email: member.email ?? '' }));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    data = demoData();
    await persist();
  }
}
function persist() {
  writeQueue = writeQueue.then(async () => {
    const temp = `${dataFile}.tmp`;
    await writeFile(temp, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
    await rename(temp, dataFile);
  });
  return writeQueue;
}
function send(response, status, value) {
  const body = value === null ? '' : JSON.stringify(value);
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': Buffer.byteLength(body), 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  response.end(body);
}
async function readBody(request) {
  let raw = '';
  for await (const chunk of request) {
    raw += chunk;
    if (Buffer.byteLength(raw) > 1024 * 1024) throw Object.assign(new Error('A solicitação excede o limite de 1 MB.'), { status: 413 });
  }
  try { return JSON.parse(raw || '{}'); } catch { throw Object.assign(new Error('Envie dados válidos em formato JSON.'), { status: 400 }); }
}
function cleanString(value, label, max = 2000, { required = false } = {}) {
  if (value === null || value === undefined) { if (required) throw Object.assign(new Error(`${label} é obrigatório.`), { status: 400 }); return ''; }
  if (typeof value !== 'string') throw Object.assign(new Error(`${label} deve ser texto.`), { status: 400 });
  const cleaned = value.trim();
  if (required && !cleaned) throw Object.assign(new Error(`${label} é obrigatório.`), { status: 400 });
  if (cleaned.length > max) throw Object.assign(new Error(`${label} deve ter até ${max} caracteres.`), { status: 400 });
  return cleaned;
}
function normalizeTask(input, existing = {}) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw Object.assign(new Error('Dados da tarefa inválidos.'), { status: 400 });
  const title = cleanString(input.title, 'Título', 140, { required: true });
  const status = input.status ?? existing.status ?? 'todo';
  const priority = input.priority ?? existing.priority ?? 'medium';
  if (!statuses.has(status)) throw Object.assign(new Error('Selecione uma etapa válida para a tarefa.'), { status: 400 });
  if (!priorities.has(priority)) throw Object.assign(new Error('Selecione uma prioridade válida.'), { status: 400 });
  const projectId = input.projectId === undefined ? existing.projectId ?? null : input.projectId;
  const assigneeId = input.assigneeId === undefined ? existing.assigneeId ?? null : input.assigneeId;
  if (projectId && !data.projects.some(project => project.id === projectId)) throw Object.assign(new Error('Você não tem permissão para acessar este projeto.'), { status: 403 });
  if (assigneeId && !data.members.some(member => member.id === assigneeId)) throw Object.assign(new Error('Selecione um responsável válido.'), { status: 400 });
  const dueDate = input.dueDate === undefined ? existing.dueDate ?? null : input.dueDate;
  if (dueDate !== null && (typeof dueDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dueDate) || Number.isNaN(Date.parse(`${dueDate}T12:00:00`)))) throw Object.assign(new Error('Informe uma data de prazo válida.'), { status: 400 });
  const tags = input.tags === undefined ? existing.tags || [] : input.tags;
  if (!Array.isArray(tags) || tags.length > 20 || tags.some(tag => typeof tag !== 'string' || tag.length > 40)) throw Object.assign(new Error('Use até 20 etiquetas com no máximo 40 caracteres cada.'), { status: 400 });
  const subtasks = input.subtasks === undefined ? existing.subtasks || [] : input.subtasks;
  if (!Array.isArray(subtasks) || subtasks.length > 100) throw Object.assign(new Error('Use até 100 subtarefas por tarefa.'), { status: 400 });
  const safeSubtasks = subtasks.map(subtask => ({ id: typeof subtask?.id === 'string' ? subtask.id.slice(0, 80) : randomUUID(), title: cleanString(subtask?.title, 'Nome da subtarefa', 140, { required: true }), done: Boolean(subtask?.done) }));
  const comments = input.comments === undefined ? existing.comments || [] : input.comments;
  if (!Array.isArray(comments) || comments.length > 500) throw Object.assign(new Error('Limite de comentários atingido.'), { status: 400 });
  const safeComments = comments.map(comment => ({ id: typeof comment?.id === 'string' ? comment.id.slice(0, 80) : randomUUID(), text: cleanString(comment?.text, 'Comentário', 2000, { required: true }), author: cleanString(comment?.author || 'Ana Silveira', 'Autor', 80), createdAt: typeof comment?.createdAt === 'string' ? comment.createdAt.slice(0, 40) : new Date().toISOString() }));
  const now = new Date().toISOString();
  return { id: existing.id || randomUUID(), title, description: cleanString(input.description ?? existing.description ?? '', 'Descrição', 5000), projectId: projectId || null, assigneeId: assigneeId || null, status, priority, dueDate, category: cleanString(input.category ?? existing.category ?? '', 'Categoria', 80), tags: [...new Set(tags.map(t => t.trim()).filter(Boolean))], subtasks: safeSubtasks, comments: safeComments, archived: input.archived === undefined ? Boolean(existing.archived) : Boolean(input.archived), createdAt: existing.createdAt || now, updatedAt: now };
}
async function serveStatic(url, response) {
  const pathname = decodeURIComponent(url.pathname);
  const requested = pathname === '/' ? 'index.html' : pathname.slice(1);
  const target = path.resolve(root, requested);
  if (target !== root && !target.startsWith(`${root}${path.sep}`)) return send(response, 403, { error: 'Acesso negado.' });
  if (target === dataDirectory || target.startsWith(`${dataDirectory}${path.sep}`) || target === path.join(root, 'server.js') || target === path.join(root, 'package.json')) return send(response, 404, { error: 'Arquivo não encontrado.' });
  try {
    const content = await readFile(target);
    response.writeHead(200, { 'Content-Type': mimeTypes[path.extname(target)] || 'application/octet-stream', 'Content-Length': content.length, 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' }); response.end(content);
  } catch { send(response, 404, { error: 'Arquivo não encontrado.' }); }
}
async function handleApi(request, response, url) {
  const method = request.method;
  const parts = url.pathname.replace(/^\/api\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  const [resource, id] = parts;
  if (method === 'GET' && resource === 'tasks' && !id) return send(response, 200, data.tasks);
  if (method === 'GET' && resource === 'projects' && !id) return send(response, 200, data.projects);
  if (method === 'GET' && resource === 'members' && !id) return send(response, 200, data.members);
  if (method === 'GET' && resource === 'export') return send(response, 200, { version: data.version, exportedAt: new Date().toISOString(), ...data });
  if (resource === 'tasks' && method === 'POST' && !id) {
    const task = normalizeTask(await readBody(request)); data.tasks.unshift(task); await persist(); return send(response, 201, task);
  }
  if (resource === 'tasks' && id && method === 'PUT') {
    const index = data.tasks.findIndex(task => task.id === id); if (index < 0) return send(response, 404, { error: 'Esta tarefa não está mais disponível.' });
    const task = normalizeTask(await readBody(request), data.tasks[index]); data.tasks[index] = task; await persist(); return send(response, 200, task);
  }
  if (resource === 'tasks' && id && method === 'DELETE') {
    const index = data.tasks.findIndex(task => task.id === id); if (index < 0) return send(response, 404, { error: 'Esta tarefa não está mais disponível.' });
    data.tasks.splice(index, 1); await persist(); return send(response, 204, null);
  }
  if (resource === 'projects' && method === 'POST' && !id) {
    const input = await readBody(request); const name = cleanString(input.name, 'Nome do projeto', 100, { required: true });
    const project = { id: randomUUID(), name, description: cleanString(input.description || '', 'Descrição', 500), color: '#fbe8d8', accent: '#c2652a', icon: 'folder_open', createdAt: new Date().toISOString() };
    data.projects.push(project); await persist(); return send(response, 201, project);
  }
  if (resource === 'projects' && id && method === 'DELETE') {
    const index = data.projects.findIndex(project => project.id === id); if (index < 0) return send(response, 404, { error: 'Este projeto não está mais disponível.' });
    data.projects.splice(index, 1); data.tasks = data.tasks.filter(task => task.projectId !== id); await persist(); return send(response, 204, null);
  }
  if (resource === 'members' && method === 'POST' && !id) {
    const input = await readBody(request); const name = cleanString(input.name, 'Nome completo', 120, { required: true });
    const area = cleanString(input.area, 'Área', 100, { required: true });
    const email = cleanString(input.email, 'E-mail', 254, { required: true }).toLocaleLowerCase('pt-BR');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw Object.assign(new Error('Informe um e-mail válido.'), { status: 400 });
    if (data.members.some(member => member.email && member.email.toLocaleLowerCase('pt-BR') === email)) return send(response, 409, { error: 'Já existe um responsável com esse e-mail.' });
    const member = { id: randomUUID(), name, area, email, createdAt: new Date().toISOString() };
    data.members.push(member); await persist(); return send(response, 201, member);
  }
  if (resource === 'members' && id && method === 'DELETE') {
    const index = data.members.findIndex(member => member.id === id); if (index < 0) return send(response, 404, { error: 'Este responsável não está mais disponível.' });
    data.members.splice(index, 1);
    data.tasks = data.tasks.map(task => task.assigneeId === id ? { ...task, assigneeId: null, updatedAt: new Date().toISOString() } : task);
    await persist(); return send(response, 204, null);
  }
  return send(response, 404, { error: 'Rota não encontrada.' });
}

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
    if (url.pathname.startsWith('/api/')) await handleApi(request, response, url);
    else if (request.method === 'GET' || request.method === 'HEAD') await serveStatic(url, response);
    else send(response, 405, { error: 'Método não permitido.' });
  } catch (error) {
    if (response.headersSent) { response.destroy(error); return; }
    send(response, error.status || 500, { error: error.status ? error.message : 'Erro local ao processar a solicitação.' });
  }
});

await loadStore();
server.listen(port, '127.0.0.1', () => console.log(`TaskFlow disponível em http://127.0.0.1:${port}`));

function shutdown() { server.close(() => process.exit(0)); }
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
