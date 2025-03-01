import { ChangeEvent } from 'react'

import { theme } from '@allwagelab/design'
import isPropValid from '@emotion/is-prop-valid'
import styled from '@emotion/styled'

interface ToggleProps {
  checked?: boolean
  disabled?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  name?: string
  value?: string
  className?: string
}

const ToggleWrapper = styled.label<{ disabled?: boolean }>`
  display: inline-block;
  position: relative;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  user-select: none;
`

const ToggleInput = styled('input', {
  shouldForwardProp: prop => isPropValid(prop),
})`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
`

const ToggleTrack = styled.div<{ checked?: boolean; disabled?: boolean }>`
  width: 44px;
  height: 24px;
  background-color: ${props =>
    props.disabled
      ? theme.colors.gray30
      : props.checked
        ? theme.colors.blue20
        : theme.colors.gray30};
  border-radius: 12px;
  transition: all 0.2s ease;
  position: relative;
  cursor: pointer;

  ${ToggleInput}:focus-visible + & {
    box-shadow: 0 0 0 2px ${theme.colors.blue20};
  }
`

const ToggleKnob = styled.div<{ checked?: boolean; disabled?: boolean }>`
  width: 28px;
  height: 28px;
  background-color: ${props =>
    props.disabled
      ? theme.colors.gray40
      : props.checked
        ? theme.colors.blue50
        : theme.colors.baseWhite};
  border-radius: 50%;
  position: absolute;
  top: -2px;
  left: -2px;
  transition: transform 0.2s ease;
  transform: ${props => (props.checked ? 'translateX(20px)' : 'translateX(0)')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

export default function Toggle({
  checked = false,
  disabled = false,
  onChange,
  name,
  value,
  className,
  ...props
}: ToggleProps) {
  return (
    <ToggleWrapper disabled={disabled} className={className}>
      <ToggleInput
        type="checkbox"
        defaultChecked={checked}
        disabled={disabled}
        onChange={onChange}
        name={name}
        value={value}
        {...props}
      />
      <ToggleTrack checked={checked} disabled={disabled}>
        <ToggleKnob checked={checked} disabled={disabled} />
      </ToggleTrack>
    </ToggleWrapper>
  )
}
