import { setProjectAnnotations } from '@storybook/react-vite';
import a11yAddonAnnotations from '@storybook/addon-a11y';
import * as projectAnnotations from './preview';

setProjectAnnotations([
  typeof a11yAddonAnnotations === 'function'
    ? a11yAddonAnnotations()
    : a11yAddonAnnotations,
  projectAnnotations
]);
