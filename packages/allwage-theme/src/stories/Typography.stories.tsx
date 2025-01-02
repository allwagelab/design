// Typography.stories.tsx
import styled from '@emotion/styled'
import type { Meta, StoryObj } from '@storybook/react'

import { theme } from '..'

const Meta: Meta = {
  title: 'Foundation/Typography',
  parameters: {
    layout: 'centered',
  },
}

export default Meta

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 32px;
  max-width: 1200px;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
`

const TypeRow = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 24px;
  align-items: center;
`

const TypeInfo = styled.div`
  font-family: monospace;
  font-size: 14px;
  color: #666;
`

const TypeExample = styled.div<{ typographyStyle: any }>`
  ${({ typographyStyle }) => typographyStyle};
`

// 타입 섹션을 렌더링하는 컴포넌트
const TypeSection = ({ title, styles }: { title: string; styles: Record<string, any> }) => (
  <Section>
    <SectionTitle>{title}</SectionTitle>
    {Object.entries(styles).map(([key, style]) => (
      <TypeRow key={key}>
        <TypeInfo>
          {key}
          <br />
          {`font-size: ${style.fontSize}`}
          <br />
          {`line-height: ${style.lineHeight}%`}
          <br />
          {`letter-spacing: ${style.letterSpacing}`}
          <br />
          {`font-weight: ${style.fontWeight}`}
        </TypeInfo>
        <TypeExample typographyStyle={style}>
          {title === 'Headline' && '직원관리'}
          {title !== 'Headline' &&
            '근로 조건을 변경하기 위해서는 근로계약서를 새로 작성해야 합니다.'}
        </TypeExample>
      </TypeRow>
    ))}
  </Section>
)

export const Default: StoryObj = {
  render: () => {
    return (
      <Container>
        <TypeSection title="Headline" styles={theme.typographyInlineStyle.headline} />
        <TypeSection title="Title" styles={theme.typographyInlineStyle.title} />
        <TypeSection title="Body" styles={theme.typographyInlineStyle.body} />
        <TypeSection title="Caption" styles={theme.typographyInlineStyle.caption} />
      </Container>
    )
  },
}

export const Headlines: StoryObj = {
  render: () => {
    return (
      <Container>
        <TypeSection title="Headline" styles={theme.typographyInlineStyle.headline} />
      </Container>
    )
  },
}

export const Titles: StoryObj = {
  render: () => {
    return (
      <Container>
        <TypeSection title="Title" styles={theme.typographyInlineStyle.title} />
      </Container>
    )
  },
}

export const BodyText: StoryObj = {
  render: () => {
    return (
      <Container>
        <TypeSection title="Body" styles={theme.typographyInlineStyle.body} />
      </Container>
    )
  },
}

export const Captions: StoryObj = {
  render: () => {
    return (
      <Container>
        <TypeSection title="Caption" styles={theme.typographyInlineStyle.caption} />
      </Container>
    )
  },
}
