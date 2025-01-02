import type { Meta, StoryObj } from '@storybook/react'

import TextArea from './Textarea'

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    sizeVariant: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '텍스트영역의 크기',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    error: {
      control: 'boolean',
      description: '에러 상태',
    },
    full: {
      control: 'boolean',
      description: '전체 너비 사용',
    },
    maxLength: {
      control: 'number',
      description: '최대 글자 수',
      table: {
        defaultValue: { summary: '200' },
      },
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
  },
}

export default meta
type Story = StoryObj<typeof TextArea>

// 기본 텍스트영역
export const Default: Story = {
  args: {
    placeholder: '내용을 입력해주세요',
    sizeVariant: 'md',
  },
}

// 텍스트영역 크기
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <TextArea sizeVariant="sm" placeholder="Small" />
      <TextArea sizeVariant="md" placeholder="Medium" />
      <TextArea sizeVariant="lg" placeholder="Large" />
    </div>
  ),
}

// 상태
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <TextArea placeholder="기본 상태" />
      <TextArea disabled placeholder="비활성화 상태" />
      <TextArea error placeholder="에러 상태" />
    </div>
  ),
}

// 전체 너비
export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <TextArea full placeholder="전체 너비 텍스트영역" />
    </div>
  ),
}

// 글자 수 제한
export const CharacterLimit: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <TextArea maxLength={50} placeholder="최대 50자" />
      <TextArea maxLength={100} placeholder="최대 100자" />
      <TextArea maxLength={200} placeholder="최대 200자" defaultValue="어쩌고 저쩌고" />
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
        maxWidth: '600px',
      }}
    >
      {/* 기본 텍스트영역 */}
      <div>
        <TextArea placeholder="피드백을 입력해주세요" />
      </div>

      {/* 에러 상태의 텍스트영역 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <TextArea error placeholder="잘못된 입력" />
        <span style={{ color: 'red', fontSize: '0.875rem' }}>필수 입력 항목입니다.</span>
      </div>

      {/* 비활성화된 텍스트영역 */}
      <div>
        <TextArea disabled value="수정할 수 없는 내용" />
      </div>

      {/* 전체 너비 텍스트영역 */}
      <div>
        <TextArea full placeholder="상세한 설명을 입력해주세요" />
      </div>
    </div>
  ),
}
