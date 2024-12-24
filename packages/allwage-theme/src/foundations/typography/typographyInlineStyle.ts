import * as typographyUnits from './units'

/**
 * Typography Inline Style definitions
 * @example
 * ```tsx
 * // Using with useTheme hook
 * const Component = () => {
 *   const theme = useTheme()
 *   return <div css={theme.typography.headline.h1_sb}>Text</div>
 * }
 * ```
 */
export const typographyInlineStyle = {
  headline: {
    h1_sb: {
      fontSize: typographyUnits.fontSize[48],
      fontWeight: typographyUnits.fontWeight[600],
      lineHeight: typographyUnits.lineHeight[129],
      letterSpacing: typographyUnits.letterSpacing[1200],
    },
    h2_sb: {
      fontSize: typographyUnits.fontSize[40],
      fontWeight: typographyUnits.fontWeight[600],
      lineHeight: typographyUnits.lineHeight[130],
      letterSpacing: typographyUnits.letterSpacing[1000],
    },
  },

  title: {
    t1_sb: {
      fontSize: typographyUnits.fontSize[32],
      fontWeight: typographyUnits.fontWeight[600],
      lineHeight: typographyUnits.lineHeight[131],
      letterSpacing: typographyUnits.letterSpacing[800],
    },
    t2_rg: {
      fontSize: typographyUnits.fontSize[28],
      fontWeight: typographyUnits.fontWeight[400],
      lineHeight: typographyUnits.lineHeight[135],
      letterSpacing: typographyUnits.letterSpacing[700],
    },
    t3_rg: {
      fontSize: typographyUnits.fontSize[24],
      fontWeight: typographyUnits.fontWeight[400],
      lineHeight: typographyUnits.lineHeight[141],
      letterSpacing: typographyUnits.letterSpacing[600],
    },
    t4_rg: {
      fontSize: typographyUnits.fontSize[20],
      fontWeight: typographyUnits.fontWeight[400],
      lineHeight: typographyUnits.lineHeight[140],
      letterSpacing: typographyUnits.letterSpacing[500],
    },
    t5_rg: {
      fontSize: typographyUnits.fontSize[18],
      fontWeight: typographyUnits.fontWeight[400],
      lineHeight: typographyUnits.lineHeight[144],
      letterSpacing: typographyUnits.letterSpacing[450],
    },
  },

  body: {
    b1_rg: {
      fontSize: typographyUnits.fontSize[16],
      fontWeight: typographyUnits.fontWeight[400],
      lineHeight: typographyUnits.lineHeight[150],
      letterSpacing: typographyUnits.letterSpacing[400],
    },
    b2_rg: {
      fontSize: typographyUnits.fontSize[15],
      fontWeight: typographyUnits.fontWeight[400],
      lineHeight: typographyUnits.lineHeight[146],
      letterSpacing: typographyUnits.letterSpacing[375],
    },
    b3_rg: {
      fontSize: typographyUnits.fontSize[14],
      fontWeight: typographyUnits.fontWeight[400],
      lineHeight: typographyUnits.lineHeight[142],
      letterSpacing: typographyUnits.letterSpacing[325],
    },
    b4_rg: {
      fontSize: typographyUnits.fontSize[13],
      fontWeight: typographyUnits.fontWeight[400],
      lineHeight: typographyUnits.lineHeight[138],
      letterSpacing: typographyUnits.letterSpacing[325],
    },
  },

  caption: {
    c1_rg: {
      fontSize: typographyUnits.fontSize[13],
      fontWeight: typographyUnits.fontWeight[400],
      lineHeight: typographyUnits.lineHeight[138],
      letterSpacing: typographyUnits.letterSpacing[325],
    },
    c2_rg: {
      fontSize: typographyUnits.fontSize[12],
      fontWeight: typographyUnits.fontWeight[400],
      lineHeight: typographyUnits.lineHeight[150],
      letterSpacing: typographyUnits.letterSpacing[300],
    },
    c3_rg: {
      fontSize: typographyUnits.fontSize[11],
      fontWeight: typographyUnits.fontWeight[400],
      lineHeight: typographyUnits.lineHeight[145],
      letterSpacing: typographyUnits.letterSpacing[275],
    },
  },
}
