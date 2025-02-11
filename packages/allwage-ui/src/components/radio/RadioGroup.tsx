import { ChangeEvent, ReactNode } from 'react'

import { theme } from '@allwagelab/design'
import styled from '@emotion/styled'

interface RadioGroupProps {
  children: ReactNode
  value?: string
  onChange?: (value: string) => void
  name: string
  label?: string
  disabled?: boolean
  error?: boolean
  direction?: 'horizontal' | 'vertical'
  className?: string
}

const RadioGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const RadioGroupLabel = styled.div`
  color: ${theme.colors.gray90};
  ${theme.typography.body.b2_rg};
  margin-bottom: 0.5rem;
`

const RadioGroupContent = styled.div<{ direction?: 'horizontal' | 'vertical' }>`
  display: flex;
  flex-direction: ${props => (props.direction === 'horizontal' ? 'row' : 'column')};
  gap: ${props => (props.direction === 'horizontal' ? '2rem' : '0.75rem')};
`

const ErrorMessage = styled.div`
  color: ${theme.colors.baseRed};
  ${theme.typography.caption.c1_rg};
  margin-top: 0.25rem;
`

export default function RadioGroup({
  children,
  value,
  onChange,
  name,
  label,
  disabled = false,
  error = false,
  direction = 'vertical',
  className,
}: RadioGroupProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  return (
    <RadioGroupWrapper className={className}>
      {label && <RadioGroupLabel>{label}</RadioGroupLabel>}
      <RadioGroupContent direction={direction}>
        {Array.isArray(children)
          ? children.map(child => {
              if (!child) return null
              return {
                ...child,
                props: {
                  ...child.props,
                  name,
                  checked: child.props.value === value,
                  onChange: handleChange,
                  disabled: disabled || child.props.disabled,
                },
              }
            })
          : children}
      </RadioGroupContent>
      {error && <ErrorMessage>필수 항목입니다.</ErrorMessage>}
    </RadioGroupWrapper>
  )
}
