import { useState, useCallback, forwardRef } from 'react'

import { theme } from '@allwagelab/design'
import isPropValid from '@emotion/is-prop-valid'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { SearchIcon } from '../../icons'

type InputSizeVariant = 'sm' | 'md' | 'lg' | 'xl'

const INPUT_SIZES: Record<InputSizeVariant, ReturnType<typeof css>> = {
  sm: css`
    height: 36px;
    padding: 0 0.75rem;
    ${theme.typography.caption.c1_rg};

    &::placeholder {
      ${theme.typography.caption.c1_rg};
    }
  `,
  md: css`
    height: 44px;
    ${theme.typography.body.b3_rg};
  `,
  lg: css`
    height: 48px;
    ${theme.typography.body.b3_rg};
  `,
  xl: css`
    height: 56px;
    ${theme.typography.body.b1_rg};
  `,
}

export interface BaseInputCssProps {
  full?: boolean
  sizeVariant?: InputSizeVariant
  hasIcon?: boolean
  disabled?: boolean
  error?: boolean
  isFocused?: boolean
  isHovered?: boolean
}

type InputBaseProps = BaseInputCssProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>

const baseInputCss = ({ full, sizeVariant = 'md', hasIcon, error }: BaseInputCssProps) => css`
  display: inline-flex;
  align-items: center;
  padding: 0 1rem;
  border-radius: 6px;
  border: 1px solid ${theme.colors.gray30};
  outline: none;
  background-color: ${theme.colors.baseWhite};
  color: ${theme.colors.gray100};

  ${full &&
  css`
    width: 100%;
  `};

  ${INPUT_SIZES[sizeVariant]}

  ${hasIcon &&
  css`
    padding-left: ${sizeVariant === 'sm' ? '2rem' : '2.625rem'};
  `}

  &::placeholder {
    color: ${theme.colors.gray70};
  }

  &:hover:not(:disabled):not(:focus) {
    background-color: ${theme.colors.gray10};
  }

  &:focus:not(:disabled) {
    border-color: ${theme.colors.gray80};
  }

  &:disabled {
    background-color: ${theme.colors.gray20};
    border: none;
    color: ${theme.colors.gray70};
    cursor: not-allowed;
  }

  ${error &&
  css`
    border-color: ${theme.colors.baseRed};

    &:focus:not(:disabled) {
      border-color: ${theme.colors.baseRed};
    }
  `}
`

const InputWrapper = styled.div<{ full?: boolean }>`
  position: relative;
  display: ${props => (props.full ? 'flex' : 'inline-flex')};
  align-items: center;
`

const InputBase = styled('input', {
  shouldForwardProp: prop => isPropValid(prop),
})<InputBaseProps>`
  ${props => baseInputCss(props)}
`

const SearchIconWrapper = styled.div<{
  disabled?: boolean
  sizeVariant?: InputSizeVariant
  isDirty?: boolean
  isFocused?: boolean
  isHovered?: boolean
}>`
  position: absolute;
  left: ${props => (props.sizeVariant === 'sm' ? '0.75rem' : '1rem')};
  color: ${props =>
    props.disabled
      ? theme.colors.gray70
      : props.isDirty || props.isFocused || props.isHovered
        ? theme.colors.gray100
        : theme.colors.gray80};
  display: flex;
  align-items: center;
  pointer-events: none;
`

const Input = forwardRef<HTMLInputElement, InputBaseProps>(
  (
    {
      full,
      sizeVariant = 'md',
      disabled = false,
      error = false,
      hasIcon = false,
      value,
      defaultValue,
      onChange,
      ...props
    }: InputBaseProps,
    ref,
  ) => {
    const [isDirty, setIsDirty] = useState(() => {
      return Boolean(value || defaultValue)
    })
    const [isFocused, setIsFocused] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsDirty(Boolean(e.target.value))
        onChange?.(e)
      },
      [onChange],
    )

    return (
      <InputWrapper
        full={full}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {hasIcon && (
          <SearchIconWrapper
            disabled={disabled}
            sizeVariant={sizeVariant}
            isDirty={isDirty}
            isFocused={isFocused}
            isHovered={isHovered}
          >
            <SearchIcon
              width={sizeVariant === 'sm' ? 16 : 20}
              height={sizeVariant === 'sm' ? 16 : 20}
            />
          </SearchIconWrapper>
        )}
        <InputBase
          ref={ref}
          full={full}
          sizeVariant={sizeVariant}
          disabled={disabled}
          error={error}
          hasIcon={hasIcon}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </InputWrapper>
    )
  },
)
Input.displayName = 'Input'

export default Input
