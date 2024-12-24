````markdown
# @allwagelab/design

Allwage Design System

## Installation

```bash
npm install @allwagelab/design
# or
yarn add @allwagelab/design
# or
pnpm add @allwagelab/design
```
````

## Setup

1. Create `emotion.d.ts` file in your project:

```typescript
import type { theme } from '@allwagelab/design'
import '@emotion/react'

type DefaultTheme = typeof theme

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends DefaultTheme {}
}
```

2. Use in your app:

```typescript
import { ThemeProvider } from "@emotion/react";
import { theme, GlobalStyles } from "@allwagelab/design";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

## Usage

### Typography

```typescript
/**
 * 1. Using with theme.typography
 */
const Title = styled.h1`
  ${({ theme }) => css`
    ${theme.typography.headline.h1_sb};
    color: ${theme.colors.gray90};
  `}
`

/**
 * 2. Using with typographyStyle utility
 */
const Subtitle = styled.h2`
  ${({ theme }) => css`
    ${typographyStyle('title.t1_sb')}
    color: ${theme.colors.gray90};
  `}
`

/**
 * 3. Using with useTheme hook and css prop
 */
const Component = () => {
  const { typography, colors } = useTheme()

  return (
    <>
      {/* Using css prop with template literal */}
      <div
        css={css`
          ${typography.body.b1_rg};
          color: ${colors.green70};
        `}
      >
        Body Text
      </div>

      {/* Using css prop with array syntax */}
      <div css={[
        typography.caption.c1_rg,
        { color: colors.orange20 }
      ]}>
        Caption Text
      </div>
    </>
  )
}
```

### Available Typography Styles

#### Headline

- `h1_sb`: 48px, Semi-bold (3rem, line-height: 129.167%, letter-spacing: -1.2px)
- `h2_sb`: 40px, Semi-bold (2.5rem, line-height: 130%, letter-spacing: -1px)

#### Title

- `t1_sb`: 32px, Semi-bold (2rem, line-height: 131.25%, letter-spacing: -0.8px)
- `t2_rg`: 28px, Regular (1.75rem, line-height: 135.714%, letter-spacing: -0.7px)
- `t3_rg`: 24px, Regular (1.5rem, line-height: 141.667%, letter-spacing: -0.6px)
- `t4_rg`: 20px, Regular (1.25rem, line-height: 140%, letter-spacing: -0.5px)
- `t5_rg`: 18px, Regular (1.125rem, line-height: 144.444%, letter-spacing: -0.45px)

#### Body

- `b1_rg`: 16px, Regular (1rem, line-height: 150%, letter-spacing: -0.4px)
- `b2_rg`: 15px, Regular (0.9375rem, line-height: 146.667%, letter-spacing: -0.375px)
- `b3_rg`: 14px, Regular (0.875rem, line-height: 142.857%, letter-spacing: -0.325px)
- `b4_rg`: 13px, Regular (0.8125rem, line-height: 138.462%, letter-spacing: -0.325px)

#### Caption

- `c1_rg`: 13px, Regular (0.8125rem, line-height: 138.462%, letter-spacing: -0.325px)
- `c2_rg`: 12px, Regular (0.75rem, line-height: 150%, letter-spacing: -0.3px)
- `c3_rg`: 11px, Regular (0.6875rem, line-height: 145.455%, letter-spacing: -0.275px)

## License

MIT © [Allwage Lab](https://github.com/allwagelab)
