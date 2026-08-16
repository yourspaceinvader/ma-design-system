import type { Preview } from '@storybook/react-vite';
import React, { useEffect } from 'react';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      'test': 'todo',
    },
  },

  globalTypes: {
    theme: {
      description: 'Light / dark theme (driven by the `data-theme` semantic token collection)',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    theme: 'light',
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals.theme ?? 'light';
      useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
      }, [theme]);
      return (
        <div data-theme={theme} style={{ padding: '1.5rem' }}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
