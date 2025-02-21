import { useEffect } from 'react'

const useOnClickOutside = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  handler: () => void,
  exceptEl?: HTMLElement | null,
) => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const el = ref?.current
      const isIncludeEl = !el || el.contains(e?.target as HTMLElement)
      const isIncludeExceptEl = exceptEl && exceptEl?.contains(e?.target as HTMLElement)

      if (isIncludeEl || isIncludeExceptEl) return
      handler()
    }

    window.addEventListener('mousedown', listener)

    return () => {
      window.removeEventListener('mousedown', listener)
    }
  }, [handler])
}

export default useOnClickOutside
