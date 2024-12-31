import styled from '@emotion/styled'
import type { Meta, StoryObj } from '@storybook/react'

import LoadingSpinner from './LoadingSpinner'

const meta: Meta<typeof LoadingSpinner> = {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: '스피너의 크기',
      table: {
        defaultValue: { summary: 'lg' },
      },
    },
    variant: {
      control: 'select',
      options: ['filled', 'outline', 'ghost'],
      description: '스피너의 스타일 변형',
      table: {
        defaultValue: { summary: 'filled' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof LoadingSpinner>

const DarkWrapper = styled.div`
  background-color: #111111;
  padding: 2rem;
  border-radius: 8px;
`

// 기본 스피너
export const Default: Story = {
  args: {
    size: 'lg',
    variant: 'outline',
  },
}

// 크기 변형
export const Sizes: Story = {
  render: () => (
    <DarkWrapper>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
        >
          <LoadingSpinner size="xs" />
          <span style={{ color: 'white', fontSize: '12px' }}>xs</span>
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
        >
          <LoadingSpinner size="sm" />
          <span style={{ color: 'white', fontSize: '12px' }}>sm</span>
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
        >
          <LoadingSpinner size="md" />
          <span style={{ color: 'white', fontSize: '12px' }}>md</span>
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
        >
          <LoadingSpinner size="lg" />
          <span style={{ color: 'white', fontSize: '12px' }}>lg</span>
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
        >
          <LoadingSpinner size="xl" />
          <span style={{ color: 'white', fontSize: '12px' }}>xl</span>
        </div>
      </div>
    </DarkWrapper>
  ),
}

// 스타일 변형
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
      {/* Light background variants */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
        >
          <LoadingSpinner variant="outline" />
          <span style={{ fontSize: '12px' }}>outline</span>
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
        >
          <LoadingSpinner variant="ghost" />
          <span style={{ fontSize: '12px' }}>ghost</span>
        </div>
      </div>

      {/* Dark background variant */}
      <DarkWrapper>
        <div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
        >
          <LoadingSpinner variant="filled" />
          <span style={{ fontSize: '12px', color: 'white' }}>filled (on dark)</span>
        </div>
      </DarkWrapper>
    </div>
  ),
}

// 실제 사용 예시
export const Examples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* 로딩 상태의 컨테이너 */}
      <div
        style={{
          padding: '2rem',
          border: '1px solid #eee',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'center',
          width: '300px',
          height: '200px',
          alignItems: 'center',
        }}
      >
        <LoadingSpinner size="xl" variant="outline" />
      </div>

      {/* 인라인 로딩 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>데이터를 불러오는 중입니다</span>
        <LoadingSpinner size="xs" variant="outline" />
      </div>

      {/* 다크 모드 버튼 내 로딩 */}
      <button
        style={{
          backgroundColor: '#111111',
          color: 'white',
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span>처리중...</span>
        <LoadingSpinner size="xs" variant="filled" />
      </button>
    </div>
  ),
}

// 여러 크기와 변형의 조합
export const Combinations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
      {/* Outline variants in different sizes */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <LoadingSpinner size="xs" variant="outline" />
        <LoadingSpinner size="sm" variant="outline" />
        <LoadingSpinner size="md" variant="outline" />
        <LoadingSpinner size="lg" variant="outline" />
        <LoadingSpinner size="xl" variant="outline" />
      </div>

      {/* Ghost variants in different sizes */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <LoadingSpinner size="xs" variant="ghost" />
        <LoadingSpinner size="sm" variant="ghost" />
        <LoadingSpinner size="md" variant="ghost" />
        <LoadingSpinner size="lg" variant="ghost" />
        <LoadingSpinner size="xl" variant="ghost" />
      </div>

      {/* Filled variants in different sizes */}
      <DarkWrapper style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <LoadingSpinner size="xs" variant="filled" />
        <LoadingSpinner size="sm" variant="filled" />
        <LoadingSpinner size="md" variant="filled" />
        <LoadingSpinner size="lg" variant="filled" />
        <LoadingSpinner size="xl" variant="filled" />
      </DarkWrapper>
    </div>
  ),
}
