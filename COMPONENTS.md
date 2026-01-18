# Component Reference

This document provides a detailed reference for all components in the Zen UI Library.

## General

### `<zen-button>`
A versatile button component with multiple variants and states.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `primary`, `secondary`, `outline`, `ghost`, `destructive`, `glass` | `'primary'` | Visual style of the button. |
| `size` | `sm`, `md`, `lg` | `'md'` | Size of the button. |
| `loading` | `boolean` | `false` | Shows a loading spinner and disables interaction. |
| `disabled` | `boolean` | `false` | Disables the button. |
| `block` | `boolean` | `false` | Makes the button take full width. |

**Example:**
```html
<zen-button variant="primary" loading>Submit</zen-button>
```

### `<zen-text>`
Typography component for consistent text styling.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `h1`...`h6`, `body-lg`, `body`, `body-sm`, `caption` | `'body'` | Text style variant. |
| `weight` | `light`, `regular`, `medium`, `semibold`, `bold` | `'regular'` | Font weight. |
| `gradient` | `none`, `aurora`, `gold`, `blue` | `'none'` | Applies a gradient text effect. |
| `italic` | `boolean` | `false` | Italicizes text. |
| `mono` | `boolean` | `false` | Uses monospace font. |

**Example:**
```html
<zen-text variant="h2" gradient="aurora">Title</zen-text>
```

### `<zen-icon>`
Renders an SVG icon from the library's collection.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | `''` | Name of the icon (e.g., 'home', 'user'). |
| `variant` | `default`, `glow`, `filled` | `'default'` | Visual style. |
| `size` | `string` | `'24px'` | CSS size value. |
| `color` | `string` | `'currentColor'` | Icon color. |

**Example:**
```html
<zen-icon name="heart" variant="filled" color="red"></zen-icon>
```

## Data Display

### `<zen-card>`
A container for content with optional header and footer.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `hover` | `boolean` | `false` | Enables hover elevation effect. |
| `clickable` | `boolean` | `false` | Adds pointer cursor and active state. |
| `variant` | `default`, `glass`, `gradient` | `'default'` | Visual style. |

**Slots:**
- `media`: Image or video content at the top.
- `header`: Title or header area.
- `(default)`: Main content.
- `footer`: Action area at the bottom.

**Example:**
```html
<zen-card hover>
  <div slot="header">Card Title</div>
  Content goes here.
</zen-card>
```

### `<zen-badge>`
Small status indicator / label.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `neutral`, `brand`, `success`, `warning`, `danger` | `'neutral'` | Color variant. |
| `dot` | `boolean` | `false` | Shows a small dot indicator. |

### `<zen-avatar>`
User profile image or initials.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | `''` | Image URL. |
| `alt` | `string` | `'Avatar'` | Alt text. |
| `size` | `sm`, `md`, `lg` | `'md'` | Size dimension. |
| `status` | `online`, `offline`, `away`, `busy` | `undefined` | Status indicator. |

## Forms

### `<zen-input>`
Text input field.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `''` | Label text. |
| `type` | `text`, `password`, `email`, etc. | `'text'` | Input type. |
| `placeholder` | `string` | `''` | Placeholder text. |
| `error` | `string` | `''` | Error message to display. |

### `<zen-switch>`
Toggle switch.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Checked state. |
| `disabled` | `boolean` | `false` | Disabled state. |

## Feedback

### `<zen-toast>`
Notification toast. Usage via function export, not usually direct component usage.

**Usage:**
```javascript
import { toast } from '@zen-ui/library';
toast('Operation successful', 'success');
```

### `<zen-dialog>`
Modal dialog.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Visibility state. |
| `title` | `string` | `''` | Dialog title. |

**Example:**
```html
<zen-dialog title="Confirm" open>
  Are you sure?
</zen-dialog>
```
