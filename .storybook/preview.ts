import type { Preview } from '@storybook/react'
import { initialize, mswLoader } from 'msw-storybook-addon'
import { mockDateDecorator } from 'storybook-mock-date-decorator'

import { themeDecorator } from './decorators'

// Initialize MSW
initialize({
  onUnhandledRequest: 'bypass',
  serviceWorker: { url: '/mockServiceWorker.js' },
})

const preview: Preview = {
  loaders: [mswLoader],
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
