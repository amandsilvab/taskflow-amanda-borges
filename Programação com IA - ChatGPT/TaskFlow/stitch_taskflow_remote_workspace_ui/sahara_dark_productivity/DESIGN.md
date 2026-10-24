---
name: Sahara Dark Productivity
colors:
  surface: '#121316'
  surface-dim: '#121316'
  surface-bright: '#38393c'
  surface-container-lowest: '#0d0e11'
  surface-container-low: '#1b1b1f'
  surface-container: '#1f1f23'
  surface-container-high: '#292a2d'
  surface-container-highest: '#343538'
  on-surface: '#e3e2e6'
  on-surface-variant: '#dcc1b4'
  inverse-surface: '#e3e2e6'
  inverse-on-surface: '#2f3034'
  outline: '#a48c80'
  outline-variant: '#554339'
  surface-tint: '#ffb68d'
  primary: '#ffb68d'
  on-primary: '#532200'
  primary-container: '#e07a38'
  on-primary-container: '#4f2000'
  inverse-primary: '#9b4600'
  secondary: '#ffb68e'
  on-secondary: '#542200'
  secondary-container: '#8d3d00'
  on-secondary-container: '#ffba96'
  tertiary: '#ffb86d'
  on-tertiary: '#492900'
  tertiary-container: '#c88841'
  on-tertiary-container: '#462600'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbc9'
  primary-fixed-dim: '#ffb68d'
  on-primary-fixed: '#331200'
  on-primary-fixed-variant: '#763300'
  secondary-fixed: '#ffdbca'
  secondary-fixed-dim: '#ffb68e'
  on-secondary-fixed: '#331200'
  on-secondary-fixed-variant: '#773300'
  tertiary-fixed: '#ffdcbd'
  tertiary-fixed-dim: '#ffb86d'
  on-tertiary-fixed: '#2c1600'
  on-tertiary-fixed-variant: '#693c00'
  background: '#121316'
  on-background: '#e3e2e6'
  surface-variant: '#343538'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 30px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 26px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0em
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0.005em
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system expresses a focused, calm, and architectural environment tailored for high-output knowledge work and execution flow. The visual tone is warm minimalist: quiet, refined surfaces with intentional, high-contrast focal points.

- **Brand Personality**: Cerebral, disciplined, grounded, and uncompromisingly premium. It rejects sterile cold greys in favor of mineral-infused charcoal tones energized by an ember-like terracotta accent.
- **Target Audience**: Technical operators, directors, and independent specialists requiring low cognitive drag, visual quietude during extended sessions, and rapid task manipulation.
- **Design Movement**: Elevated Architectural Minimalism. The design pairs subtle planar shifts with disciplined, hairline micro-borders and zero superfluous ornamentation. Layering and proximity supersede loud gradients or excessive surface diffusion.

## Colors

The palette establishes an ergonomic, deep dark atmosphere optimized for sustained work in variable lighting conditions while upholding strict WCAG AAA contrast ratios across text and actionable elements.

- **Base Canvas (`#121316`)**: The foundation plane. Provides immediate visual relief without reaching the optical harshness of pure black.
- **Surface Elevation 1 (`#1a1c21`)**: Primary container, card, and sidebar background tone. Creates subtle differentiation from the ground canvas.
- **Surface Elevation 2 (`#242730`)**: Elevated components, floating popovers, tooltips, and active task row highlights.
- **Micro-Borders & Dividers (`#2e323b`)**: Structural separation and component boundary definition. Never exceeds 1px.
- **Primary Terracotta Accent (`#e07a38`)**: Focal actions, key status milestones, primary completion triggers, and brand emphasis. Contrast-tuned against dark backdrops.
- **Deep Amber/Burnt Orange (`#c2652a`)**: Pressed states, active indicators, and secondary visual anchors.
- **Foreground Primary (`#f3f4f6`)**: Crisp, readable body and heading text delivering >= 7:1 contrast ratios.
- **Foreground Muted (`#9ca3af`)**: Metadata, secondary descriptors, timestamps, and placeholder copy.

## Typography

The typographic hierarchy balances structural precision with effortless legibility. 

- **Space Grotesk** serves as the display and headline typeface. Its geometric construction, mechanical joints, and subtle industrial character reinforce a focused, engineered workspace.
- **Hanken Grotesk** delivers a clean, high-density, low-fatigue experience across body text, tabular displays, labels, and microcopy. Its generous x-height maintains exceptional clarity against dark charcoal surfaces.
- All uppercase metadata labels utilize tracking adjustments (`0.02em` to `0.04em`) to prevent optical crowding in compact interfaces.

## Layout & Spacing

The structural layout relies on an 8pt base grid system adapted for high-density information architecture.

