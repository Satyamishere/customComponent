import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  }
  ,
  // Ensure the Storybook Vite build resolves react and react-dom to the
  // project's installed versions to avoid duplicate React copies in the
  // final static bundle which cause runtime errors (forwardRef is not a function).
  viteFinal: async (config, { configType }) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = Object.assign({}, config.resolve.alias || {}, {
      react: require('path').resolve(__dirname, '..', 'node_modules', 'react'),
      'react-dom': require('path').resolve(__dirname, '..', 'node_modules', 'react-dom')
    });
    return config;
  }
};
export default config;