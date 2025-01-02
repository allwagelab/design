import type { StorybookConfig } from '@storybook/react-vite'
import fs from 'fs'

const stories = fs
  .readdirSync('packages')
  .map(pkg => `../packages/${pkg}/src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))`)

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', ...stories],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
  ],
  typescript: {
    reactDocgenTypescriptOptions: {
      tsconfigPath: 'tsconfig.test.json',
      propFilter: prop => {
        if (prop.name === 'css') {
          return false
        }

        if (prop.declarations !== undefined && prop.declarations.length > 0) {
          const hasPropAdditionalDescription = prop.declarations.find(declaration => {
            return !declaration.fileName.includes('node_modules')
          })

          return Boolean(hasPropAdditionalDescription)
        }

        return true
      },
    },

    reactDocgen: 'react-docgen-typescript',
  },
  framework: {
    name: '@storybook/react-vite',
    options: {
      strictMode: true,
    },
  },
  docs: {},
  staticDirs: ['./public'],
}

export default config
