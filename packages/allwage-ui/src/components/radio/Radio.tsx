import { ChangeEvent } from 'react'

import { theme } from '@allwagelab/design'
import isPropValid from '@emotion/is-prop-valid'
import styled from '@emotion/styled'

interface RadioProps {
  checked?: boolean
  disabled?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  name?: string
  value?: string
  label?: string
}

const RadioWrapper = styled.label<{ disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  user-select: none;
`

const RadioInput = styled('input', {
  shouldForwardProp: prop => isPropValid(prop),
})`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
`

const RadioControl = styled.div<{ checked?: boolean; disabled?: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid
    ${props =>
      props.disabled
        ? theme.colors.gray30
        : props.checked
          ? theme.colors.blue60
          : theme.colors.gray40};
  background-color: ${props => (props.disabled ? theme.colors.gray30 : theme.colors.baseWhite)};
  position: relative;
  transition: all 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: ${props =>
      props.disabled
        ? theme.colors.baseWhite
        : props.checked
          ? theme.colors.blue60
          : theme.colors.gray40};
    transition: all 0.2s ease;
  }

  ${RadioInput}:focus-visible + & {
    box-shadow: 0 0 0 2px ${theme.colors.blue20};
  }

  &:hover:not([disabled]) {
    border-color: ${props =>
      props.disabled
        ? theme.colors.gray30
        : props.checked
          ? theme.colors.blue50
          : theme.colors.gray60};

    &::after {
      background-color: ${props =>
        props.disabled
          ? theme.colors.gray30
          : props.checked
            ? theme.colors.blue50
            : theme.colors.gray50};
    }
  }
`

const RadioLabel = styled.span<{ disabled?: boolean }>`
  color: ${props => (props.disabled ? theme.colors.gray60 : theme.colors.gray90)};
  ${theme.typography.body.b3_rg};
`

export default function Radio({
  checked = false,
  disabled = false,
  onChange,
  name,
  value,
  label,
  ...props
}: RadioProps) {
  return (
    <RadioWrapper disabled={disabled}>
      <RadioInput
        type="radio"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        name={name}
        value={value}
        {...props}
      />
      <RadioControl checked={checked} disabled={disabled} />
      {label && <RadioLabel disabled={disabled}>{label}</RadioLabel>}
    </RadioWrapper>
  )
}
