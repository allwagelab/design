import { useState } from 'react'

import { theme } from '@allwagelab/design'
import type { Meta, StoryObj } from '@storybook/react'

import Table from './Table'

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      description: '테이블 컬럼 정보',
    },
    hasCheckbox: {
      control: 'boolean',
      description: '체크박스 표시 여부',
    },
    selectedIds: {
      description: '선택된 행의 ID 배열',
    },
    onSelectedChange: {
      description: '선택된 행이 변경될 때 호출되는 함수',
      action: 'selected',
    },
    title: {
      control: 'text',
      description: '테이블 제목 (접근성용)',
    },
    startNo: {
      control: 'number',
      description: 'No. 컬럼 시작 번호',
      defaultValue: 1,
    },
    noDataMessage: {
      control: 'text',
      description: '데이터가 없을 때 표시할 메시지',
      defaultValue: '데이터가 없습니다.',
    },
  },
}

export default meta
type Story = StoryObj<typeof Table>

const COLUMNS = [
  { key: 'workType', label: '근무형태' },
  { key: 'name', label: '직원명' },
  { key: 'gender', label: '성별', align: 'center' as const, width: 80 },
]

const DATA = [
  { id: '1', workType: '계약직', name: '홍길동', gender: '남성' },
  { id: '2', workType: '정규직', name: '김철수', gender: '남성' },
  { id: '3', workType: '계약직', name: '이영희', gender: '여성' },
]

// 기본 테이블
export const Default: Story = {
  args: {
    columns: COLUMNS,
    startNo: 1,
  },
  render: ({ startNo, columns }) => (
    <div style={{ padding: '24px' }}>
      <Table columns={columns} startNo={startNo}>
        {DATA.map(row => (
          <Table.Row key={row.id}>
            <Table.Cell>{row.workType}</Table.Cell>
            <Table.Cell>{row.name}</Table.Cell>
            <Table.Cell align="center">{row.gender}</Table.Cell>
          </Table.Row>
        ))}
      </Table>
    </div>
  ),
}

// 체크박스가 있는 테이블
export const WithCheckbox: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([])

    return (
      <div style={{ padding: '24px', backgroundColor: theme.colors.gray0 }}>
        <div style={{ marginBottom: '16px' }}>
          <div>
            선택된 항목: {selectedIds.map(id => DATA.find(item => item.id === id)?.name).join(', ')}
          </div>
          <div>선택된 개수: {selectedIds.length}개</div>
        </div>
        <Table
          columns={COLUMNS}
          hasCheckbox
          selectedIds={selectedIds}
          onSelectedChange={setSelectedIds}
          startNo={1}
        >
          {DATA.map(row => (
            <Table.Row key={row.id}>
              <Table.Cell>{row.workType}</Table.Cell>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell align="center">{row.gender}</Table.Cell>
            </Table.Row>
          ))}
        </Table>
      </div>
    )
  },
}

// 데이터가 없는 경우
export const NoData: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ padding: '24px', backgroundColor: theme.colors.gray0 }}>
        <h3>기본 메시지</h3>
        <Table columns={COLUMNS}>{[]}</Table>
      </div>
      <div style={{ padding: '24px', backgroundColor: theme.colors.gray0 }}>
        <h3>커스텀 텍스트 메시지</h3>
        <Table columns={COLUMNS} noDataMessage="표시할 데이터가 존재하지 않습니다.">
          {[]}
        </Table>
      </div>
      <div style={{ padding: '24px', backgroundColor: theme.colors.gray0 }}>
        <h3>커스텀 컴포넌트 메시지</h3>
        <Table
          columns={COLUMNS}
          noDataMessage={
            <div
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
            >
              <span style={{ color: theme.colors.gray70 }}>검색 결과가 없습니다.</span>
              <span style={{ color: theme.colors.gray50, fontSize: '14px' }}>
                다른 검색어를 입력해 주세요.
              </span>
            </div>
          }
        >
          {[]}
        </Table>
      </div>
    </div>
  ),
}

const COLUMNS2 = [
  { key: 'workType', label: '근무형태' },
  { key: 'name', label: '직원명' },
]

// 클릭 가능한 행
export const ClickableRows: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string>()

    return (
      <Table columns={COLUMNS2} startNo={11} selectedRowId={selectedId}>
        {DATA.map(row => (
          <Table.Row key={row.id} onClick={() => setSelectedId(row.id)}>
            {COLUMNS2.map(column => {
              const cellValue = row[column.key as 'workType' | 'name']
              return <Table.Cell key={column.key}>{cellValue}</Table.Cell>
            })}
          </Table.Row>
        ))}
      </Table>
    )
  },
}
