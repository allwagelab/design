import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import Radio from './Radio'
import RadioGroup from './RadioGroup'

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: '라디오 선택 상태',
    },
    disabled: {
      control: 'boolean',
      description: '라디오 비활성화 상태',
    },
    label: {
      control: 'text',
      description: '라디오 라벨',
    },
  },
}

export default meta
type Story = StoryObj<typeof Radio>

// 기본 라디오
export const Default: Story = {
  args: {
    label: '텍스트 내용 텍스트 내용',
  },
}

// 라디오 상태
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Radio label="기본 상태" />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Radio label="선택된 상태" checked />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Radio label="비활성화 상태" disabled />
      </div>
    </div>
  ),
}

// 라디오 그룹
export const Group: Story = {
  render: function Controlled() {
    const [value, setValue] = useState('option1')

    return (
      <RadioGroup name="group-example" value={value} onChange={setValue} label="라디오 그룹">
        <Radio value="option1" label="옵션 1" />
        <Radio value="option2" label="옵션 2" />
        <Radio value="option3" label="옵션 3" />
      </RadioGroup>
    )
  },
}

// 가로 방향 라디오 그룹
export const HorizontalGroup: Story = {
  render: function Controlled() {
    const [value, setValue] = useState('option1')

    return (
      <RadioGroup
        name="horizontal-group"
        value={value}
        onChange={setValue}
        direction="horizontal"
        label="가로 방향 라디오 그룹"
      >
        <Radio value="option1" label="옵션 1" />
        <Radio value="option2" label="옵션 2" />
        <Radio value="option3" label="옵션 3" />
      </RadioGroup>
    )
  },
}

// 비활성화된 라디오 그룹
export const DisabledGroup: Story = {
  render: function Controlled() {
    const [value, setValue] = useState('option1')

    return (
      <RadioGroup
        name="disabled-group"
        value={value}
        onChange={setValue}
        disabled
        label="비활성화된 라디오 그룹"
      >
        <Radio value="option1" label="옵션 1" />
        <Radio value="option2" label="옵션 2" />
        <Radio value="option3" label="옵션 3" />
      </RadioGroup>
    )
  },
}

// 에러 상태의 라디오 그룹
export const ErrorGroup: Story = {
  render: function Controlled() {
    const [value, setValue] = useState('')

    return (
      <RadioGroup
        name="error-group"
        value={value}
        error={!value}
        label="필수 선택 항목"
        onChange={setValue}
      >
        <Radio value="option1" label="옵션 1" />
        <Radio value="option2" label="옵션 2" />
        <Radio value="option3" label="옵션 3" />
      </RadioGroup>
    )
  },
}

// 실제 사용 예시
export const Examples: Story = {
  render: function Examples() {
    const [paymentMethod, setPaymentMethod] = useState('card')
    const [shippingOption, setShippingOption] = useState('standard')

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '300px' }}>
        <RadioGroup
          name="payment"
          value={paymentMethod}
          onChange={setPaymentMethod}
          label="결제 수단"
        >
          <Radio value="card" label="신용카드" />
          <Radio value="bank" label="계좌이체" />
          <Radio value="phone" label="휴대폰 결제" />
          <Radio value="kakao" label="카카오페이" disabled />
        </RadioGroup>

        <RadioGroup
          name="shipping"
          value={shippingOption}
          onChange={setShippingOption}
          label="배송 방법"
          direction="horizontal"
        >
          <Radio value="standard" label="일반 배송" />
          <Radio value="express" label="특급 배송" />
        </RadioGroup>
      </div>
    )
  },
}
