import type { Meta, StoryObj } from '@storybook/react'

import Progress from './Progress'

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: '진행률 (0-100)',
    },
    label: {
      control: 'text',
      description: '라벨 텍스트',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    type: {
      control: 'select',
      options: ['normal', 'warning'],
      description: '타입',
    },
  },
}

export default meta
type Story = StoryObj<typeof Progress>

// 기본 프로그레스 바
export const Default: Story = {
  args: {
    value: 60,
  },
}

// 라벨이 있는 프로그레스 바
export const WithLabel: Story = {
  args: {
    value: 75,
    label: '월 상시 근로자 수',
    width: 400,
    valueLabel: '4.69명',
  },
}

// 경고 프로그레스 바
export const Warning: Story = {
  args: {
    value: 65,
    label: '월 5일 미만 출근',
    type: 'warning',
    width: 400,
    valueLabel: '21회',
  },
}

// 비활성화된 프로그레스 바
export const Disabled: Story = {
  args: {
    value: 45,
    label: '비활성화된 프로그레스 바',
    disabled: true,
    width: 400,
    valueLabel: '45%',
  },
}

// 다양한 상태의 프로그레스 바
export const Various: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '400px' }}>
      <Progress value={30} label="기본" valueLabel="30%" />
      <Progress value={60} label="중간 진행" valueLabel="60%" />
      <Progress value={100} label="완료" valueLabel="100%" />
      <Progress value={0} label="비활성화" disabled valueLabel="0%" />
    </div>
  ),
}
