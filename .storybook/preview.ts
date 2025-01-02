import type { Preview } from '@storybook/react'
import { mockDateDecorator } from 'storybook-mock-date-decorator'

import { themeDecorator } from './decorators'

const preview: Preview = {
  decorators: [mockDateDecorator, themeDecorator],

  tags: ['autodocs'],

  globalTypes: {
    locale: {
      name: 'Locale',
    },
  },
  initialGlobals: {
    locale: 'ko',
  },
}

export default preview
