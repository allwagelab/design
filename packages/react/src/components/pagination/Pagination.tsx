import { theme } from '@allwagelab/design'
import styled from '@emotion/styled'

import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from '../../icons'

interface PaginationProps {
  current: number
  total: number
  onChange: (page: number) => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'filled' | 'outline'
  color?: string
  showDoubleArrow?: boolean
  className?: string
}

const BUTTON_SIZES = {
  sm: { width: 28, height: 28, fontSize: 12, iconSize: 14 },
  md: { width: 32, height: 32, fontSize: 14, iconSize: 16 },
  lg: { width: 36, height: 36, fontSize: 16, iconSize: 18 },
} as const

const Container = styled.div<{ disabled?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 100%;
  margin: 0 auto;
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
`

const Button = styled.button<{
  isCurrentPage?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'filled' | 'outline'
  color?: string
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => BUTTON_SIZES[props.size || 'md'].width}px;
  height: ${props => BUTTON_SIZES[props.size || 'md'].height}px;
  border-radius: 8px;
  border: 1px solid
    ${props =>
      props.isCurrentPage
        ? props.variant === 'outline'
          ? props.color || theme.colors.blue50
          : 'transparent'
        : theme.colors.gray30};
  background: ${props =>
    props.isCurrentPage
      ? props.variant === 'outline'
        ? 'transparent'
        : props.color || theme.colors.blue50
      : theme.colors.baseWhite};
  color: ${props =>
    props.isCurrentPage
      ? props.variant === 'outline'
        ? props.color || theme.colors.blue50
        : theme.colors.baseWhite
      : theme.colors.gray90};
  font-size: ${props => BUTTON_SIZES[props.size || 'md'].fontSize}px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    width: ${props => BUTTON_SIZES[props.size || 'md'].iconSize}px;
    height: ${props => BUTTON_SIZES[props.size || 'md'].iconSize}px;
    fill: ${theme.colors.gray60};
  }

  &:hover:not(:disabled) {
    border-color: ${props =>
      props.isCurrentPage
        ? props.variant === 'outline'
          ? props.color || theme.colors.blue60
          : 'transparent'
        : theme.colors.gray30};
    background: ${props =>
      props.isCurrentPage
        ? props.variant === 'outline'
          ? `${props.color || theme.colors.blue50}10`
          : props.color || theme.colors.blue60
        : theme.colors.gray10};

    svg {
      fill: ${theme.colors.gray90};
    }
  }

  &:disabled {
    cursor: default;
    color: ${theme.colors.gray30};
    border: none;

    svg {
      fill: ${theme.colors.gray30};
    }
  }
`

const Ellipsis = styled.span<{ size?: 'sm' | 'md' | 'lg' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => BUTTON_SIZES[props.size || 'md'].width}px;
  height: ${props => BUTTON_SIZES[props.size || 'md'].height}px;
  font-size: ${props => BUTTON_SIZES[props.size || 'md'].fontSize}px;
  font-weight: 600;
`

const createPageList = (current: number, total: number) => {
  const items: (number | string)[] = []
  const SIBLING_COUNT = 1 // 현재 페이지 양쪽에 표시할 페이지 수
  const DOTS = '...'

  if (total <= 7) {
    // 전체 페이지가 7 이하인 경우 모든 페이지 표시
    for (let i = 1; i <= total; i++) {
      items.push(i)
    }
  } else {
    // 첫 페이지는 항상 표시
    items.push(1)

    if (current <= 4) {
      // 1, 2, 3, 4, 5, ..., 10
      for (let i = 2; i <= 5; i++) {
        items.push(i)
      }
      items.push(DOTS)
      items.push(total)
    } else if (current >= total - 3) {
      // 1, ..., 6, 7, 8, 9, 10
      items.push(DOTS)
      for (let i = total - 4; i <= total; i++) {
        items.push(i)
      }
    } else {
      // 1, ..., 4, 5, 6, ..., 10
      items.push(DOTS)
      for (let i = current - SIBLING_COUNT; i <= current + SIBLING_COUNT; i++) {
        items.push(i)
      }
      items.push(DOTS)
      items.push(total)
    }
  }

  return items
}

export default function Pagination({
  current,
  total,
  onChange,
  disabled = false,
  size = 'md',
  variant = 'filled',
  color,
  showDoubleArrow = true,
  className,
}: PaginationProps) {
  const pageList = createPageList(current, total)
  const isFirstPage = current <= 1
  const isLastPage = current >= total

  const handlePrevPage = () => {
    if (current <= 1) return
    onChange(current - 1)
  }

  const handleNextPage = () => {
    if (current >= total) return
    onChange(current + 1)
  }

  return (
    <Container className={className} disabled={disabled}>
      {showDoubleArrow && (
        <Button
          onClick={() => onChange(1)}
          disabled={isFirstPage}
          size={size}
          variant={variant}
          color={color}
        >
          <DoubleArrowLeftIcon />
        </Button>
      )}
      <Button
        onClick={handlePrevPage}
        disabled={isFirstPage}
        size={size}
        variant={variant}
        color={color}
      >
        <ArrowLeftIcon />
      </Button>

      {pageList.map((page, index) => {
        if (page === '...') {
          return (
            <Ellipsis key={`ellipsis-${index}`} size={size}>
              ...
            </Ellipsis>
          )
        }

        const isMiddleSection =
          pageList.length === 7 && pageList[2] === '...' && pageList[5] === '...'

        const isHighlighted = isMiddleSection ? index === 3 : page === current

        return (
          <Button
            key={`${page}-${index}`}
            isCurrentPage={isHighlighted}
            onClick={() => onChange(page as number)}
            size={size}
            variant={variant}
            color={color}
          >
            {page}
          </Button>
        )
      })}

      <Button
        onClick={handleNextPage}
        disabled={isLastPage}
        size={size}
        variant={variant}
        color={color}
      >
        <ArrowRightIcon />
      </Button>
      {showDoubleArrow && (
        <Button
          onClick={() => onChange(total)}
          disabled={isLastPage}
          size={size}
          variant={variant}
          color={color}
        >
          <DoubleArrowRightIcon />
        </Button>
      )}
    </Container>
  )
}
