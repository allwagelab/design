import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import Pagination from './Pagination'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    current: {
      control: { type: 'number', min: 1 },
      description: '현재 페이지',
    },
    total: {
      control: { type: 'number', min: 1 },
      description: '전체 페이지 수',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '크기',
      defaultValue: 'md',
    },
    variant: {
      control: 'radio',
      options: ['filled', 'outline'],
      description: '스타일 변형',
      defaultValue: 'filled',
    },
    color: {
      control: 'color',
      description: '색상',
    },
    showDoubleArrow: {
      control: 'boolean',
      description: '양쪽 끝 화살표 버튼 표시 여부',
      defaultValue: true,
    },
  },
}

export default meta
type Story = StoryObj<typeof Pagination>

// 기본 페이지네이션
export const Default: Story = {
  args: {
    current: 1,
    total: 10,
    onChange: () => {},
  },
}

// 비활성화 상태
export const Disabled: Story = {
  args: {
    current: 5,
    total: 10,
    disabled: true,
  },
}

// 다양한 상태
export const States: Story = {
  render: () => {
    const [page1, setPage1] = useState(1)
    const [page2, setPage2] = useState(5)
    const [page3, setPage3] = useState(10)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3>처음 페이지</h3>
          <Pagination current={page1} total={10} onChange={setPage1} />
        </div>
        <div>
          <h3>중간 페이지</h3>
          <Pagination current={page2} total={10} onChange={setPage2} />
        </div>
        <div>
          <h3>마지막 페이지</h3>
          <Pagination current={page3} total={10} onChange={setPage3} />
        </div>
      </div>
    )
  },
}

// 크기 예시
export const Sizes: Story = {
  render: () => {
    const [page1, setPage1] = useState(5)
    const [page2, setPage2] = useState(5)
    const [page3, setPage3] = useState(5)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3>Small</h3>
          <Pagination current={page1} total={10} onChange={setPage1} size="sm" />
        </div>
        <div>
          <h3>Medium (기본)</h3>
          <Pagination current={page2} total={10} onChange={setPage2} size="md" />
        </div>
        <div>
          <h3>Large</h3>
          <Pagination current={page3} total={10} onChange={setPage3} size="lg" />
        </div>
      </div>
    )
  },
}

// 스타일 변형
export const Variants: Story = {
  render: () => {
    const [page1, setPage1] = useState(5)
    const [page2, setPage2] = useState(5)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3>Filled (기본)</h3>
          <Pagination
            current={page1}
            total={10}
            onChange={setPage1}
            variant="filled"
            color="#228BE6"
          />
        </div>
        <div>
          <h3>Outline</h3>
          <Pagination
            current={page2}
            total={10}
            onChange={setPage2}
            variant="outline"
            color="#228BE6"
          />
        </div>
      </div>
    )
  },
}

// 색상 예시
export const Colors: Story = {
  render: () => {
    const [page1, setPage1] = useState(5)
    const [page2, setPage2] = useState(5)
    const [page3, setPage3] = useState(5)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3>파란색</h3>
          <Pagination current={page1} total={10} onChange={setPage1} color="#228BE6" />
        </div>
        <div>
          <h3>초록색</h3>
          <Pagination current={page2} total={10} onChange={setPage2} color="#40C057" />
        </div>
        <div>
          <h3>보라색</h3>
          <Pagination current={page3} total={10} onChange={setPage3} color="#7950F2" />
        </div>
      </div>
    )
  },
}

// 양쪽 끝 화살표 버튼 예시
export const DoubleArrowButtons: Story = {
  render: () => {
    const [page1, setPage1] = useState(5)
    const [page2, setPage2] = useState(5)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3>양쪽 끝 화살표 표시 (기본)</h3>
          <Pagination current={page1} total={10} onChange={setPage1} showDoubleArrow={true} />
        </div>
        <div>
          <h3>양쪽 끝 화살표 숨김</h3>
          <Pagination current={page2} total={10} onChange={setPage2} showDoubleArrow={false} />
        </div>
      </div>
    )
  },
}
