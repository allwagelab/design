import { theme } from '@allwagelab/design'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { ArrowLeftIcon as ArrowIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '../../icons'

interface RootProps {
  as?: string
}

export const Root = styled.dialog<RootProps>`
  ${({ as }) => css`
    position: ${as === 'dialog' ? 'absolute' : 'static'};
    top: calc(100% + 4px);
    width: 356px;
    border: 1px solid ${theme.colors.gray20};
    border-radius: 5px;
    padding: 23px;
    background-color: ${theme.colors.baseWhite};
    box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.06);
    z-index: 11;
  `}
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const MonthYear = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;

  & > span {
    ${theme.typography.body.b1_rg};
    font-weight: 500;
    color: ${theme.colors.baseBlack};
  }

  &[aria-expanded='true'] {
    svg {
      transform: rotate(90deg);
    }
  }

  :hover {
    > div:last-of-type {
      border-radius: 50%;
      background-color: ${theme.colors.gray10};
    }
  }
`

export const MonthYearContent = styled.div`
  display: flex;
  align-items: center;
  column-gap: 4px;

  span {
    ${theme.typography.body.b1_rg};
    font-weight: 500;
  }
`

export const MonthWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 20px;
  column-gap: 4px;

  & > li {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
  }
`

export const MonthBtn = styled.button`
  ${theme.typography.body.b4_rg};
  width: 100%;
  height: 100%;
  border-radius: 100px;
  color: ${theme.colors.baseBlack};

  &:hover {
    background-color: ${theme.colors.blue10_10};
  }

  &[aria-selected='false'] {
    &[aria-current='true'] {
      border: 1px solid ${theme.colors.gray50};

      &:hover {
        background-color: ${theme.colors.gray10};
      }
    }
  }

  &[aria-selected='true'] {
    color: ${theme.colors.baseWhite};
    background-color: ${theme.colors.blue50};
  }
`

export const OpenMonthWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
`

export const WeekRow = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 44px);
  margin-bottom: 12px;

  > li {
    ${theme.typography.caption.c2_rg};
    color: ${theme.colors.gray70};
    text-align: center;
  }
`

export const DateRow = styled.ul`
  ${theme.typography.caption.c1_rg};
  position: relative;
  display: grid;
  grid-template-columns: repeat(7, 44px);
  row-gap: 4px;
  margin-bottom: 10px;
  color: ${theme.colors.gray70};

  > div {
    position: absolute;
    width: 100%;
    height: 44px;
    z-index: -1;

    &:nth-of-type(1) {
      top: 0;
    }

    &:nth-of-type(2) {
      top: 44px;
    }

    &:nth-of-type(3) {
      top: 88px;
    }

    &:nth-of-type(4) {
      top: 132px;
    }

    &:nth-of-type(5) {
      top: 176px;
    }

    &:nth-of-type(6) {
      top: 220px;
    }
  }
`

export const MoveBtnWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const MoveBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;

  & > svg {
    fill: ${theme.colors.gray60};
  }

  :hover {
    border-radius: 50%;
    background-color: ${theme.colors.gray10};
  }
`

export const ArrowDownIcon = styled(ArrowIcon)`
  transform: rotate(-90deg);

  & > path {
    fill: ${theme.colors.gray70};
  }
`

export const ArrowLeftIcon = styled(ArrowDownIcon)`
  transform: rotate(0);
`

export const ArrowRightIcon = styled(ArrowDownIcon)`
  transform: rotate(-180deg);
`

export const ArrowDoubleLeftIcon = styled(DoubleArrowLeftIcon)`
  & > path {
    fill: ${theme.colors.gray70};
  }
`

export const ArrowDoubleRightIcon = styled(DoubleArrowRightIcon)`
  & > path {
    fill: ${theme.colors.gray70};
  }
`

export const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 8px;
`

export const resetBtn = css`
  width: 74px;
`

export const applyBtn = css`
  flex: 1;
`

export const DateTimeContainer = styled.div`
  margin-bottom: 20px;
`

interface DateTimeWrapperProps {
  hasErr: boolean
}

export const DateTimeWrapper = styled.div<DateTimeWrapperProps>`
  ${({ hasErr }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 280px;
    height: 40px;
    border: 1px solid ${hasErr ? theme.colors.baseRed : theme.colors.gray30};
    border-radius: 5px;
    padding-left: 15px;

    svg {
      width: 16px;
      height: 16px;
    }

    time {
      ${theme.typography.body.b3_rg};
    }
  `}
`

export const DateWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  column-gap: 10px;
  width: 162px;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    width: 1.14px;
    height: 20px;
    background-color: ${theme.colors.gray30};
  }
`

export const TimeWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  width: 115px;
  padding-left: 15px;
`

export const TimeInput = styled.input`
  ${theme.typography.body.b3_rg};
  width: 50px;
  height: 20px;
  border: 0;
  padding: 0 3px;

  &:focus {
    border: 0;
  }
`

export const timeErrorMsg = css`
  margin-top: 4px;
`

export const ErrorMsg = styled.p`
  ${theme.typography.caption.c1_rg};
  color: ${theme.colors.baseRed};
`
