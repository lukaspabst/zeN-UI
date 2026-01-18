# AI / LLM Usage Guide

This file is designed to help AI agents understand and generate code for the ZEN UI Library.

## Core Concepts
- **Technology**: Web Components (Lit)
- **Prefix**: `zen-` (e.g., `zen-button`, `zen-card`)
- **Styling**: internal shadow DOM + CSS variables for tokens.

## Design Tokens (CSS Variables)
Use these variables to match the library's design system.

### Colors
- `--zen-primary`: Main brand color.
- `--zen-bg-0` to `--zen-bg-3`: Surface layers (0=darkest/back, 3=lightest/front).
- `--zen-text-1`: Primary text (white/black).
- `--zen-text-2`: Secondary text (muted).
- `--zen-glass-bg`: Glassmorphism background.
- `--zen-glass-border`: Glassmorphism border.

### Radii
- `--zen-radius-sm`: 12px
- `--zen-radius-md`: 16px
- `--zen-radius-lg`: 24px
- `--zen-radius-full`: 9999px

## Component Reference (Full API)

### General

#### `<zen-button>`
- **Props**: `variant` ("primary" | "secondary" | "outline" | "ghost" | "destructive" | "glass"), `size` ("sm" | "md" | "lg"), `disabled` (bool), `loading` (bool), `block` (bool).
- **Slots**: default (label).
- **Usage**: `<zen-button variant="primary" loading>Submit</zen-button>`

#### `<zen-text>`
- **Props**: `variant` ("h1"-"h6" | "body-lg" | "body" | "body-sm" | "caption"), `weight` ("light" | "regular" | "medium" | "semibold" | "bold"), `gradient` ("none" | "aurora" | "gold" | "blue"), `italic` (bool), `mono` (bool).
- **Usage**: `<zen-text variant="h1" gradient="aurora">Title</zen-text>`

#### `<zen-icon>`
- **Props**: `name` (string, see Assets), `variant` ("default" | "glow" | "filled"), `size` (string, default "24px"), `color` (string).
- **Usage**: `<zen-icon name="heart" variant="filled" color="red"></zen-icon>`

### Data Display

#### `<zen-card>`
- **Props**: `hover` (bool), `clickable` (bool), `variant` ("default" | "glass" | "gradient").
- **Slots**: `header`, `media`, `footer`, default.
- **Usage**: `<zen-card hover><span slot="header">Title</span>Content</zen-card>`

#### `<zen-badge>`
- **Props**: `variant` ("neutral" | "brand" | "success" | "warning" | "danger"), `dot` (bool).
- **Usage**: `<zen-badge variant="success" dot>Active</zen-badge>`

#### `<zen-avatar>`
- **Props**: `src` (string), `alt` (string), `size` ("sm" | "md" | "lg"), `status` ("online" | "offline" | "away" | "busy").
- **Usage**: `<zen-avatar src="..." status="online"></zen-avatar>`

#### `<zen-table>`
- **Props**: `headers` (string[]), `data` (any[]).
- **Usage**: `<zen-table .headers="${['ID', 'Name']}" .data="${rows}"></zen-table>`

#### `<zen-accordion>`
- **Props**: `items` ({ title: string, content: string }[]).
- **Usage**: `<zen-accordion .items="${[{title: 'A', content: 'B'}]}"></zen-accordion>`

### Forms

#### `<zen-input>`
- **Props**: `label`, `placeholder`, `type`, `value`, `error`, `helper`, `disabled`.
- **Usage**: `<zen-input label="Email" type="email" error="Invalid"></zen-input>`

#### `<zen-textarea>`
- **Props**: `label`, `placeholder`, `rows`, `value`, `resize` ("none"|"vertical").
- **Usage**: `<zen-textarea label="Bio" rows="4"></zen-textarea>`

#### `<zen-select>`
- **Props**: `label`, `options` ({ label: string, value: any }[]), `value`.
- **Usage**: `<zen-select label="City" .options="${opts}"></zen-select>`

#### `<zen-checkbox>`
- **Props**: `checked` (bool), `disabled` (bool), `required` (bool).
- **Slots**: default (label).
- **Usage**: `<zen-checkbox checked>I agree</zen-checkbox>`

#### `<zen-radio>`
- **Props**: `checked` (bool), `name`, `value`, `disabled`.
- **Slots**: default (label).
- **Usage**: `<zen-radio name="opt" value="1">Option 1</zen-radio>`

#### `<zen-switch>`
- **Props**: `checked` (bool), `disabled` (bool).
- **Usage**: `<zen-switch checked></zen-switch>`

### Feedback

#### `<zen-dialog>`
- **Props**: `open` (bool), `title` (string).
- **Slots**: default (content), `footer`.
- **Usage**: `<zen-dialog open title="Alert">Msg...</zen-dialog>`

#### `<zen-toast>`
- **Usage**: JS Function. `import { toast } from '@zen-ui/library'; toast('Msg', 'success');`

#### `<zen-tooltip>`
- **Props**: `content` (string), `position` ("top"|"bottom"|"left"|"right").
- **Slots**: default (trigger element).
- **Usage**: `<zen-tooltip content="Info"><button>Hover</button></zen-tooltip>`

#### `<zen-progress>`
- **Props**: `value` (0-100), `max` (100), `variant` ("default"|"gradient").
- **Usage**: `<zen-progress value="50"></zen-progress>`

### Navigation

#### `<zen-tabs>`
- **Props**: `tabs` (string[]), `activeTab` (number).
- **Events**: `@change` (detail: index).
- **Usage**: `<zen-tabs .tabs="${['A','B']}" activeTab="0"></zen-tabs>`

## Common Assets
- **Icons**: `home`, `user`, `settings`, `bell`, `search`, `calendar`, `mail`, `heart`, `star`, `check`, `x`, `chevron-down`, `chevron-right`... (see `src/lib/assets/icons.ts`)

