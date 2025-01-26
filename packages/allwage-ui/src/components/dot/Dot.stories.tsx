// Avatar.stories.tsx
import { theme } from '@allwagelab/design'
import type { Meta, StoryObj } from '@storybook/react'

import Dot from './Dot'

const meta: Meta<typeof Dot> = {
  title: 'Components/Dot',
  component: Dot,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'color',
      description: '점의 색상',
    },
  },
}

export default meta
type Story = StoryObj<typeof Dot>

// 기본 점
export const Default: Story = {
  args: {
    color: theme.colors.baseBlack,
  },
}

// 예시
export const Examples: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Dot color={theme.colors.baseRed} />
      <Dot color={theme.colors.orange40} />
      <Dot color={theme.colors.yellow60} />
      <Dot color={theme.colors.green60} />
      <Dot color={theme.colors.blue60} />
      <Dot color={theme.colors.blue80} />
      <Dot color={theme.colors.purple60} />
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
}
