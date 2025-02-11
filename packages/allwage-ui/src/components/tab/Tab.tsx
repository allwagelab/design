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
<<<<<<< HEAD
  className?: string
=======
>>>>>>> main
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
`

const TabButton = styled.button<{ isActive: boolean; disabled?: boolean }>`
  flex: 1;
  padding: 13px 4px;
  background: none;
  border: none;
  outline: none;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  position: relative;
  ${theme.typography.body.b1_rg};
  color: ${props =>
    props.disabled
      ? theme.colors.gray40
      : props.isActive
        ? theme.colors.gray90
        : theme.colors.gray80};
  font-weight: ${props => (props.isActive ? 600 : 400)};
  white-space: nowrap;

  ${props =>
    props.isActive &&
    !props.disabled &&
    `
    &::before {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: ${theme.colors.gray90};
    }
  `}
`

<<<<<<< HEAD
export default function Tab({ items, activeId, onChange, disabled = false, className }: TabProps) {
  return (
    <TabContainer className={className}>
=======
export default function Tab({ items, activeId, onChange, disabled = false }: TabProps) {
  return (
    <TabContainer>
>>>>>>> main
      <TabList>
        {items.map(item => (
          <TabButton
            key={item.id}
            isActive={item.id === activeId}
            disabled={disabled}
            onClick={() => !disabled && onChange(item.id)}
          >
            {item.label}
          </TabButton>
        ))}
      </TabList>
    </TabContainer>
  )
}
