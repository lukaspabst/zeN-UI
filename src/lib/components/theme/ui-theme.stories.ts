import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import '../navigation/ui-navbar';
import '../navigation/ui-nav-link';
import '../navigation/ui-nav-button';
import '../card/ui-card';
import './ui-theme-toggle';
import './ui-theme-picker';
import { ZenThemeToggle } from './ui-theme-toggle';
import { ZenThemePicker } from './ui-theme-picker';
import '../../styles/variables.css';

const meta: Meta = {
  title: 'Components/Theme/Showcase',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
};

export default meta;
type Story = StoryObj;

export const ThemingDemo: Story = {
  render: () => html`
    <div style="min-height: 100vh; background: var(--zen-bg-1); color: var(--zen-text-1); transition: background 0.3s, color 0.3s;">
      
      <zen-navbar logoText="🎨 ThemeEngine" sticky>
        <zen-nav-link slot="links" active>Showcase</zen-nav-link>
        <zen-nav-link slot="links">Components</zen-nav-link>
        
        <div slot="actions" style="display: flex; align-items: center; gap: 16px;">
          <zen-theme-picker></zen-theme-picker>
          <div style="width: 1px; height: 24px; background: var(--zen-glass-border);"></div>
          <zen-theme-toggle></zen-theme-toggle>
          <zen-nav-button variant="primary">Download</zen-nav-button>
        </div>
      </zen-navbar>

      <main style="max-width: 1200px; margin: 0 auto; padding: 60px 20px;">
        
        <div style="text-align: center; margin-bottom: 60px;">
          <h1 style="font-size: 3.5rem; font-weight: 800; margin-bottom: 16px; background: linear-gradient(135deg, var(--zen-primary), #f093fb); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            Personalize Your Experience
          </h1>
          <p style="font-size: 1.25rem; color: var(--zen-text-2); max-width: 600px; margin: 0 auto;">
            Switch between Light and Dark modes, and choose your favorite accent color. 
            All components react instantly to your preferences.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px;">
          
          <zen-card>
            <div style="padding: 24px;">
              <h3 style="margin: 0 0 12px 0; color: var(--zen-text-1);">Primary Colors</h3>
              <p style="color: var(--zen-text-2); margin-bottom: 24px;">
                The primary color adapts to your selection. Hover the button below to see the glow effect.
              </p>
              <zen-nav-button variant="primary" style="width: 100%;">Primary Action</zen-nav-button>
            </div>
          </zen-card>

          <zen-card>
            <div style="padding: 24px;">
              <h3 style="margin: 0 0 12px 0; color: var(--zen-text-1);">Secondary & Ghost</h3>
              <p style="color: var(--zen-text-2); margin-bottom: 24px;">
                Different button variants use the theme colors in subtle ways.
              </p>
              <div style="display: flex; gap: 12px;">
                <zen-nav-button variant="secondary" style="flex: 1;">Secondary</zen-nav-button>
                <zen-nav-button variant="ghost" style="flex: 1;">Ghost</zen-nav-button>
              </div>
            </div>
          </zen-card>

          <zen-card>
            <div style="padding: 24px;">
              <h3 style="margin: 0 0 12px 0; color: var(--zen-text-1);">Nav Links</h3>
              <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 16px;">
                <zen-nav-link variant="underline" active href="#">Active Link</zen-nav-link>
                <zen-nav-link variant="pill" active href="#">Pill Active</zen-nav-link>
                <zen-nav-link variant="glow" active href="#">Glow Effect</zen-nav-link>
              </div>
            </div>
          </zen-card>

        </div>

      </main>
    </div>
  `,
  parameters: {
    a11y: { disable: true },
  },
};

export const ThemeToggleStandalone: Story = {
  render: () => html`
    <div style="padding: 40px; display: flex; flex-direction: column; gap: 24px; align-items: center;">
      <zen-theme-toggle @theme-change=${(e: CustomEvent) => console.log('Theme changed to:', e.detail.mode)}></zen-theme-toggle>
      <p style="color: var(--zen-text-2); font-size: 0.875rem; margin: 0;">
        Click to cycle through: Light → Dark → System
      </p>
    </div>
  `,
  parameters: {
    a11y: { disable: true },
  },
};

export const ThemeToggleProgrammatic: Story = {
  render: () => {
    const cycleTheme = () => {
      const toggle = document.querySelector('zen-theme-toggle') as ZenThemeToggle;
      if (toggle) {
        (toggle as unknown as { _cycleMode: () => void })._cycleMode();
      }
    };

    return html`
      <div style="padding: 40px; display: flex; flex-direction: column; gap: 24px; align-items: center;">
        <zen-theme-toggle @theme-change=${(e: CustomEvent) => console.log('Theme changed to:', e.detail.mode)}></zen-theme-toggle>
        <button @click=${cycleTheme} style="padding: 8px 16px; cursor: pointer;">
          Cycle Theme Programmatically
        </button>
      </div>
    `;
  },
  parameters: {
    a11y: { disable: true },
  },
};

export const ThemePickerStandalone: Story = {
  render: () => {
    const selectTheme = (theme: string) => {
      const picker = document.querySelector('zen-theme-picker') as ZenThemePicker;
      if (picker) {
        (picker as unknown as { _selectTheme: (t: string) => void })._selectTheme(theme);
      }
    };

    return html`
      <div style="padding: 40px; display: flex; flex-direction: column; gap: 24px; align-items: center;">
        <zen-theme-picker @color-theme-change=${(e: CustomEvent) => console.log('Color theme changed to:', e.detail.theme)}></zen-theme-picker>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button @click=${() => selectTheme('default')} style="padding: 8px 16px; cursor: pointer;">Default</button>
          <button @click=${() => selectTheme('ocean')} style="padding: 8px 16px; cursor: pointer;">Ocean</button>
          <button @click=${() => selectTheme('sunset')} style="padding: 8px 16px; cursor: pointer;">Sunset</button>
          <button @click=${() => selectTheme('emerald')} style="padding: 8px 16px; cursor: pointer;">Emerald</button>
        </div>
      </div>
    `;
  },
  parameters: {
    a11y: { disable: true },
  },
};
