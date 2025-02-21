import React, { useEffect } from 'react'

import { useDialog } from '../../hooks'
import * as S from './DialogBtn.css'

export interface DialogBtnProps {
  className?: string
  children: React.ReactNode
  handleOpen?: (state: boolean) => void
  popup: (
    ref: React.RefObject<HTMLDialogElement>,
    isOpen: boolean,
    handleDialogClose: () => void,
  ) => React.ReactNode
}

const DialogBtn = React.forwardRef<HTMLButtonElement, DialogBtnProps>(
  ({ className, children, handleOpen, popup }, ref) => {
    const { isDialogOpen, dialogRef, handleToggleDialog, handleDialogClose } = useDialog()

    useEffect(() => {
      handleOpen?.(isDialogOpen)
    }, [isDialogOpen, handleOpen])

    return (
      <>
        <S.DialogBtn ref={ref} className={className} onClick={handleToggleDialog}>
          {children}
        </S.DialogBtn>
        {popup?.(dialogRef, isDialogOpen, handleDialogClose)}
      </>
    )
  },
)

DialogBtn.displayName = 'DialogBtn'

export default DialogBtn
