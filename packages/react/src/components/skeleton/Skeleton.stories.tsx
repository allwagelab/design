import type { Meta, StoryObj } from '@storybook/react'

import Skeleton from './Skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: { type: 'number', min: 0 },
      description: '너비 (px)',
    },
    height: {
      control: { type: 'number', min: 0 },
      description: '높이 (px)',
    },
    radius: {
      control: { type: 'number', min: 0 },
      description: '테두리 반경 (px)',
    },
    animation: {
      control: 'boolean',
      description: '애니메이션 사용 여부',
      defaultValue: true,
    },
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

// 기본 스켈레톤
export const Default: Story = {
  args: {
    width: 200,
    height: 20,
  },
}

// 다양한 크기
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Skeleton width={100} height={20} />
      <Skeleton width={200} height={20} />
      <Skeleton width={300} height={20} />
    </div>
  ),
}

// 퍼센트 단위
export const PercentageWidth: Story = {
  render: () => (
    <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Skeleton width="100%" height={20} />
      <Skeleton width="80%" height={20} />
      <Skeleton width="60%" height={20} />
    </div>
  ),
}

// 애니메이션 비활성화
export const NoAnimation: Story = {
  args: {
    width: 200,
    height: 20,
    animation: false,
  },
}

// 실제 사용 예시
export const Examples: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      {/* 프로필 카드 */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          padding: '1rem',
          border: '1px solid #E5E5E4',
        }}
      >
        <Skeleton width={60} height={60} radius={30} />
        <div style={{ flex: 1 }}>
          <Skeleton width={60} height={16} style={{ marginBottom: '0.5rem' }} />
          <Skeleton width={100} height={14} />
        </div>
      </div>

      {/* 게시글 목록 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '1rem',
          border: '1px solid #E5E5E4',
        }}
      >
        <div>
          <Skeleton width={200} height={24} style={{ marginBottom: '0.5rem' }} />
          <Skeleton width="100%" height={16} />
          <Skeleton width="90%" height={16} />
        </div>
        <div>
          <Skeleton width={180} height={24} style={{ marginBottom: '0.5rem' }} />
          <Skeleton width="100%" height={16} />
          <Skeleton width="95%" height={16} />
        </div>
      </div>
    </div>
  ),
}
