import type { Config } from 'tailwindcss'

const config = {
  content: [
    './index.html',
    './src/**/*.{html,js,jsx,ts,tsx}',
    './.storybook/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config as unknown as Config
