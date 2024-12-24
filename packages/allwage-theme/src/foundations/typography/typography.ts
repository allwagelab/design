import { typographyStyle } from './utils'

/**
 * Typography definitions
 * @example
 * ```tsx
 * // Using with emotion
 * const Heading = styled.h1`
 *   ${({ theme }) => css`
 *     ${theme.typography.headline.h1_sb};
 *   `}
 * `
 * }
 * ```
 */
export const typography = {
  /** Headline styles for large text elements */
  headline: {
    h1_sb: typographyStyle('headline.h1_sb'),
    h2_sb: typographyStyle('headline.h2_sb'),
  },
  title: {
    t1_sb: typographyStyle('title.t1_sb'),
    t2_rg: typographyStyle('title.t2_rg'),
    t3_rg: typographyStyle('title.t3_rg'),
    t4_rg: typographyStyle('title.t4_rg'),
    t5_rg: typographyStyle('title.t5_rg'),
  },
  body: {
    b1_rg: typographyStyle('body.b1_rg'),
    b2_rg: typographyStyle('body.b2_rg'),
    b3_rg: typographyStyle('body.b3_rg'),
    b4_rg: typographyStyle('body.b4_rg'),
  },
  caption: {
    c1_rg: typographyStyle('caption.c1_rg'),
    c2_rg: typographyStyle('caption.c2_rg'),
    c3_rg: typographyStyle('caption.c3_rg'),
  },
}
