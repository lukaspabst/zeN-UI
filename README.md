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

## Component List (48 Total)

### General & Actions
- `<zen-button>` - Standard button with variants (primary, secondary, ghost, etc.)
- `<zen-magnetic-button>` - Button with magnetic cursor attraction
- `<zen-morph-button>` - Button with shape-shifting effects
- `<zen-icon>` - SVG icon component
- `<zen-text>` - Typography with gradient support

### Data Display & Cards
- `<zen-card>` - Basic container
- `<zen-spotlight-card>` - Card with mouse-following spotlight
- `<zen-tilt-card>` - 3D tilt effect with parallax
- `<zen-flip-card>` - Card with flip animation
- `<zen-aurora-border>` - Animated gradient border container
- `<zen-hover-card>` - Card with hover effects
- `<zen-badge>` - Status indicator/label
- `<zen-avatar>` - Profile image with status
- `<zen-table>` - Data table
- `<zen-skeleton>` - Loading placeholder
- `<zen-accordion>` - Collapsible content sections
- `<zen-calendar>` - Date picker
- `<zen-counter>` - Animated number counter
- `<zen-bar-chart>` - Bar chart visualization
- `<zen-donut-chart>` - Donut chart visualization

### Forms & Inputs
- `<zen-input>` - Text input field
- `<zen-textarea>` - Multi-line text input
- `<zen-select>` - Dropdown selection
- `<zen-checkbox>` - Boolean toggle box
- `<zen-radio>` - Radio button
- `<zen-switch>` - Toggle switch

### Feedback & Overlay
- `<zen-dialog>` - Modal dialog
- `<zen-toast>` - Toast notifications (use `toast()` helper)
- `<zen-tooltip>` - Hover tooltip
- `<zen-progress>` - Linear progress bar
- `<zen-circular-progress>` - Circular progress indicator

### Navigation
- `<zen-tabs>` - Tabbed navigation
- `<zen-breadcrumbs>` - Breadcrumb navigation
- `<zen-navbar>` - Top navigation bar
- `<zen-nav-link>` - Navigation link
- `<zen-nav-button>` - Navbar button
- `<zen-footer>` - Page footer
- `<zen-command-palette>` - Command/Search modal (Ctrl+K)
- `<zen-hamburger-menu>` - Mobile menu toggle
- `<zen-notification-bell>` - Notification dropdown

### Theme
- `<zen-theme-toggle>` - Light/Dark/System toggle
- `<zen-theme-picker>` - Advanced color theme selector

### Special Effects & Backgrounds
- `<zen-particles>` - Background particle animation
- `<zen-gradient-blob>` - Animated gradient blobs

### Text Effects & Animations
- `<zen-typewriter>` - Typewriter text effect
- `<zen-marquee>` - Scrolling text marquee
- `<zen-glitch-text>` - Glitch animation text
- `<zen-text-reveal>` - Animated text reveal

## Development
1. Clone the repository.
2. Run `npm install`.
3. Run `npm run storybook` to view components.

## Documentation
For detailed API documentation, see [AI_GUIDE.md](./AI_GUIDE.md).
