import { ChangeEvent, useCallback, useState } from 'react'

import { theme } from '@allwagelab/design'
import isPropValid from '@emotion/is-prop-valid'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

type TextAreaSizeVariant = 'sm' | 'md' | 'lg'

const TEXTAREA_SIZES: Record<TextAreaSizeVariant, ReturnType<typeof css>> = {
  sm: css`
    min-height: 70px;
    ${theme.typography.body.b2_rg};
  `,
  md: css`
    min-height: 92px;
    ${theme.typography.body.b1_rg};
  `,
  lg: css`
    min-height: 150px;
    ${theme.typography.body.b1_rg};
  `,
}

interface BaseTextAreaCssProps {
  full?: boolean
  sizeVariant?: TextAreaSizeVariant
  error?: boolean
  disabled?: boolean
}

interface TextAreaProps extends BaseTextAreaCssProps {
  value?: string
  defaultValue?: string
  maxLength?: number
  placeholder?: string
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

const baseTextAreaCss = ({ full, sizeVariant = 'md' }: BaseTextAreaCssProps) => css`
  display: block;
  width: ${full ? '100%' : '320px'};
  outline: none;
  background-color: ${theme.colors.baseWhite};
  color: ${theme.colors.gray100};
  transition: all 0.2s ease;
  resize: none;

  ${TEXTAREA_SIZES[sizeVariant]}

  &::placeholder {
    color: ${theme.colors.gray80};
  }
`

const TextAreaWrapper = styled.div<{ full?: boolean; error?: boolean }>`
  position: relative;
  width: ${props => (props.full ? '100%' : 'auto')};
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid ${props => (props.error ? theme.colors.baseRed : theme.colors.gray30)};
  overflow: hidden;
`

const CharacterCount = styled.div<{ isFull: boolean }>`
  width: 100%;
  text-align: end;
  margin-top: 1rem;
  color: ${props => (props.isFull ? theme.colors.baseRed : theme.colors.gray60)};
  ${theme.typography.caption.c1_rg};
  pointer-events: none;
  background-color: transparent;
`

const TextAreaBase = styled('textarea', {
  shouldForwardProp: prop => isPropValid(prop),
})<BaseTextAreaCssProps>`
  ${props => baseTextAreaCss(props)}
`

export default function TextArea({
  full,
  sizeVariant = 'md',
  error = false,
  disabled = false,
  value,
  defaultValue,
  onChange,
  maxLength = 200,
  placeholder,
  ...props
}: TextAreaProps) {
  const [currentLength, setCurrentLength] = useState(() => {
    if (value !== undefined) return value.length
    if (defaultValue) return defaultValue.length
    return 0
  })

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value
      if (maxLength && newValue.length > maxLength) {
        e.target.value = newValue.slice(0, maxLength)
      }
      setCurrentLength(e.target.value.length)
      onChange?.(e)
    },
    [maxLength, onChange],
  )

  return (
    <TextAreaWrapper full={full} error={error}>
      <TextAreaBase
        full={full}
        sizeVariant={sizeVariant}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        maxLength={maxLength}
        placeholder={placeholder}
        {...props}
      />
      {maxLength && (
        <CharacterCount isFull={currentLength === maxLength}>
          {currentLength}/{maxLength}
        </CharacterCount>
      )}
    </TextAreaWrapper>
  )
}