- **Desktop (1024px and above)**: 12-column layout with a fixed or collapsible navigation rail (240px default, 64px collapsed), 24px (`gutter-desktop`) column gutters, and 48px (`margin-desktop`) outer margins.
- **Tablet (768px - 1023px)**: 8-column layout, 16px (`gutter`) gutters, and 32px (`margin-tablet`) outer margins. Multi-column task views reflow to 2-column or stacked vertical boards.
- **Mobile (< 768px)**: 4-column layout with 16px (`margin`) margins and 16px (`gutter`) gutters. Primary action bars pin to the bottom viewport boundary with safe area padding.
- **Rhythm & Proximity**: Functional groups maintain internal spacing using `space-xs` (4px) and `space-sm` (8px). Structural cards and modular sections divide via `space-md` (16px) and `space-lg` (24px). Large functional segments are separated by `space-xl` (40px).

## Elevation & Depth

This design system rejects heavy, hazy drop shadows in favor of tonal plane elevation paired with razor-sharp micro-borders.

- **Ground Level (Canvas)**: `#121316` flat surface. No borders, no shadows.
- **Level 1 (Panels & Grouped Containers)**: `#1a1c21` surface bounded by a crisp `1px solid #2e323b` border. Provides clear spatial containment without optical weight.
- **Level 2 (Modals, Overlays, Floating Menus)**: `#242730` surface bounded by a `1px solid #3d424e` highlight border, anchored by an ambient directional shadow: `0px 12px 32px -4px rgba(0, 0, 0, 0.65), 0px 4px 12px -2px rgba(0, 0, 0, 0.45)`.
- **Focus States**: High-contrast outline using `2px solid #e07a38` with an offset of `2px` against the background plane, guaranteeing instantaneous keyboard navigation visibility.

## Shapes

The shape hierarchy is compact, controlled, and architectural (`roundedness: 1`):

- **Standard Components (0.25rem / 4px)**: Default for buttons, inputs, task list line items, badges, and segmented toggles. Retains an authoritative, tool-like posture.
- **Containers & Panels (0.5rem / 8px)**: Standard for project boards, slide-out drawer edges, card enclosures, and modal dialogs.
- **Pills & Round Elements (Full radius)**: Reserved exclusively for avatars, notification counters, and circular action toggles.

## Components

### Buttons
- **Primary**: Background `#e07a38`, text `#121316` (bold for maximum readability). Hover: `#c2652a`. Active: `#a85420`. Border-radius: 4px.
- **Secondary**: Background `#242730`, text `#f3f4f6`, border `1px solid #2e323b`. Hover: background `#2e323b`, border-color `#3d424e`.
- **Ghost**: Background transparent, text `#9ca3af`. Hover: text `#f3f4f6`, background `#1a1c21`.
- **Destructive**: Background transparent, text `#f87171`, border `1px solid #7f1d1d`. Hover: background `#450a0a`.

### Task Cards & Rows
- **Container**: Background `#1a1c21`, border `1px solid #2e323b`, radius 4px, padding 12px 16px.
- **Hover / Focus**: Surface transitions to `#242730`, micro-border tints toward `#3d424e`.
- **Completed State**: Text `#9ca3af` with line-through; completion checkmark filled with `#e07a38`.

### Input Fields & Search Bars
- **Frame**: Background `#121316`, border `1px solid #2e323b`, radius 4px, text `#f3f4f6`, placeholder `#9ca3af`.
- **Focused**: Border `1px solid #e07a38`, ring `2px solid rgba(224, 122, 56, 0.2)`.

### Checkboxes & Radio Controls
- **Checkbox**: Dimensions 16px x 16px, border `1.5px solid #3d424e`, radius 3px, background `#121316`. Checked: background `#e07a38`, border-color `#e07a38`, check icon `#121316`.
- **Radio**: Outer ring 16px x 16px, radius full. Selected: border `#e07a38`, inner pip 6px `#e07a38`.

### Chips & Priority Badges
- **Urgent / P1**: Background `rgba(224, 122, 56, 0.12)`, text `#e07a38`, border `1px solid rgba(224, 122, 56, 0.3)`.
- **Medium / Standard**: Background `#242730`, text `#9ca3af`, border `1px solid #2e323b`.
- **Done**: Background `rgba(34, 197, 94, 0.12)`, text `#4ade80`, border `1px solid rgba(34, 197, 94, 0.25)`.

### Productivity Flow Extras
- **Command Palette (Cmd+K)**: Backdrop `#121316` at 80% opacity with backdrop blur. Palette container `#1a1c21`, border `1px solid #3d424e`. Highlighted item `#242730` with a 2px left border strip in `#e07a38`.
- **Kanban Column Header**: Uppercase `label-sm`, tracking `0.04em`, text `#9ca3af`, with item counter wrapped in a `#242730` badge.