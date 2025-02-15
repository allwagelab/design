import { useState, useMemo } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import * as Icons from './index'

const meta = {
  title: 'Components/Icons',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta

export default meta

// 모든 아이콘 컴포넌트를 배열로 변환
const iconList = Object.entries(Icons)
  .filter(([name]) => name.includes('Icon'))
  .map(([name, component]) => ({
    name,
    component,
  }))

const IconGallery = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredIcons = useMemo(
    () => iconList.filter(({ name }) => name.toLowerCase().includes(searchTerm.toLowerCase())),
    [searchTerm],
  )

  return (
    <div style={{ width: '100%', maxWidth: '1200px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          gap: '1rem',
        }}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="아이콘 검색..."
          style={{
            width: '300px',
            padding: '0.75rem',
            fontSize: '1rem',
            border: '1px solid #e2e8f0',
            borderRadius: '0.5rem',
            outline: 'none',
          }}
        />
        <span
          style={{
            fontSize: '0.875rem',
            color: '#718096',
            backgroundColor: '#f7fafc',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
          }}
        >
          아이콘을 클릭하면 아이콘 이름이 복사됩니다
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: '1rem',
          padding: '1rem',
          backgroundColor: '#ffffff',
          borderRadius: '0.5rem',
          border: '1px solid #e2e8f0',
        }}
      >
        {filteredIcons.map(({ name, component: Icon }) => (
          <IconDisplay key={name} name={name} icon={Icon} copyable />
        ))}
      </div>

      {filteredIcons.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '2rem',
            color: '#666',
          }}
        >
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  )
}

export const IconSearch: StoryObj = {
  render: () => <IconGallery />,
}

// 기존 스토리들...
export const IconSizes: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Icons.ArrowIcon size={12} />
      <Icons.ArrowIcon size={16} />
      <Icons.ArrowIcon size={24} />
      <Icons.ArrowIcon size={32} />
    </div>
  ),
}

export const IconColors: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Icons.ArrowIcon size={24} color="#FF0000" />
      <Icons.ArrowIcon size={24} color="#00FF00" />
      <Icons.ArrowIcon size={24} color="#0000FF" />
      <Icons.ArrowIcon size={24} color="#FFD700" />
    </div>
  ),
}

export const AlarmStates: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
        >
          <Icons.AlarmIcon size={24} />
          <span style={{ fontSize: '0.875rem', color: '#666' }}>기본 상태</span>
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
        >
          <Icons.AlarmIcon size={24} hasNotification />
          <span style={{ fontSize: '0.875rem', color: '#666' }}>알림 있음</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
        >
          <Icons.AlarmIcon size={24} color="#FF0000" />
          <span style={{ fontSize: '0.875rem', color: '#666' }}>색상 변경</span>
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
        >
          <Icons.AlarmIcon size={24} hasNotification notificationColor="#FF0000" />
          <span style={{ fontSize: '0.875rem', color: '#666' }}>알림 색상 변경</span>
        </div>
      </div>
    </div>
  ),
}

// 헬퍼 컴포넌트
const IconDisplay = ({
  name,
  icon: Icon,
  copyable = false,
}: {
  name: string
  icon: any
  copyable?: boolean
}) => {
  const handleCopy = () => {
    const importStatement = `${name}`
    navigator.clipboard
      .writeText(importStatement)
      .then(() => alert('복사되었습니다!'))
      .catch(err => console.error('복사 실패:', err))
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0.75rem',
        borderRadius: '8px',
        cursor: copyable ? 'pointer' : 'default',
        transition: 'all 0.2s',
      }}
      onClick={copyable ? handleCopy : undefined}
      onMouseOver={e => {
        if (copyable) {
          e.currentTarget.style.backgroundColor = '#f7fafc'
        }
      }}
      onMouseOut={e => {
        if (copyable) {
          e.currentTarget.style.backgroundColor = 'transparent'
        }
      }}
    >
      <Icon size={24} />
      <span
        style={{
          marginTop: '0.5rem',
          fontSize: '0.75rem',
          color: '#4a5568',
          textAlign: 'center',
        }}
      >
        {name}
      </span>
    </div>
  )
}
