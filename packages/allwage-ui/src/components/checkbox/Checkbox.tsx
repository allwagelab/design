import { ChangeEvent } from 'react'

import { theme } from '@allwagelab/design'
import isPropValid from '@emotion/is-prop-valid'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { CheckIcon } from '../../icons/check-icon'

interface CheckboxProps {
  checked?: boolean
  disabled?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  label?: string
  name?: string
  value?: string
}

const CheckboxContainer = styled.label<{ disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  user-select: none;
`

const CheckboxInput = styled('input', {
  shouldForwardProp: prop => isPropValid(prop),
})`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
`

const CheckboxControl = styled.div<{ checked?: boolean; disabled?: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid ${theme.colors.gray30};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  background-color: ${theme.colors.baseWhite};

  ${({ checked, disabled }) => {
    if (checked && !disabled) {
      return css`
        background-color: ${theme.colors.blue60};
        border-color: ${theme.colors.blue60};
      `
    }
    if (checked && disabled) {
      return css`
        background-color: ${theme.colors.gray30};
        border-color: ${theme.colors.gray30};
      `
    }
    if (!checked && disabled) {
      return css`
        background-color: ${theme.colors.gray10};
        border-color: ${theme.colors.gray30};
      `
    }
    return ''
  }}

  ${CheckboxInput}:focus-visible + & {
    box-shadow: 0 0 0 2px ${theme.colors.blue20};
  }

  svg {
    color: ${props => (props.disabled ? theme.colors.gray50 : theme.colors.baseWhite)};
    opacity: ${props => (props.checked ? 1 : 0)};
    transition: opacity 0.2s ease;
  }
`

const CheckboxLabel = styled.span<{ disabled?: boolean }>`
  color: ${props => (props.disabled ? theme.colors.gray60 : theme.colors.gray90)};
  ${theme.typography.body.b2_rg};
`

export default function Checkbox({
  checked = false,
  disabled = false,
  onChange,
  label,
  name,
  value,
  ...props
}: CheckboxProps) {
  return (
    <CheckboxContainer disabled={disabled}>
      <CheckboxInput
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        name={name}
        value={value}
        {...props}
      />
      <CheckboxControl checked={checked} disabled={disabled}>
        <CheckIcon />
      </CheckboxControl>
      {label && <CheckboxLabel disabled={disabled}>{label}</CheckboxLabel>}
    </CheckboxContainer>
  )
}
