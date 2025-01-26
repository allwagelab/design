import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import Tab from './Tab'

const meta: Meta<typeof Tab> = {
  title: 'Components/Tab',
  component: Tab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: '탭 아이템 목록',
    },
    activeId: {
      description: '현재 선택된 탭의 id',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    onChange: {
      description: '탭 선택 시 호출되는 함수',
      action: 'onChange',
      type: 'function',
      table: {
        category: 'Events',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Tab>

const items = [
  { id: 'tab1', label: '탭 1' },
  { id: 'tab2', label: '탭 2' },
  { id: 'tab3', label: '탭 3' },
]

// 기본 탭
export const Default: Story = {
  args: {
    items,
    activeId: 'tab1',
  },
}

// 비활성화된 탭
export const Disabled: Story = {
  args: {
    items,
    activeId: 'tab1',
    disabled: true,
  },
}

// 인터랙티브 탭
export const Interactive: Story = {
  render: () => {
    const [activeId, setActiveId] = useState('tab1')

    return (
      <div style={{ width: '600px' }}>
        <Tab items={items} activeId={activeId} onChange={setActiveId} />
        <div style={{ marginTop: '24px', padding: '16px' }}>
          {activeId === 'tab1' && <div>스케줄 정보 내용</div>}
          {activeId === 'tab2' && <div>급여 정보 내용</div>}
          {activeId === 'tab3' && <div>근로 조건 정보 내용</div>}
        </div>
      </div>
    )
  },
}

// 다양한 탭
export const Various: Story = {
  render: () => {
    const [activeId2, setActiveId2] = useState('tab1')
    const [activeId3, setActiveId3] = useState('tab1')
    const [activeId4, setActiveId4] = useState('tab1')

    const items2 = items.slice(0, 2)
    const items3 = items
    const items4 = [...items, { id: 'tab4', label: '추가 정보' }]

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', width: '600px' }}>
        <div>
          <h3>2개 탭</h3>
          <Tab items={items2} activeId={activeId2} onChange={setActiveId2} />
        </div>
        <div>
          <h3>3개 탭</h3>
          <Tab items={items3} activeId={activeId3} onChange={setActiveId3} />
        </div>
        <div>
          <h3>4개 탭</h3>
          <Tab items={items4} activeId={activeId4} onChange={setActiveId4} />
        </div>
      </div>
    )
  },
}
