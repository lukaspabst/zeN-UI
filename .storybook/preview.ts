import type { Preview } from "@storybook/web-components";
import { html } from 'lit';
import '../src/lib/styles/variables.css';

// Inject Font
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#030304' },
        { name: 'light', value: '#ffffff' },
      ],
    },
    layout: 'centered', // Center components by default for better spotlight
  },
  decorators: [
    (story) => html`
      <style>
        body { 
          font-family: var(--zen-font-family);
          background-color: #000000;
          color: #ffffff;
          margin: 0;
          padding: 0;
        }
      </style>
      ${story()}
    `
  ]
};

export default preview;
