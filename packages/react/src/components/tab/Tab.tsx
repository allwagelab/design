import { useEffect, useRef, useState } from 'react'

import { theme } from '@allwagelab/design'
import styled from '@emotion/styled'

interface TabItem {
  id: string
  label: string
}

interface TabProps {
  items: TabItem[]
  activeId: string
  onChange: (id: string) => void
  disabled?: boolean
  className?: string
}

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const TabList = styled.div`
  display: flex;
  position: relative;
  gap: 12px;
  border-bottom: 1px solid ${theme.colors.gray20};
`

const TabButton = styled.button<{ isActive: boolean; disabled?: boolean }>`
  padding: 13px 4px;
  background: none;
  border: none;
  outline: none;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  position: relative;
  ${theme.typography.body.b1_rg};
  font-weight: 600;
  color: ${props => (props.disabled ? theme.colors.gray40 : theme.colors.gray90)};
  opacity: ${props => (props.isActive || props.disabled ? 1 : 0.6)};
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${theme.colors.gray20};
    opacity: ${props => (props.isActive ? 1 : 0.8)};
  }
`

const ActiveIndicator = styled.div<{ left: number; width: number }>`
  position: absolute;
  bottom: -1px;
  height: 2px;
  background-color: ${theme.colors.gray90};
  transition: all 0.3s ease;
  left: ${props => props.left}px;
  width: ${props => props.width}px;
`

export default function Tab({ items, activeId, onChange, disabled = false, className }: TabProps) {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const activeIndex = items.findIndex(item => item.id === activeId)
    const activeTab = tabsRef.current[activeIndex]

    if (activeTab) {
      setIndicatorStyle({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
      })
    }
  }, [activeId, items])

  return (
    <TabContainer className={className}>
      <TabList>
        {items.map((item, index) => (
          <TabButton
            key={item.id}
            ref={el => (tabsRef.current[index] = el)}
            isActive={item.id === activeId}
            disabled={disabled}
            onClick={() => !disabled && onChange(item.id)}
          >
            {item.label}
          </TabButton>
        ))}
        {!disabled && <ActiveIndicator left={indicatorStyle.left} width={indicatorStyle.width} />}
      </TabList>
    </TabContainer>
  )
}
