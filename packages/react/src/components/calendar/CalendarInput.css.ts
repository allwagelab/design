import { theme } from '@allwagelab/design'
import styled from '@emotion/styled'

import DialogBtn, { type DialogBtnProps } from '../dialogBtn/DialogBtn'
import Input, { type BaseInputCssProps } from '../input/Input'

export const Root = styled.div`
  position: relative;
`

export const CalendarInput = styled(Input)<BaseInputCssProps>`
  padding: 0 48px 0 12px;
`

export const CalendarDialogBtn = styled(DialogBtn)<DialogBtnProps>`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-right: 20px;
  border-radius: 6px;
  color: ${theme.colors.gray30};
`
