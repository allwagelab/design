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
    max: {
      control: { type: 'number', min: 1 },
      description: '한 번에 보여줄 페이지 수',
      defaultValue: 10,
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    color: {
      control: 'color',
      description: '색상 (선택)',
    },
    variant: {
      control: 'radio',
      options: ['filled', 'outline'],
      description: '스타일 변형',
      defaultValue: 'filled',
    },
    showArrowDoubleIcon: {
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
  },
}

// 색상 예시
export const Colors: Story = {
  render: () => {
    const [page1, setPage1] = useState(1)
    const [page2, setPage2] = useState(1)
    const [page3, setPage3] = useState(1)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3>기본 (배경색 없음)</h3>
          <Pagination current={page1} total={10} onChange={setPage1} />
        </div>
        <div>
          <h3>파란색</h3>
          <Pagination current={page2} total={10} onChange={setPage2} color="#228BE6" />
        </div>
        <div>
          <h3>보라색</h3>
          <Pagination current={page3} total={10} onChange={setPage3} color="#7950F2" />
        </div>
      </div>
    )
  },
}

// 스타일 변형
export const Variants: Story = {
  render: () => {
    const [page1, setPage1] = useState(1)
    const [page2, setPage2] = useState(1)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3>Filled</h3>
          <Pagination
            current={page1}
            total={10}
            onChange={setPage1}
            color="#228BE6"
            variant="filled"
          />
        </div>
        <div>
          <h3>Outline</h3>
          <Pagination
            current={page2}
            total={10}
            onChange={setPage2}
            color="#228BE6"
            variant="outline"
          />
        </div>
      </div>
    )
  },
}

// 많은 페이지
export const ManyPages: Story = {
  render: () => {
    const [page, setPage] = useState(5)

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>현재 페이지: {page}</div>
        <Pagination current={page} total={100} onChange={setPage} color="#228BE6" />
      </div>
    )
  },
}

// max 값 변경
export const Max: Story = {
  render: () => {
    const [page, setPage] = useState(1)
    const [page2, setPage2] = useState(1)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3>한 번에 보여줄 페이지 수: 7</h3>
          <Pagination current={page} total={100} onChange={setPage} max={7} />
        </div>
        <div>
          <h3>한 번에 보여줄 페이지 수: 15</h3>
          <Pagination current={page2} total={100} onChange={setPage2} max={15} />
        </div>
      </div>
    )
  },
}

// 비활성화 상태
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>기본</h3>
        <Pagination current={5} total={10} onChange={() => {}} disabled />
      </div>
      <div>
        <h3>색상 적용</h3>
        <Pagination current={5} total={10} onChange={() => {}} disabled color="#228BE6" />
      </div>
    </div>
  ),
}

// Double Arrow 버튼 표시 여부
export const DoubleArrowButtons: Story = {
  render: () => {
    const [page1, setPage1] = useState(1)
    const [page2, setPage2] = useState(1)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3>Double Arrow 버튼 표시 (기본)</h3>
          <Pagination
            current={page1}
            total={100}
            onChange={setPage1}
            color="#228BE6"
            showArrowDoubleIcon={true}
          />
        </div>
        <div>
          <h3>Double Arrow 버튼 숨김</h3>
          <Pagination
            current={page2}
            total={100}
            onChange={setPage2}
            color="#228BE6"
            showArrowDoubleIcon={false}
          />
        </div>
      </div>
    )
  },
}
