```typescript
/**
 * ZEN UI LIBRARY - AI GUIDANCE & API DEFINITIONS
 * 
 * This file provides machine-readable definitions for the Zen UI Library using TypeScript interfaces.
 * AI Agents should use these definitions to understand component properties, slots, events, and usage.
 * 
 * CORE CONCEPTS:
 * - Prefix: All components start with `zen-` (e.g., <zen-button>)
 * - Technology: Lit Web Components (Shadow DOM)
 * - Styling: CSS Variables (Design Tokens)
 */

// =============================================================================
// DESIGN TOKENS
// =============================================================================

export interface DesignTokens {
  colors: {
    primary: '--zen-primary';
    bg: {
      0: '--zen-bg-0'; // Darkest / Background
      1: '--zen-bg-1';
      2: '--zen-bg-2';
      3: '--zen-bg-3'; // Lightest / Surface
    };
    text: {
      1: '--zen-text-1'; // Primary (High Contrast)
      2: '--zen-text-2'; // Secondary (Muted)
    };
    glass: {
      bg: '--zen-glass-bg';
      border: '--zen-glass-border';
    };
  };
  radii: {
    sm: '12px' | 'var(--zen-radius-sm)';
    md: '16px' | 'var(--zen-radius-md)';
    lg: '24px' | 'var(--zen-radius-lg)';
    full: '9999px' | 'var(--zen-radius-full)';
  };
}

// =============================================================================
// 1. GENERAL & ACTIONS
// =============================================================================

/**
 * <zen-button>
 * Standard interactive button with various styles.
 */
export interface ZenButton {
  tagName: 'zen-button';
  props: {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'glass'; // Default: 'primary'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // Default: 'md'
    disabled?: boolean;
    loading?: boolean;
    block?: boolean; // Full width
  };
  slots: {
    default: any; // Button label/content
  };
  events: {
    click: MouseEvent;
  };
}

/**
 * <zen-magnetic-button>
 * Button that magnetically attracts to the cursor within a range.
 */
export interface ZenMagneticButton {
  tagName: 'zen-magnetic-button';
  props: {
    strength?: number; // Attraction strength (default 0.4)
    variant?: 'primary' | 'gradient' | 'outline' | 'glow';
    disabled?: boolean;
  };
  slots: {
    default: any;
  };
}

/**
 * <zen-morph-button>
 * Button with complex shape-shifting effects.
 */
export interface ZenMorphButton {
  tagName: 'zen-morph-button';
  props: {
    variant?: 'liquid' | 'expand' | 'bounce' | 'glow';
    disabled?: boolean;
  };
  slots: {
    default: any;
  };
}

/**
 * <zen-icon>
 * Renders an SVG icon.
 */
export interface ZenIcon {
  tagName: 'zen-icon';
  props: {
    name: string; // e.g., 'home', 'user', 'settings'
    variant?: 'default' | 'glow' | 'filled';
    size?: string; // CSS value, e.g., '24px'
    color?: string; // CSS color
  };
}

/**
 * <zen-text>
 * Typography component for consistent text styling.
 */
export interface ZenText {
  tagName: 'zen-text';
  props: {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body-lg' | 'body' | 'body-sm' | 'caption';
    weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
    gradient?: 'none' | 'aurora' | 'gold' | 'blue';
    italic?: boolean;
    mono?: boolean;
  };
  slots: {
    default: string; // Text content
  };
}

/**
 * <zen-theme-toggle>
 * Simple toggle switch for light/dark/system mode.
 */
export interface ZenThemeToggle {
  tagName: 'zen-theme-toggle';
  events: {
    'theme-change': CustomEvent<{ mode: 'light' | 'dark' | 'system' }>;
  };
}

/**
 * <zen-theme-picker>
 * Advanced picker for color themes.
 */
export interface ZenThemePicker {
  tagName: 'zen-theme-picker';
  events: {
    'color-theme-change': CustomEvent<{ theme: string }>;
  };
}

// =============================================================================
// 2. DATA DISPLAY & CARDS
// =============================================================================

/**
 * <zen-card>
 * Basic container component.
 */
export interface ZenCard {
  tagName: 'zen-card';
  props: {
    hover?: boolean; // Enable hover elevation
    clickable?: boolean;
  };
  slots: {
    default: any; // Body content
    media?: any; // Image/Video at the top
    footer?: any; // Footer actions/info
  };
}

/**
 * <zen-spotlight-card>
 * Card with a spotlight effect that follows the mouse.
 */
export interface ZenSpotlightCard {
  tagName: 'zen-spotlight-card';
  props: {
    spotlightSize?: number;
    spotlightColor?: string; // e.g., 'rgba(255, 255, 255, 0.1)'
    border?: boolean;
  };
  slots: {
    default: any;
  };
}

/**
 * <zen-tilt-card>
 * 3D Tilt effect card with optional parallax layers.
 */
export interface ZenTiltCard {
  tagName: 'zen-tilt-card';
  props: {
    intensity?: number; // Tilt intensity
    glare?: boolean; // Show glare effect
    border?: boolean;
    parallax?: boolean; // Enable parallax for children
    variant?: 'glass' | 'solid' | 'gradient' | 'neon';
  };
  slots: {
    default: any; // Children. Use `data-depth="0.5"` on children for parallax.
  };
  usage: '<zen-tilt-card parallax><h1 data-depth="0.5">3D</h1></zen-tilt-card>';
}

/**
 * <zen-hover-card>
 * Card with hover effects (distinct from basic zen-card).
 */
export interface ZenHoverCard {
  tagName: 'zen-hover-card';
  props: {
    intensity?: number;
    glare?: boolean;
  };
  slots: {
    default: any;
  };
}

/**
 * <zen-flip-card>
 * Card that flips to reveal back content.
 */
export interface ZenFlipCard {
  tagName: 'zen-flip-card';
  props: {
    trigger?: 'hover' | 'click';
    direction?: 'horizontal' | 'vertical';
    duration?: number; // ms
  };
  slots: {
    front: any;
    back: any;
  };
}

/**
 * <zen-aurora-border>
 * Container with an animated aurora gradient border.
 */
export interface ZenAuroraBorder {
  tagName: 'zen-aurora-border';
  props: {
    borderWidth?: number;
    blurAmount?: number;
    variant?: 'rainbow' | 'neon' | 'fire' | 'ocean';
  };
  slots: {
    default: any;
  };
}

/**
 * <zen-badge>
 * Small status indicator or label.
 */
export interface ZenBadge {
  tagName: 'zen-badge';
  props: {
    variant?: 'neutral' | 'primary' | 'success' | 'error' | 'warning';
  };
  slots: {
    default: string;
  };
}

/**
 * <zen-avatar>
 * User profile image with status indicator.
 */
export interface ZenAvatar {
  tagName: 'zen-avatar';
  props: {
    src: string;
    alt: string;
    status?: 'online' | 'offline' | 'away' | 'busy';
  };
}

/**
 * <zen-table>
 * Data table with structured columns.
 */
export interface ZenTable {
  tagName: 'zen-table';
  props: {
    columns: Array<{ header: string; key: string }>;
    data: Array<Record<string, any>>;
  };
}

/**
 * <zen-accordion>
 * Collapsible content sections.
 */
export interface ZenAccordion {
  tagName: 'zen-accordion';
  props: {
    multiple?: boolean; // Allow multiple items open at once
  };
  slots: {
    default: ZenAccordionItem[]; // Content must be zen-accordion-item
  };
}

export interface ZenAccordionItem {
  tagName: 'zen-accordion-item';
  props: {
    header: string;
    open?: boolean;
  };
  slots: {
    default: any; // Content when expanded
  };
}

/**
 * <zen-calendar>
 * Date picker / calendar view.
 */
export interface ZenCalendar {
  tagName: 'zen-calendar';
  props: {
    value?: string; // ISO Date 'YYYY-MM-DD'
    enableViewSwitch?: boolean;
  };
  events: {
    change: CustomEvent<string>; // Emits selected date
  };
}

/**
 * <zen-counter>
 * Animated numerical counter.
 */
export interface ZenCounter {
  tagName: 'zen-counter';
  props: {
    value: number; // Target value
    duration?: number; // Animation duration in ms
    prefix?: string;
    suffix?: string;
    decimals?: number;
    autoStart?: boolean;
  };
  methods: {
    start(): void;
  };
}

/**
 * <zen-bar-chart>
 * Simple bar chart visualization.
 */
export interface ZenBarChart {
  tagName: 'zen-bar-chart';
  props: {
    data: Array<{ label: string; value: number; color?: string }>;
    maxValue?: number;
    showValues?: boolean;
    animated?: boolean;
    horizontal?: boolean;
  };
}

/**
 * <zen-donut-chart>
 * Donut chart visualization.
 */
export interface ZenDonutChart {
  tagName: 'zen-donut-chart';
  props: {
    data: Array<{ label: string; value: number; color?: string }>;
    size?: number;
    thickness?: number;
    animated?: boolean;
    showLegend?: boolean;
    centerLabel?: string;
    centerValue?: string;
  };
}

// =============================================================================
// 3. FORMS & INPUTS
// =============================================================================

/**
 * <zen-input>
 * Text input field with optional validation state.
 */
export interface ZenInput {
  tagName: 'zen-input';
  props: {
    label?: string;
    placeholder?: string;
    type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url';
    value?: string;
    error?: string; // Error message
    helper?: string; // Helper text
    disabled?: boolean;
  };
  slots: {
    prefix?: any; // Icon/Text before input
    suffix?: any; // Icon/Text after input
  };
  events: {
    input: CustomEvent<string>;
  };
}

/**
 * <zen-textarea>
 * Multi-line text input.
 */
export interface ZenTextarea {
  tagName: 'zen-textarea';
  props: {
    label?: string;
    placeholder?: string;
    rows?: number;
    value?: string;
  };
  events: {
    input: CustomEvent<string>;
  };
}

/**
 * <zen-select>
 * Dropdown selection input.
 */
export interface ZenSelect {
  tagName: 'zen-select';
  props: {
    label?: string;
    placeholder?: string;
    options: Array<{ label: string; value: string }>;
    value?: string;
    disabled?: boolean;
  };
  events: {
    change: CustomEvent<string>;
  };
}

/**
 * <zen-checkbox>
 * Boolean toggle box.
 */
export interface ZenCheckbox {
  tagName: 'zen-checkbox';
  props: {
    checked?: boolean;
    disabled?: boolean;
  };
  slots: {
    default: string; // Label
  };
  events: {
    change: CustomEvent<boolean>;
  };
}

/**
 * <zen-radio>
 * Radio button for selection groups.
 */
export interface ZenRadio {
  tagName: 'zen-radio';
  props: {
    name: string;
    value: string;
    checked?: boolean;
    disabled?: boolean;
  };
  slots: {
    default: string; // Label
  };
  events: {
    change: CustomEvent<{ checked: boolean; value: string }>;
  };
}

/**
 * <zen-switch>
 * Toggle switch.
 */
export interface ZenSwitch {
  tagName: 'zen-switch';
  props: {
    checked?: boolean;
    disabled?: boolean;
  };
  events: {
    change: CustomEvent<boolean>;
  };
}

// =============================================================================
// 4. FEEDBACK & OVERLAY
// =============================================================================

/**
 * <zen-dialog>
 * Modal dialog.
 */
export interface ZenDialog {
  tagName: 'zen-dialog';
  props: {
    open: boolean;
    title?: string;
    scrollLock?: boolean;
  };
  slots: {
    default: any; // Content
    footer?: any; // Action buttons
  };
  events: {
    close: CustomEvent<void>;
  };
}

/**
 * <zen-toast-container>
 * Container for toast notifications.
 * Usage: Prefer using the `toast()` helper.
 */
export interface ZenToastUsage {
  import: "import { toast } from '@zen-ui/library';";
  call: "toast(message: string, type: 'info'|'success'|'warning'|'error', duration?: number)";
}

/**
 * <zen-tooltip>
 * Hover tooltip.
 */
export interface ZenTooltip {
  tagName: 'zen-tooltip';
  props: {
    content: string; // The tooltip text
    position?: 'top' | 'bottom' | 'left' | 'right';
  };
  slots: {
    default: any; // The trigger element
  };
}

/**
 * <zen-skeleton>
 * Loading placeholder.
 */
export interface ZenSkeleton {
  tagName: 'zen-skeleton';
  props: {
    width?: string;
    height?: string;
    variant?: 'text' | 'circular' | 'rectangular';
  };
}

/**
 * <zen-progress>
 * Linear progress bar.
 */
export interface ZenProgress {
  tagName: 'zen-progress';
  props: {
    value: number; // 0-100
    max?: number;
    variant?: 'default' | 'gradient' | 'striped' | 'pulse' | 'glow';
    size?: 'sm' | 'md' | 'lg';
    color?: string;
    showValue?: boolean;
    indeterminate?: boolean;
  };
}

/**
 * <zen-circular-progress>
 * Circular progress indicator.
 */
export interface ZenCircularProgress {
  tagName: 'zen-circular-progress';
  props: {
    value: number;
    max?: number;
    size?: number; // px
    strokeWidth?: number;
    variant?: 'default' | 'gradient' | 'glow';
    color?: string;
    showValue?: boolean;
    indeterminate?: boolean;
  };
}

// =============================================================================
// 5. NAVIGATION
// =============================================================================

/**
 * <zen-tabs>
 * Tabbed navigation container.
 */
export interface ZenTabs {
  tagName: 'zen-tabs';
  props: {
    active: string; // The value of the active tab
  };
  slots: {
    tabs: ZenTab[];
    default: ZenTabPanel[];
  };
  events: {
    change: CustomEvent<string>;
  };
}

export interface ZenTab {
  tagName: 'zen-tab';
  props: {
    slot: 'tabs';
    value: string; // Unique ID
  };
}

export interface ZenTabPanel {
  tagName: 'zen-tab-panel';
  props: {
    value: string; // Must match corresponding tab value
  };
}

/**
 * <zen-breadcrumbs>
 * Breadcrumb navigation.
 */
export interface ZenBreadcrumbs {
  tagName: 'zen-breadcrumbs';
  props: {
    items: Array<{ label: string; href?: string; icon?: string }>;
    separator?: string; // e.g., '/'
    animated?: boolean;
  };
}

/**
 * <zen-navbar>
 * Top navigation bar.
 */
export interface ZenNavbar {
  tagName: 'zen-navbar';
  props: {
    logo?: string; // Image URL
    logoText?: string;
    sticky?: boolean;
    transparent?: boolean;
  };
  slots: {
    links: any;
    actions: any;
  };
}

/**
 * <zen-nav-link>
 * Link component optimized for navigation bars.
 */
export interface ZenNavLink {
  tagName: 'zen-nav-link';
  props: {
    href: string;
    active?: boolean;
    variant?: 'default' | 'underline' | 'pill' | 'glow';
  };
  slots: {
    default: string;
    icon?: any;
  };
}

/**
 * <zen-nav-button>
 * Button variant optimized for navbars.
 */
export interface ZenNavButton {
  tagName: 'zen-nav-button';
  props: {
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md';
  };
}

/**
 * <zen-footer>
 * Page footer.
 */
export interface ZenFooter {
  tagName: 'zen-footer';
  props: {
    logoText?: string;
    copyright?: string;
    variant?: 'simple' | 'detailed';
  };
}

/**
 * <zen-command-palette>
 * Command/Search modal (Ctrl+K).
 */
export interface ZenCommandPalette {
  tagName: 'zen-command-palette';
  props: {
    open: boolean;
    items: Array<{
      id: string;
      label: string;
      icon?: string;
      shortcut?: string;
      group?: string;
    }>;
    placeholder?: string;
  };
  events: {
    select: CustomEvent<{ id: string }>;
  };
}

/**
 * <zen-hamburger-menu>
 * Mobile menu toggle.
 */
export interface ZenHamburgerMenu {
  tagName: 'zen-hamburger-menu';
  props: {
    open: boolean;
    variant?: 'spin' | 'squeeze' | 'arrow';
  };
  events: {
    toggle: CustomEvent<{ open: boolean }>;
  };
  slots: {
    default: any; // Mobile menu items
    header?: any;
    footer?: any;
  };
}

/**
 * <zen-notification-bell>
 * Notification bell with drop-down list.
 */
export interface ZenNotificationBell {
  tagName: 'zen-notification-bell';
  props: {
    notifications: Array<{
      id: string;
      title: string;
      message: string;
      read: boolean;
      timestamp: string;
    }>;
    open?: boolean;
  };
  events: {
    markAllRead: CustomEvent<void>;
    notificationClick: CustomEvent<{ id: string }>;
  };
}

// =============================================================================
// 6. SPECIAL EFFECTS & BACKGROUNDS
// =============================================================================

/**
 * <zen-particles>
 * Background particle animation.
 */
export interface ZenParticles {
  tagName: 'zen-particles';
  props: {
    count?: number;
    color?: string;
    minSize?: number;
    maxSize?: number;
    speed?: number;
    connected?: boolean;
    connectionDistance?: number;
  };
}

/**
 * <zen-gradient-blob>
 * Animated background gradient blobs.
 */
export interface ZenGradientBlob {
  tagName: 'zen-gradient-blob';
  props: {
    variant?: 'purple' | 'ocean' | 'sunset' | 'aurora';
    interactive?: boolean; // Follows mouse
    speed?: number;
  };
}

/**
 * <zen-typewriter>
 * Typewriter text effect.
 */
export interface ZenTypewriter {
  tagName: 'zen-typewriter';
  props: {
    texts: string[];
    typeSpeed?: number;
    deleteSpeed?: number;
    pauseDuration?: number;
    loop?: boolean;
    cursor?: boolean;
    cursorChar?: string;
  };
}

/**
 * <zen-marquee>
 * Scrolling text marquee.
 */
export interface ZenMarquee {
  tagName: 'zen-marquee';
  props: {
    speed?: number;
    direction?: 'left' | 'right';
    pauseOnHover?: boolean;
    gap?: string;
  };
}

/**
 * <zen-glitch-text>
 * Text with glitch animation.
 */
export interface ZenGlitchText {
  tagName: 'zen-glitch-text';
  props: {
    text: string;
    active?: boolean;
    variant?: 'cyberpunk' | 'neon' | 'matrix' | 'vhs';
  };
}

/**
 * <zen-text-reveal>
 * Animated text reveal on scroll/trigger.
 */
export interface ZenTextReveal {
  tagName: 'zen-text-reveal';
  props: {
    variant?: 'slide' | 'fade' | 'blur';
    delay?: number;
    duration?: number;
    trigger?: boolean;
  };
  slots: {
    default: string;
  };
}
```
