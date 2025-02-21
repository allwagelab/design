// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'

import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outline', 'ghost'],
      description: '버튼의 스타일 변형',
      table: {
        defaultValue: { summary: 'filled' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: '버튼의 크기',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '버튼의 비활성화 상태',
    },
    loading: {
      control: 'boolean',
      description: '버튼의 로딩 상태',
    },
    weak: {
      control: 'boolean',
      description: '약한 강조 스타일 적용',
    },
    full: {
      control: 'boolean',
      description: '전체 너비 사용',
    },
    children: {
      control: 'text',
      description: '버튼의 내용',
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

// 기본 버튼
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'filled',
    size: 'md',
  },
}

// 버튼 variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button variant="filled">Filled</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
}

// 버튼 크기
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
}

// 상태
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button>Normal</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button variant="outline">Normal</Button>
        <Button variant="outline" disabled>
          Disabled
        </Button>
        <Button variant="outline" loading>
          Loading
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button variant="ghost">Normal</Button>
        <Button variant="ghost" disabled>
          Disabled
        </Button>
        <Button variant="ghost" loading>
          Loading
        </Button>
      </div>
    </div>
  ),
}

// Full width
export const FullWidth: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        maxWidth: '400px',
      }}
    >
      <Button full>Full Width Button</Button>
      <Button variant="outline" full>
        Full Width Outline
      </Button>
      <Button variant="ghost" full>
        Full Width Ghost
      </Button>
    </div>
  ),
}

// Weak 스타일
export const WeakStyle: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button weak>Weak Button</Button>
      <Button variant="outline" weak>
        Weak Outline
      </Button>
      <Button variant="ghost" weak>
        Weak Ghost
      </Button>
    </div>
  ),
}

// 로딩 상태의 다양한 크기
export const LoadingStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button size="xs" loading>
          Extra Small
        </Button>
        <Button size="sm" loading>
          Small
        </Button>
        <Button size="md" loading>
          Medium
        </Button>
        <Button size="lg" loading>
          Large
        </Button>
        <Button size="xl" loading>
          Extra Large
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button variant="outline" size="xs" loading>
          Extra Small
        </Button>
        <Button variant="outline" size="sm" loading>
          Small
        </Button>
        <Button variant="outline" size="md" loading>
          Medium
        </Button>
        <Button variant="outline" size="lg" loading>
          Large
        </Button>
        <Button variant="outline" size="xl" loading>
          Extra Large
        </Button>
      </div>
    </div>
  ),
}

// 실제 사용 예시
export const Examples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* 기본적인 액션 버튼 */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button variant="filled">확인</Button>
        <Button variant="outline">취소</Button>
      </div>

      {/* 폼 제출 버튼 */}
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <Button full loading>
          저장 중...
        </Button>
      </div>

      {/* 버튼 그룹 */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button size="sm" variant="ghost">
          이전
        </Button>
        <Button size="sm">다음</Button>
      </div>

      {/* 비활성화된 버튼들 */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button disabled>비활성화</Button>
        <Button variant="outline" disabled>
          비활성화
        </Button>
        <Button variant="ghost" disabled>
          비활성화
        </Button>
      </div>
    </div>
  ),
}
