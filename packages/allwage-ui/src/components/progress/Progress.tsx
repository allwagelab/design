import { forwardRef } from 'react'

import { theme } from '@allwagelab/design'
import styled from '@emotion/styled'

import { ExclamationCircleIcon } from '../../icons/exclamation-circle'
import Dot from '../dot/Dot'

interface ProgressProps {
  value: number
  width?: number
  type?: 'normal' | 'warning'
  label?: string
  valueLabel?: string
  disabled?: boolean
<<<<<<< HEAD
  className?: string
=======
>>>>>>> main
}

const ProgressContainer = styled.div<{ width?: number }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: ${props => (props.width ? `${props.width}px` : '100%')};
  min-width: 100px;
`

const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`

const Label = styled.span`
  ${theme.typography.body.b1_rg};
  color: ${theme.colors.gray100};
  font-weight: 600;
`

const Value = styled.span<{ type: 'normal' | 'warning' }>`
  display: flex;
  align-items: center;
  gap: ${props => (props.type === 'warning' ? '4.5px' : '6px')};
  ${theme.typography.body.b1_rg};
  color: ${theme.colors.gray100};
  font-weight: 600;
`

const ProgressBarContainer = styled.div<{
  bgColor: string
  disabled?: boolean
}>`
  width: 100%;
  height: 16px;
  background-color: ${props => props.bgColor};
  border-radius: 4px;
  overflow: hidden;
`

const ProgressBar = styled.div<{
  value: number
  color: string
  disabled?: boolean
}>`
  width: ${props => props.value}%;
  height: 100%;
  background-color: ${props => props.color};
  transition: width 0.3s ease;
`

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
<<<<<<< HEAD
    {
      value,
      width,
      label,
      valueLabel,
      disabled = false,
      type = 'normal',
      className,
    }: ProgressProps,
=======
    { value, width, label, valueLabel, disabled = false, type = 'normal' }: ProgressProps,
>>>>>>> main
    ref: React.Ref<HTMLDivElement> | undefined,
  ) => {
    const normalizedValue = Math.min(100, Math.max(0, value))
    const color = disabled
      ? theme.colors.gray40
      : type === 'warning'
        ? theme.colors.orange50
        : theme.colors.blue60

    const bgColor = disabled
      ? theme.colors.gray20
      : type === 'warning'
        ? theme.colors.orange10
        : theme.colors.blue20

    return (
<<<<<<< HEAD
      <ProgressContainer width={width} className={className}>
=======
      <ProgressContainer width={width}>
>>>>>>> main
        <LabelContainer>
          <Label>{label}</Label>
          {valueLabel && (
            <Value type={type}>
              {type === 'normal' ? (
                <Dot color={color} />
              ) : (
                <ExclamationCircleIcon size={15} color={color} />
              )}
              {valueLabel}
            </Value>
          )}
        </LabelContainer>
        <ProgressBarContainer bgColor={bgColor} disabled={disabled}>
          <ProgressBar ref={ref} value={normalizedValue} color={color} disabled={disabled} />
        </ProgressBarContainer>
      </ProgressContainer>
    )
  },
)

Progress.displayName = 'Progress'

export default Progress
