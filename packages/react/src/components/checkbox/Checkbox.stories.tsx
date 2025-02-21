import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import Checkbox from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: '체크박스 선택 상태',
    },
    disabled: {
      control: 'boolean',
      description: '체크박스 비활성화 상태',
    },
    label: {
      control: 'text',
      description: '체크박스 라벨',
    },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

// 기본 체크박스
export const Default: Story = {
  args: {
    label: '텍스트 내용 텍스트 내용',
  },
}

// 체크박스 상태
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox label="기본 상태" />
      <Checkbox label="체크된 상태" checked />
      <Checkbox label="비활성화 상태" disabled />
      <Checkbox label="체크된 비활성화 상태" checked disabled />
    </div>
  ),
}

// 컨트롤된 체크박스
export const Controlled: Story = {
  render: function Controlled() {
    const [checked, setChecked] = useState(false)

    return (
      <Checkbox
        label="컨트롤된 체크박스"
        checked={checked}
        onChange={e => setChecked(e.target.checked)}
      />
    )
  },
}

// 체크박스 그룹 예시
export const Examples: Story = {
  render: function Examples() {
    const [checkedItems, setCheckedItems] = useState({
      item1: false,
      item2: false,
      item3: false,
    })

    const handleChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setCheckedItems(prev => ({
        ...prev,
        [name]: e.target.checked,
      }))
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <h3>이용약관</h3>
        </div>
        <Checkbox
          label="전체 동의"
          checked={Object.values(checkedItems).every(Boolean)}
          onChange={e => {
            setCheckedItems({
              item1: e.target.checked,
              item2: e.target.checked,
              item3: e.target.checked,
            })
          }}
        />
        <div
          style={{ marginLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
          <Checkbox
            label="[필수] 서비스 이용약관 동의"
            checked={checkedItems.item1}
            onChange={handleChange('item1')}
          />
          <Checkbox
            label="[필수] 개인정보 수집 및 이용 동의"
            checked={checkedItems.item2}
            onChange={handleChange('item2')}
          />
          <Checkbox
            label="[선택] 마케팅 정보 수신 동의"
            checked={checkedItems.item3}
            onChange={handleChange('item3')}
          />
        </div>
      </div>
    )
  },
}
