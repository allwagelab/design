import React from 'react'

import { ThemeProvider } from '@emotion/react'

import { GlobalStyles, theme } from '../packages/allwage-theme/src'

export function themeDecorator(Story) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Story />
    </ThemeProvider>
  )
}
