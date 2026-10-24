# TaskFlow

Aplicação local de gestão de tarefas e projetos, baseada nas telas de referência e nos requisitos do documento `TASK FLOW.docx`.

## Iniciar

Requer Node.js 20 ou superior. Não há dependências externas para instalar.

```bash
npm start
```

Abra [http://127.0.0.1:4173](http://127.0.0.1:4173). O primeiro início cria `data/taskflow.json`, com conteúdo demonstrativo que pode ser editado e substituído pelos dados reais.

Para alterar a porta, defina `PORT` antes de iniciar. O servidor escuta somente no endereço local `127.0.0.1`.

## O que está disponível

- Dashboard com resumo de tarefas, prazos, atrasos e progresso.
- Projetos e tarefas com busca, filtros e ordenação.
- Quadro Kanban com as quatro etapas e movimentação por arrastar e soltar.
- Formulário de tarefas com prioridade, projeto, responsável, prazo, categoria e etiquetas.
- Cadastro e exclusão de responsáveis em Configurações; ao excluir, as tarefas relacionadas ficam sem responsável.
- Detalhes com comentários e subtarefas.
- Tarefas podem ser arquivadas e restauradas pela lista, ou excluídas permanentemente nos detalhes.
- Calendário mensal, indicadores e exportação JSON dos dados.
- Tema claro/escuro e layout adaptado para computador, tablet e celular.

## Dados e escopo

O servidor local salva os dados em `data/taskflow.json`, preservando alterações entre reinícios. Os arquivos de dados são excluídos do controle de versão. Não há login, sincronização entre dispositivos, anexos binários ou permissões multiusuário: o documento de requisitos lista essas decisões como pendentes ou fora do escopo atual. O acesso é individual à instância local; qualquer usuário do mesmo computador com acesso ao arquivo pode ler ou alterar esses dados.

Os anexos e a personalização das etapas também não foram incluídos. As quatro etapas usam identificadores internos estáveis (`todo`, `in_progress`, `review`, `done`). O progresso é calculado como tarefas concluídas dividido pelo total de tarefas do projeto ou workspace.

## Tecnologias

Interface: HTML, CSS e JavaScript sem framework. Backend: Node.js com módulos nativos e HTTP/JSON. O armazenamento não requer banco de dados ou rede externa. As famílias tipográficas do guia visual são servidas pelo Google Fonts quando há conexão; o sistema continua funcional sem elas, usando fontes de fallback.

Compatibilidade prevista: versões atuais de navegadores modernos com suporte a ES modules, `fetch`, `dialog`, `crypto.randomUUID` e CSS Grid. Funcionalidade e aparência podem variar em versões antigas.
