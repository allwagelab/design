import { css, type SerializedStyles } from '@emotion/react'

import { typographyInlineStyle } from './typographyInlineStyle'

type TypographyStyles = {
  fontSize: string
  fontWeight: string
  lineHeight: string
  letterSpacing: string
}

type Category = keyof typeof typographyInlineStyle

type HeadlineStyles = keyof (typeof typographyInlineStyle)['headline']
type TitleStyles = keyof (typeof typographyInlineStyle)['title']
type BodyStyles = keyof (typeof typographyInlineStyle)['body']
type CaptionStyles = keyof (typeof typographyInlineStyle)['caption']

// 카테고리별 스타일 매핑
type CategoryStyleMap = {
  headline: HeadlineStyles
  title: TitleStyles
  body: BodyStyles
  caption: CaptionStyles
}

// 조건부 타입으로 카테고리에 따른 스타일 키 결정
type StyleKeyForCategory<T extends Category> = CategoryStyleMap[T]

// 타이포그래피 변형 타입
type TypographyVariant =
  | `headline.${HeadlineStyles}`
  | `title.${TitleStyles}`
  | `body.${BodyStyles}`
  | `caption.${CaptionStyles}`

// typography/styles.ts
/**
 * Typography styles ready to use with emotion
 * @example
 * ```tsx
 * const Heading = styled.h1`
 *   ${typographyStyle('headline.h1_sb')}
 * `
 * ```
 */
export const typographyStyle = <T extends TypographyVariant>(variant: T): SerializedStyles => {
  const [category, style] = variant.split('.') as [Category, StyleKeyForCategory<Category>]

  const categoryStyles = typographyInlineStyle[category] as Record<
    StyleKeyForCategory<Category>,
    TypographyStyles
  >

  const values = categoryStyles[style]

  return css`
    font-size: ${values.fontSize};
    font-weight: ${values.fontWeight};
    line-height: ${values.lineHeight};
    letter-spacing: ${values.letterSpacing};
  `
}
