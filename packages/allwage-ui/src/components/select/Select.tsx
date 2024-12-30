import { useState } from 'react'

import { theme } from '@allwagelab/design'
import isPropValid from '@emotion/is-prop-valid'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

type SelectSize = 'sm' | 'md' | 'lg' | 'xl'

const SELECT_SIZES: Record<SelectSize, ReturnType<typeof css>> = {
  sm: css`
    height: 36px;
    ${theme.typography.caption.c1_rg};
  `,
  md: css`
    height: 44px;
    font-weight: 500;
    ${theme.typography.body.b3_rg};
  `,
  lg: css`
    height: 48px;
    font-weight: 500;
    ${theme.typography.body.b3_rg};
  `,
  xl: css`
    height: 56px;
    font-weight: 500;
    ${theme.typography.body.b1_rg};
  `,
}

interface BaseSelectCssProps {
  full?: boolean
  size?: SelectSize
  disabled?: boolean
  isOpen?: boolean
}

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends BaseSelectCssProps {
  options: SelectOption[]
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
}

const SelectWrapper = styled.div<{ full?: BaseSelectCssProps['full'] }>`
  position: relative;
  width: ${({ full }) => (full ? '100%' : '300px')};
`

const baseSelectCss = ({ full, size = 'md', isOpen }: BaseSelectCssProps) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${full ? '100%' : '300px'};
  padding: 0 1rem;
  border-radius: 8px;
  background-color: ${theme.colors.baseWhite};
  border: 1px solid ${theme.colors.gray30};
  color: ${theme.colors.gray100};
  cursor: pointer;
  outline: none;

  ${SELECT_SIZES[size]}

  &:active:not(:disabled) {
    background-color: ${theme.colors.baseWhite};
    border-color: ${theme.colors.gray80};
  }

  &:focus {
    background-color: ${theme.colors.baseWhite};
    border-color: ${theme.colors.gray80};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${theme.colors.gray20};
    border-color: ${theme.colors.gray70};
    color: ${theme.colors.gray70};
  }

  ${isOpen
    ? css`
        font-weight: 600;
        border-color: ${theme.colors.gray80};
        border-radius: 8px 8px 0 0;
        border-bottom: none;
      `
    : css`
        &:hover:not(:disabled) {
          background-color: ${theme.colors.gray10};
          border-color: ${theme.colors.gray30};
        }
      `}
`

const SelectButton = styled('button', {
  shouldForwardProp: prop => isPropValid(prop),
})<BaseSelectCssProps>`
  ${props => baseSelectCss(props)}
`

const DropdownList = styled.ul<{ isOpen: boolean }>`
  box-sizing: border-box;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: ${theme.colors.baseWhite};
  border: 1px solid ${theme.colors.gray90};
  border-radius: 0px 0px 8px 8px;
  margin: 0;
  padding: 0;
  z-index: 10;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`

const DropdownItem = styled.li<{ isSelected: boolean; size?: SelectSize }>`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  cursor: pointer;
  color: ${theme.colors.gray100};

  ${({ size = 'md' }) => SELECT_SIZES[size]}
  font-weight: ${({ isSelected }) => (isSelected ? 600 : 400)};

  &:hover:not(:disabled) {
    background-color: ${theme.colors.gray20};
  }
`

// const ChevronIcon = styled(ChevronDown)<{ isOpen: boolean }>`
//   transition: transform 0.2s ease;
//   transform: rotate(${({ isOpen }) => (isOpen ? '180deg' : '0deg')});
// `

export default function Select({
  options,
  value,
  placeholder = '선택해 주세요',
  disabled = false,
  size = 'md',
  full = false,
  onChange,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedOption = options.find(option => option.value === value)

  const handleSelect = (value: string) => {
    onChange?.(value)
    setIsOpen(false)
  }

  return (
    <SelectWrapper full={full}>
      <SelectButton
        type="button"
        disabled={disabled}
        size={size}
        full={full}
        isOpen={isOpen}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="select-value">{selectedOption ? selectedOption.label : placeholder}</span>
        {/* <ChevronIcon size={20} isOpen={isOpen} /> */}
      </SelectButton>
      <DropdownList isOpen={isOpen} role="listbox">
        {options.map(option => (
          <DropdownItem
            key={option.value}
            size={size}
            isSelected={option.value === value}
            onClick={() => handleSelect(option.value)}
            role="option"
            aria-selected={option.value === value}
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownList>
    </SelectWrapper>
  )
}
