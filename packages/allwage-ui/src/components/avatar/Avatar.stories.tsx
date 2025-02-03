// Avatar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'

import Avatar from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: '아바타의 크기',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    src: {
      control: 'text',
      description: '이미지 URL',
    },
    alt: {
      control: 'text',
      description: '이미지 대체 텍스트',
    },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

// 기본 아바타 (이미지 없음)
export const Default: Story = {
  args: {
    size: 'md',
  },
}

// 이미지가 있는 아바타
export const WithImage: Story = {
  args: {
    size: 'md',
    src: 'https://i.pravatar.cc/300',
    alt: '사용자 아바타',
  },
}

// 아바타 크기
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar size="xs" />
      <Avatar size="sm" />
      <Avatar size="md" />
      <Avatar size="lg" />
    </div>
  ),
}

// 이미지가 있는 아바타 크기
export const SizesWithImage: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar size="xs" src="https://i.pravatar.cc/300" />
      <Avatar size="sm" src="https://i.pravatar.cc/300" />
      <Avatar size="md" src="https://i.pravatar.cc/300" />
      <Avatar size="lg" src="https://i.pravatar.cc/300" />
    </div>
  ),
}
