import { theme } from '@allwagelab/design'
import styled from '@emotion/styled'
import type { Meta, StoryObj } from '@storybook/react'

import { QuestionSolidIcon } from '../../icons'
import Tooltip from './Tooltip'

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top',
        'top-left',
        'top-right',
        'bottom',
        'bottom-left',
        'bottom-right',
        'left',
        'right',
      ],
      description: '툴팁이 표시될 위치',
    },
    content: {
      control: 'text',
      description: '툴팁에 표시될 내용',
    },
    disabled: {
      control: 'boolean',
      description: '툴팁 비활성화 여부',
    },
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof Tooltip>

const Container = styled.div`
  display: flex;
  gap: 32px;
  padding: 32px;
  flex-wrap: wrap;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  padding: 64px;
  place-items: center;
`

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  color: #666;

  &:hover {
    color: #333;
  }
`

const TextButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`

// 기본 툴팁
export const Basic: Story = {
  render: args => (
    <Container>
      <Tooltip {...args} content="도움말 메시지입니다.">
        <IconButton>
          <QuestionSolidIcon color={theme.colors.blue50} width={24} height={24} />
        </IconButton>
      </Tooltip>
    </Container>
  ),
}

// 툴팁 위치 선택
export const WithControls: Story = {
  render: args => (
    <Container>
      <Tooltip {...args}>
        <TextButton>위치 변경</TextButton>
      </Tooltip>
    </Container>
  ),
  args: {
    content: '위치를 선택해보세요!',
    placement: 'bottom',
  },
}

// 툴팁 위치 데모
export const AllPlacements: Story = {
  render: () => (
    <GridContainer>
      <Tooltip content="위 & 왼쪽" placement="top-left">
        <TextButton>Top Left</TextButton>
      </Tooltip>
      <Tooltip content="위쪽" placement="top">
        <TextButton>Top</TextButton>
      </Tooltip>
      <Tooltip content="위 & 오른쪽" placement="top-right">
        <TextButton>Top Right</TextButton>
      </Tooltip>
      <Tooltip content="왼쪽" placement="left">
        <TextButton>Left</TextButton>
      </Tooltip>
      <div style={{ width: '80px' }} />
      <Tooltip content="오른쪽" placement="right">
        <TextButton>Right</TextButton>
      </Tooltip>
      <Tooltip content="아래 & 왼쪽" placement="bottom-left">
        <TextButton>Bottom Left</TextButton>
      </Tooltip>
      <Tooltip content="아래쪽" placement="bottom">
        <TextButton>Bottom</TextButton>
      </Tooltip>
      <Tooltip content="아래 & 오른쪽" placement="bottom-right">
        <TextButton>Bottom Right</TextButton>
      </Tooltip>
    </GridContainer>
  ),
}

// 긴 텍스트
export const LongContent: Story = {
  render: args => (
    <Container>
      <Tooltip {...args}>
        <TextButton>긴 텍스트</TextButton>
      </Tooltip>
    </Container>
  ),
  args: {
    content: '이것은 매우 긴 툴팁 메시지입니다. 여러 줄의 텍스트를 포함할 수 있습니다.',
  },
}

// 비활성화된 툴팁
export const Disabled: Story = {
  render: args => (
    <Container>
      <Tooltip {...args}>
        <TextButton>비활성화된 툴팁</TextButton>
      </Tooltip>
    </Container>
  ),
  args: {
    content: '이 툴팁은 표시되지 않습니다.',
    disabled: true,
  },
}

// HTML 컨텐츠
export const HTMLContent: Story = {
  render: args => (
    <Container>
      <Tooltip {...args}>
        <TextButton>HTML 컨텐츠</TextButton>
      </Tooltip>
    </Container>
  ),
  args: {
    content: (
      <div>
        <strong>볼드 텍스트</strong>
        <br />
        <span style={{ color: '#ff0000' }}>빨간색 텍스트</span>
      </div>
    ),
  },
}
