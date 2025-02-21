import { theme } from '@allwagelab/design'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

type Theme = typeof theme

const periodSelectDate = (theme: Theme) => css`
  background-color: ${theme.colors.blue50};

  > button {
    color: ${theme.colors.baseWhite};
  }

  ::after {
    background-color: ${theme.colors.blue10_10};
  }
`

const leftCircle = css`
  border-radius: 0;
`

const rightCircle = css`
  border-radius: 0;
`

const mixInSelectHover = (theme: Theme) => css`
  background-color: ${theme.colors.blue10_10};

  > button {
    background-color: ${theme.colors.blue50};
  }
`

const mixInHoverToday = (theme: Theme) => css`
  border: none;
  border-radius: 0;
  background-color: ${theme.colors.blue10_10};
`

export const Root = styled.li`
  width: 44px;
  height: 44px;
  list-style: none;

  &:not([data-isthismonth='true']) {
    & > button {
      color: ${theme.colors.gray50};
    }
  }

  &[aria-selected='false'] {
    &[aria-current='date'] {
      border: 1px solid ${theme.colors.gray50};
    }
  }

  &[data-status='date'] {
    &[aria-selected='true'] {
      background-color: ${theme.colors.blue50};

      & > button {
        color: ${theme.colors.baseWhite};
      }
    }

    &[aria-selected='false'] {
      &:not([disabled]):hover {
        background-color: ${theme.colors.blue10_10};

        &[aria-current='date'] {
          background-color: ${theme.colors.gray10};
        }
      }
    }
  }

  &[data-status='week'] {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    &::after {
      content: '';
      position: absolute;
      width: 44px;
      height: 44px;
    }

    &[aria-selected='true'] {
      background-color: ${theme.colors.blue10_10};

      &[data-weekidx='0'],
      &[data-weekidx='3'] {
        ${leftCircle};
      }

      &[data-weekidx='2'],
      &[data-weekidx='6'] {
        ${rightCircle};
      }

      &[data-isselectedstartdate='true'] {
        ${periodSelectDate(theme)};

        ::after {
          ${leftCircle};
        }
      }

      &[data-isselectedenddate='true'] {
        ${periodSelectDate(theme)};

        ::after {
          ${rightCircle};
        }
      }
    }
  }

  &[data-status='free'] {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    &::after {
      content: '';
      position: absolute;
      width: 44px;
      height: 44px;
    }

    &[aria-selected='true'] {
      background-color: ${theme.colors.blue10_10};

      &[data-weekidx='0'] {
        ${leftCircle};
      }

      &[data-weekidx='6'] {
        ${rightCircle};
      }

      &[aria-current='date'] {
        ${mixInHoverToday(theme)};
      }

      &[data-isselectedstartdate='true'] {
        ${periodSelectDate(theme)};

        ::after {
          ${leftCircle};
        }
      }

      &[data-isselectedenddate='true'] {
        ${periodSelectDate(theme)};

        &[data-ishoverafterdate='true'] {
          ${leftCircle};
          ${mixInSelectHover(theme)};
        }

        &[data-ishoverbeforedate='true'] {
          ${rightCircle};
          ${mixInSelectHover(theme)};
        }

        &[data-isselectedstartdate='false'] {
          ::after {
            ${rightCircle};
          }
        }
      }
    }

    &[aria-selected='false'] {
      &:hover {
        border: none;
        background-color: ${theme.colors.blue10_10};
      }

      &[data-ishoverbeforedate='true'] {
        background-color: ${theme.colors.blue10_10};

        &[data-weekidx='0'] {
          ${leftCircle};
        }

        &[data-weekidx='6'] {
          ${rightCircle};
        }

        &[aria-current='date'] {
          ${mixInHoverToday(theme)};
        }

        &[data-ishoverdate='true'] {
          ${leftCircle};
        }
      }

      &[data-ishoverafterdate='true'] {
        background-color: ${theme.colors.blue10_10};

        &[data-weekidx='0'] {
          ${leftCircle};
        }

        &[data-weekidx='6'] {
          ${rightCircle};
        }

        &[aria-current='date'] {
          ${mixInHoverToday(theme)};
        }

        &[data-ishoverdate='true'] {
          ${rightCircle};
        }
      }
    }
  }
`

export const Btn = styled.button`
  ${theme.typography.body.b3_rg};
  width: 100%;
  height: 100%;
  color: ${theme.colors.baseBlack};
  z-index: 11;

  &[disabled] {
    color: ${theme.colors.gray50};
  }
`
