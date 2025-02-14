import { theme } from '@allwagelab/design'
import styled from '@emotion/styled'

import { ArrowDoubleIcon } from '../../icons/arrow-double-icon'
import { ArrowIcon } from '../../icons/arrow-icon'

type PaginationVariant = 'outline' | 'filled'

interface PaginationProps {
  current: number
  total: number
  onChange: (page: number) => void
  disabled?: boolean
  max?: number
  className?: string
  color?: string
  variant?: PaginationVariant
  showArrowDoubleIcon?: boolean
}

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

const ArrowButton = styled.button<{ isActive?: boolean; color?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  border-radius: 2px;
  border: none;
  background: none;
  ${theme.typography.body.b2_rg};
  color: ${props => (props.isActive ? props.color || theme.colors.gray90 : theme.colors.gray60)};
  cursor: pointer;

  svg {
    fill: ${theme.colors.gray50};
  }

  &:hover:not(:disabled) {
    background-color: ${theme.colors.gray30};

    svg {
      fill: ${theme.colors.gray60};
    }
  }

  &:disabled {
    cursor: default;
    color: ${theme.colors.gray30};

    svg {
      fill: ${theme.colors.gray30};
    }
  }
`

const ArrowLeftIcon = styled(ArrowIcon)`
  transform: rotate(90deg);
`

const ArrowRightIcon = styled(ArrowIcon)`
  transform: rotate(-90deg);
`

const ArrowDoubleLeftIcon = styled(ArrowDoubleIcon)``

const ArrowDoubleRightIcon = styled(ArrowDoubleIcon)`
  transform: rotate(-180deg);
`

const NumberWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const NumberButton = styled.button<{
  isCurrentPage: boolean
  color?: string
  variant?: PaginationVariant
}>`
  ${theme.typography.body.b2_rg};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 2px;
  border: ${props =>
    props.isCurrentPage && props.variant === 'outline' && props.color
      ? `1px solid ${props.color}20`
      : 'none'};
  color: ${props =>
    props.isCurrentPage ? props.color || theme.colors.gray90 : theme.colors.gray50};
  background-color: ${props =>
    props.isCurrentPage && props.color
      ? props.variant === 'outline'
        ? 'transparent'
        : `${props.color}10`
      : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${props =>
      props.isCurrentPage && props.color
        ? props.variant === 'outline'
          ? `${props.color}10`
          : `${props.color}20`
        : theme.colors.gray20};
  }

  &:disabled {
    cursor: default;
    color: ${theme.colors.gray30};
    border-color: ${theme.colors.gray30};
    background-color: ${props => (props.isCurrentPage ? theme.colors.gray10 : 'transparent')};
  }
`

const createPageList = (currentPage: number, maxPageCount: number, totalPages: number) => {
  const currentGroup = Math.ceil(currentPage / maxPageCount)
  const start = (currentGroup - 1) * maxPageCount + 1
  const end = Math.min(currentGroup * maxPageCount, totalPages)

  const result = []
  for (let i = start; i <= end; i++) {
    result.push(i)
  }

  return result
}

export default function Pagination({
  current,
  total,
  onChange,
  disabled = false,
  max = 10,
  className,
  color,
  variant = 'filled',
  showArrowDoubleIcon = true,
}: PaginationProps) {
  const pageList = createPageList(current, max, total)
  const showDoubleArrows = showArrowDoubleIcon && total > max

  const handlePrevPage = () => {
    if (current <= 1) return
    onChange(current - 1)
  }

  const handleNextPage = () => {
    if (current >= total) return
    onChange(current + 1)
  }

  const isFirstPage = current <= 1
  const isLastPage = current >= total

  return (
    <Container className={className} disabled={disabled}>
      {showDoubleArrows && (
        <ArrowButton onClick={() => onChange(1)} disabled={isFirstPage} color={color}>
          <ArrowDoubleLeftIcon />
        </ArrowButton>
      )}

      <ArrowButton onClick={handlePrevPage} disabled={isFirstPage} color={color}>
        <ArrowLeftIcon />
      </ArrowButton>

      <NumberWrapper>
        {pageList.map(page => (
          <NumberButton
            key={page}
            type="button"
            isCurrentPage={page === current}
            onClick={() => onChange(page)}
            color={color}
            variant={variant}
          >
            {page}
          </NumberButton>
        ))}
      </NumberWrapper>

      <ArrowButton onClick={handleNextPage} disabled={isLastPage} color={color}>
        <ArrowRightIcon />
      </ArrowButton>

      {showDoubleArrows && (
        <ArrowButton onClick={() => onChange(total)} disabled={isLastPage} color={color}>
          <ArrowDoubleRightIcon />
        </ArrowButton>
      )}
    </Container>
  )
}
