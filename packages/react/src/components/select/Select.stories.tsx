import type { Meta, StoryObj } from '@storybook/react'

import Select from './Select'

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: '셀렉트 박스의 크기',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    full: {
      control: 'boolean',
      description: '전체 너비 사용',
    },
    placeholder: {
      control: 'text',
      description: '기본 표시 텍스트',
    },
    value: {
      control: 'text',
      description: '선택된 값',
    },
  },
}

export default meta
type Story = StoryObj<typeof Select>

const defaultOptions = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
  { value: 'option4', label: '옵션 4' },
]

// 기본 셀렉트
export const Default: Story = {
  args: {
    options: defaultOptions,
    placeholder: '선택해 주세요',
  },
}

// 크기 변형
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Select options={defaultOptions} size="sm" placeholder="Small" />
      <Select options={defaultOptions} size="md" placeholder="Medium" />
      <Select options={defaultOptions} size="lg" placeholder="Large" />
      <Select options={defaultOptions} size="xl" placeholder="Extra Large" />
    </div>
  ),
}

// 상태
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Select options={defaultOptions} placeholder="기본 상태" />
      <Select options={defaultOptions} value="option1" placeholder="선택된 상태" />
      <Select options={defaultOptions} disabled placeholder="비활성화 상태" />
    </div>
  ),
}

// 전체 너비
export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '500px' }}>
      <Select options={defaultOptions} full placeholder="전체 너비 셀렉트" />
    </div>
  ),
}

// 긴 옵션 텍스트
export const LongOptions: Story = {
  render: () => (
    <Select
      options={[
        { value: 'option1', label: '아주 긴 옵션 텍스트가 있는 경우의 예시입니다' },
        { value: 'option2', label: '두 번째로 긴 옵션 텍스트 예시' },
        { value: 'option3', label: '일반적인 길이의 옵션' },
      ]}
      placeholder="긴 텍스트 옵션 예시"
    />
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
        maxWidth: '500px',
      }}
    >
      {/* 기본적인 폼 필드 */}
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>거주지역</label>
        <Select
          options={[
            { value: 'seoul', label: '서울특별시' },
            { value: 'busan', label: '부산광역시' },
            { value: 'incheon', label: '인천광역시' },
            { value: 'daegu', label: '대구광역시' },
          ]}
          placeholder="거주지역을 선택해주세요"
          full
        />
      </div>

      {/* 크기가 다른 인라인 셀렉트 */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Select options={[{ value: 'year', label: '2024' }]} size="sm" value="year" />
        <Select options={[{ value: 'month', label: '3' }]} size="sm" value="month" />
      </div>

      {/* 비활성화된 필드가 포함된 폼 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Select options={[{ value: 'department', label: '개발팀' }]} value="department" disabled />
        <Select
          options={[
            { value: 'position1', label: '팀장' },
            { value: 'position2', label: '팀원' },
          ]}
          placeholder="직책을 선택해주세요"
          hasRemoveBtn
        />
      </div>
    </div>
  ),
}
