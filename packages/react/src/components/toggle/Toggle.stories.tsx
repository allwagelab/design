import { useState } from 'react'

import { theme } from '@allwagelab/design'
import type { Meta, StoryObj } from '@storybook/react'

import Toggle from './Toggle'

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: '토글 선택 상태',
    },
    disabled: {
      control: 'boolean',
      description: '토글 비활성화 상태',
    },
  },
}

export default meta
type Story = StoryObj<typeof Toggle>

// 기본 토글
export const Default: Story = {
  args: {
    checked: false,
  },
}

// 토글 상태
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Toggle />
        <span style={{ color: theme.colors.gray80 }}>기본 상태</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Toggle checked />
        <span style={{ color: theme.colors.gray80 }}>활성화된 상태</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Toggle disabled />
        <span style={{ color: theme.colors.gray60 }}>비활성화된 상태</span>
      </div>
    </div>
  ),
}

// 컨트롤된 토글
export const Controlled: Story = {
  render: function Controlled() {
    const [checked, setChecked] = useState(false)

    return <Toggle checked={checked} onChange={e => setChecked(e.target.checked)} />
  },
}

// 토글 사용 예시
export const Examples: Story = {
  render: function Examples() {
    const [settings, setSettings] = useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
    })

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '300px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 500 }}>알림</div>
            <div style={{ fontSize: '0.875rem', color: '#666' }}>푸시 알림 수신 여부</div>
          </div>
          <Toggle
            checked={settings.notifications}
            onChange={e => setSettings(prev => ({ ...prev, notifications: e.target.checked }))}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 500 }}>자동 저장</div>
            <div style={{ fontSize: '0.875rem', color: '#666' }}>작성 중인 내용 자동 저장</div>
          </div>
          <Toggle
            checked={settings.autoSave}
            onChange={e => setSettings(prev => ({ ...prev, autoSave: e.target.checked }))}
          />
        </div>
      </div>
    )
  },
}
