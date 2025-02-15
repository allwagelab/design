import { Children, cloneElement, isValidElement, type ReactNode } from 'react'

import { theme } from '@allwagelab/design'
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'

import Checkbox from '../checkbox/Checkbox'

interface Column {
  key: string
  label: string
  width?: number
  align?: 'left' | 'center' | 'right'
}

interface TableProps {
  columns: Column[]
  children: ReactNode
  hasCheckbox?: boolean
  selectedIds?: string[]
  onSelectedChange?: (selectedIds: string[]) => void
  title?: string
  showNo?: boolean
  noDataMessage?: ReactNode
  className?: string
  getRowId?: (row: any) => string
  minWidth?: number
}

interface RowProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

interface CellProps {
  children: React.ReactNode
  align?: 'left' | 'center' | 'right'
  width?: number
  className?: string
  color?: string
}

interface TableComponent extends React.FC<TableProps> {
  Row: React.FC<RowProps>
  Cell: React.FC<CellProps>
}

const fadeIn = keyframes`
  0% { opacity: 0.3; }
  100% { opacity: 1; }
`

const animate = css`
  opacity: 0.6;
  animation: ${fadeIn} 0.2s linear forwards;
`

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`

const TableHead = styled.thead`
  ${theme.typography.body.b2_rg};
  background-color: ${theme.colors.gray10};
  border-top: 1px solid ${theme.colors.gray40};
  border-bottom: 1px solid ${theme.colors.gray40};
  font-weight: 400;
`

const TableBody = styled.tbody`
  ${theme.typography.body.b2_rg};
`

const TableRow = styled.tr`
  height: 54px;
  border-bottom: 1px solid ${theme.colors.gray20};
  ${animate};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${theme.colors.gray10};
  }
`

const TableHeaderRow = styled(TableRow)`
  height: 46px;
  background-color: ${theme.colors.gray10};
  border-top: none;
  border-bottom: 1px solid ${theme.colors.gray20};

  &:hover {
    background-color: ${theme.colors.gray10};
  }
`

const TableCell = styled.td<{
  align?: 'left' | 'center' | 'right'
  width?: number
  color?: string
}>`
  padding: 0 16px;
  text-align: ${props => props.align || 'left'};
  vertical-align: middle;
  color: ${props => props.color || theme.colors.gray90};
  ${theme.typography.body.b2_rg};
  width: ${props => props.width}px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:first-of-type {
    text-align: center;
    width: 60px;
    color: ${theme.colors.gray70};
  }
`

const TableHeaderCell = styled.th<{
  align?: 'left' | 'center' | 'right'
  width?: number
  color?: string
}>`
  padding: 0 16px;
  text-align: ${props => props.align || 'left'};
  vertical-align: middle;
  color: ${props => props.color || theme.colors.baseBlack};
  ${theme.typography.body.b2_rg};
  font-weight: 400;
  width: ${props => props.width}px;
  white-space: nowrap;

  &:first-of-type {
    text-align: center;
    width: 60px;
  }
`

const NoDataRow = styled(TableRow)`
  &:hover {
    background-color: transparent;
  }
`

const NoDataCell = styled(TableCell)`
  color: ${theme.colors.gray60};
  text-align: center;
  border-bottom: 1px solid ${theme.colors.gray20};
`

const Table: TableComponent = ({
  columns,
  children,
  hasCheckbox,
  selectedIds = [],
  onSelectedChange,
  title,
  showNo = false,
  noDataMessage = '데이터가 없습니다.',
  className,
}: TableProps) => {
  const validChildrenArray =
    Children.map(children, child => {
      if (!isValidElement(child)) return null
      return {
        key: child.key?.toString() || '',
        child: child,
      }
    }) || []
  const isAllChecked =
    validChildrenArray.length > 0 && selectedIds.length === validChildrenArray.length

  const handleAllCheck = () => {
    if (!onSelectedChange || validChildrenArray.length === 0) return

    if (isAllChecked) {
      onSelectedChange([])
    } else {
      const allIds = validChildrenArray.filter(Boolean).map(child => child.key)
      onSelectedChange(allIds)
    }
  }

  const handleRowCheck = (id: string) => {
    if (!onSelectedChange) return

    const newSelectedIds = selectedIds.includes(id)
      ? selectedIds.filter(selectedId => selectedId !== id)
      : [...selectedIds, id]

    onSelectedChange(newSelectedIds)
  }

  return (
    <TableContainer className={className}>
      {title && <caption className="a11y">{title}</caption>}
      <TableHead>
        <TableHeaderRow>
          {hasCheckbox && (
            <TableHeaderCell width={40}>
              <Checkbox
                checked={isAllChecked}
                onChange={handleAllCheck}
                disabled={validChildrenArray.length === 0}
              />
            </TableHeaderCell>
          )}
          {showNo && (
            <TableHeaderCell width={60} align="center" color={theme.colors.gray70}>
              No.
            </TableHeaderCell>
          )}
          {columns.map(({ key, label, width, align }) => (
            <TableHeaderCell key={key} width={width} align={align}>
              {label}
            </TableHeaderCell>
          ))}
        </TableHeaderRow>
      </TableHead>
      <TableBody>
        {validChildrenArray.length === 0 ? (
          <NoDataRow>
            <NoDataCell colSpan={columns.length + (hasCheckbox ? 1 : 0) + (showNo ? 1 : 0)}>
              {noDataMessage}
            </NoDataCell>
          </NoDataRow>
        ) : (
          validChildrenArray.map(({ key, child }, index) => {
            const isChecked = selectedIds.includes(key)
            const rowChildren = child.props.children

            return cloneElement(child as React.ReactElement<RowProps>, {
              ...child.props,
              children: (
                <>
                  {hasCheckbox && (
                    <Table.Cell width={40}>
                      <Checkbox checked={isChecked} onChange={() => handleRowCheck(key)} />
                    </Table.Cell>
                  )}
                  {showNo && (
                    <Table.Cell align="center" width={60} color={theme.colors.gray70}>
                      {index + 1}
                    </Table.Cell>
                  )}
                  {rowChildren}
                </>
              ),
            })
          })
        )}
      </TableBody>
    </TableContainer>
  )
}

Table.Row = function Row({ children, onClick, className }: RowProps) {
  return (
    <TableRow className={className} onClick={onClick}>
      {children}
    </TableRow>
  )
}

Table.Cell = function Cell({ children, align, width, className, color }: CellProps) {
  return (
    <TableCell className={className} align={align} width={width} color={color}>
      {children}
    </TableCell>
  )
}

export default Table as TableComponent
