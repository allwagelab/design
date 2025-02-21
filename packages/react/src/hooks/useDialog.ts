import { useState, useCallback, useRef, useEffect } from 'react'

import useOnClickOutside from './useOnClickOutside'

const useDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [dialogOpener, setDialogOpener] = useState<Element | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const handleDialogOpen = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setDialogOpener(document.activeElement)
    setIsDialogOpen(true)
    setTimeout(() => dialogRef.current?.focus())
  }, [])

  const handleDialogClose = useCallback(() => {
    setIsDialogOpen(false)
    dialogOpener && (dialogOpener as HTMLElement).focus()
  }, [dialogOpener])

  const handleToggleDialog = useCallback(
    (e: React.MouseEvent) => {
      isDialogOpen ? handleDialogClose() : handleDialogOpen(e)
    },

    [handleDialogOpen, handleDialogClose, isDialogOpen],
  )

  useOnClickOutside(dialogRef, handleDialogClose, dialogOpener as HTMLElement)

  useEffect(() => {
    const keyListenerMap = new Map([['Escape', handleDialogClose]])

    const handleKeyListener = (e: KeyboardEvent) => {
      const listener = keyListenerMap.get(e.key)
      typeof listener === 'function' && listener()
    }

    window.addEventListener('keydown', handleKeyListener)

    return () => {
      window.removeEventListener('keydown', handleKeyListener)
    }
  }, [])

  return {
    isDialogOpen,
    dialogRef,
    handleDialogOpen,
    handleDialogClose,
    handleToggleDialog,
    setIsDialogOpen,
  }
}

export default useDialog
