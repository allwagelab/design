import type { Meta, StoryObj } from '@storybook/react'

import Input from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    sizeVariant: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: '입력창의 크기',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    hasIcon: {
      control: 'boolean',
      description: '검색 아이콘 표시 여부',
    },
    disabled: {
      control: 'boolean',
      description: '입력창의 비활성화 상태',
    },
    error: {
      control: 'boolean',
      description: '에러 상태 표시',
    },
    full: {
      control: 'boolean',
      description: '전체 너비 사용',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
  },
}

export default meta
type Story = StoryObj<typeof Input>

// 기본 입력창
export const Default: Story = {
  args: {
    placeholder: '입력해주세요',
    sizeVariant: 'md',
  },
}

// 입력창 크기
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Input sizeVariant="sm" placeholder="Small" />
      <Input sizeVariant="md" placeholder="Medium" />
      <Input sizeVariant="lg" placeholder="Large" />
      <Input sizeVariant="xl" placeholder="Extra Large" />
    </div>
  ),
}

// 아이콘 있는 입력창
export const WithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Input hasIcon placeholder="검색어를 입력하세요" />
      <Input hasIcon sizeVariant="sm" placeholder="작은 검색창" />
      <Input hasIcon sizeVariant="lg" placeholder="큰 검색창" />
    </div>
  ),
}

// 상태
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Input placeholder="기본 상태" />
      <Input disabled placeholder="비활성화 상태" />
      <Input error placeholder="에러 상태" />
      <Input hasIcon error placeholder="아이콘과 에러 상태" />
    </div>
  ),
}

// 전체 너비
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
      <Input full placeholder="전체 너비 입력창" />
      <Input full hasIcon placeholder="아이콘이 있는 전체 너비 입력창" />
    </div>
  ),
}

// 실제 사용 예시
export const Examples: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        width: '100%',
        maxWidth: '400px',
      }}
    >
      {/* 검색 폼 */}
      <div>
        <Input hasIcon placeholder="검색어를 입력하세요" full />
      </div>

      {/* 로그인 폼 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Input placeholder="이메일" type="email" />
        <Input placeholder="비밀번호" type="password" />
      </div>

      {/* 에러 상태의 입력창 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Input error placeholder="잘못된 입력" />
        <span style={{ color: 'red', fontSize: '0.875rem' }}>올바른 형식이 아닙니다.</span>
      </div>

      {/* 비활성화된 입력창 */}
      <div>
        <Input disabled value="수정할 수 없는 필드" />
      </div>
    </div>
  ),
}
