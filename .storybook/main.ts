import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../packages/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: config => {
    // vite-plugin-dts와 preserve-directives 플러그인 제거
    config.plugins = config.plugins?.filter(plugin => {
      if (!plugin) return false

      const p = Array.isArray(plugin) ? plugin[0] : plugin
      return !(p && 'name' in p && (p.name === 'vite:dts' || p.name === 'preserve-directives'))
    })

    return config
  },
}

export default config
