# Zen UI Library

A modern, premium Web Component library built with [Lit](https://lit.dev/).

## Installation

```bash
npm install @zen-ui/library
```

## Setup

### 1. Import Styles
Import the library's CSS variables in your main CSS file or entry point:

```css
/* In CSS */
@import '@zen-ui/library/dist/style.css';
```
Or in JavaScript/TypeScript:
```javascript
import '@zen-ui/library/dist/style.css';
```

### 2. Fonts
The library supports dynamic font loading. By default, it uses **Inter**.
To load other fonts, use the `loadGoogleFont` utility:

```javascript
import { loadGoogleFont } from '@zen-ui/library';

// Load 'Outfit', 'Space Grotesk', or 'Cinzel'
loadGoogleFont('Outfit');
```

## Usage

### Components

```html
<script type="module">
  import '@zen-ui/library';
</script>

<zen-button variant="primary">Click Me</zen-button>

<zen-text variant="h1" gradient="aurora">Hello World</zen-text>

<zen-icon name="heart" variant="glow"></zen-icon>
```

### Theming
The library uses CSS variables for theming. You can override them globally:

```css
:root {
  --zen-primary: #00C6FF;
  --zen-radius-md: 12px;
}
```

## Development
1. Clone the repository.
2. Run `npm install`.
3. Run `npm run storybook` to view components.
