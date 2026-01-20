import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './ui-select';
import { ZenSelect } from './ui-select';

const sampleOptions = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' }
];

const meta: Meta = {
  title: 'Components/Forms/Select',
  component: 'zen-select',
  tags: ['autodocs'],
  render: () => html`
    <div style="height: 250px;">
      <zen-select 
        label="Role" 
        .options=${sampleOptions}
      ></zen-select>
    </div>
  `,
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const WithPreselectedValue: Story = {
  render: () => html`
    <div style="height: 250px;">
      <zen-select 
        label="Role" 
        value="editor"
        .options=${sampleOptions}
        @change=${(e: CustomEvent) => console.log('Selected:', e.detail)}
      ></zen-select>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <div style="height: 250px;">
      <zen-select 
        label="Role (Disabled)" 
        disabled
        value="viewer"
        .options=${sampleOptions}
      ></zen-select>
    </div>
  `,
};

export const WithPlaceholder: Story = {
  render: () => html`
    <div style="height: 250px;">
      <zen-select 
        label="Select your country" 
        placeholder="Choose a country..."
        .options=${[
      { label: 'United States', value: 'us' },
      { label: 'United Kingdom', value: 'uk' },
      { label: 'Germany', value: 'de' },
      { label: 'France', value: 'fr' }
    ]}
        @change=${(e: CustomEvent) => console.log('Country selected:', e.detail)}
      ></zen-select>
    </div>
  `,
};

export const InteractiveTest: Story = {
  render: () => {
    const toggleProgrammatically = () => {
      const select = document.querySelector('#test-select') as ZenSelect;
      if (select) {
        (select as unknown as { _toggle: () => void })._toggle();
      }
    };

    const selectOption = (value: string) => {
      const select = document.querySelector('#test-select') as ZenSelect;
      if (select) {
        (select as unknown as { _select: (v: string) => void })._select(value);
      }
    };

    return html`
      <div style="height: 300px;">
        <zen-select 
          id="test-select"
          label="Interactive Select" 
          .options=${sampleOptions}
          @change=${(e: CustomEvent) => console.log('Selection changed:', e.detail)}
        ></zen-select>
        
        <div style="margin-top: 16px; display: flex; gap: 8px; flex-wrap: wrap;">
          <button @click=${toggleProgrammatically} style="padding: 8px 16px; cursor: pointer;">
            Toggle Dropdown
          </button>
          <button @click=${() => selectOption('admin')} style="padding: 8px 16px; cursor: pointer;">
            Select Admin
          </button>
          <button @click=${() => selectOption('editor')} style="padding: 8px 16px; cursor: pointer;">
            Select Editor
          </button>
          <button @click=${() => selectOption('viewer')} style="padding: 8px 16px; cursor: pointer;">
            Select Viewer
          </button>
        </div>
      </div>
    `;
  },
};

export const MultipleSelects: Story = {
  render: () => html`
    <div style="height: 350px; display: flex; flex-direction: column; gap: 24px;">
      <zen-select 
        label="Primary Role" 
        .options=${sampleOptions}
        @change=${(e: CustomEvent) => console.log('Primary role:', e.detail)}
      ></zen-select>
      
      <zen-select 
        label="Secondary Role" 
        .options=${sampleOptions}
        @change=${(e: CustomEvent) => console.log('Secondary role:', e.detail)}
      ></zen-select>
      
      <p style="color: var(--zen-text-2); font-size: 0.875rem; margin: 0;">
        Click outside to close dropdowns
      </p>
    </div>
  `,
};
