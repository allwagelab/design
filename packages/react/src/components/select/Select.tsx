import { useEffect, useRef, useState } from 'react'

import { theme } from '@allwagelab/design'
import isPropValid from '@emotion/is-prop-valid'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { useOnClickOutside } from '../../hooks'
import { ArrowDownIcon } from '../../icons'

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
  className?: string
  hasRemoveBtn?: boolean
  onChange?: (value: string) => void
  onRemove?: (value: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
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
  outline: none;
  cursor: pointer;

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
  overflow: hidden;
  margin: 0;
  padding: 0;
  z-index: 10;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`

const DropdownItem = styled.li<{ isSelected: boolean; size?: SelectSize }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  color: ${theme.colors.gray100};
  cursor: pointer;

  ${({ size = 'md' }) => SELECT_SIZES[size]}
  font-weight: ${({ isSelected }) => (isSelected ? 600 : 400)};

  &:hover:not(:disabled) {
    background-color: ${theme.colors.gray20};
  }
`

const ChevronIcon = styled(ArrowDownIcon)<{ isOpen: boolean }>`
  transition: transform 0.2s ease;
  transform: rotate(${({ isOpen }) => (isOpen ? '180deg' : '0deg')});
`

const RemoveBtn = styled.button`
  ${theme.typography.caption.c1_rg};
  font-weight: 600;
  color: ${theme.colors.gray90};
  z-index: 11;
`

export default function Select({
  options,
  value,
  placeholder = '선택해 주세요',
  disabled = false,
  size = 'md',
  full = false,
  className,
  hasRemoveBtn,
  children,
  onChange,
  onRemove,
}: React.PropsWithChildren<SelectProps>) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)
  const selectedOption = options.find(option => option.value === value)

  const handleSelect = (value: string) => {
    onChange?.(value)
    setIsOpen(false)
  }

  useOnClickOutside(selectRef, () => setIsOpen(false))

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <SelectWrapper ref={selectRef} full={full} className={className}>
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
        <ChevronIcon isOpen={isOpen} />
      </SelectButton>
      <DropdownList isOpen={isOpen} role="listbox">
        {children}
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
            {hasRemoveBtn && <RemoveBtn onClick={onRemove?.(option.value)}>삭제</RemoveBtn>}
          </DropdownItem>
        ))}
      </DropdownList>
    </SelectWrapper>
  )
}
