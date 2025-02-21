import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

import { theme } from '@allwagelab/design'
import styled from '@emotion/styled'

type TooltipPlacement =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'right'

interface TooltipProps {
  content: ReactNode
  children: ReactNode
  placement?: TooltipPlacement
  className?: string
  disabled?: boolean
}

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`

const TooltipContent = styled.div<{ placement: TooltipPlacement; isVisible: boolean }>`
  position: absolute;
  background-color: ${theme.colors.baseBackground};
  color: ${theme.colors.blue90};
  padding: 16px 20px;
  border: 1px solid ${theme.colors.blue30};
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  white-space: nowrap;
  z-index: 1000;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};
  transition: all 0.2s ease-in-out;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  ${props => {
    switch (props.placement) {
      case 'top':
        return `
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(-8px);
        `
      case 'top-left':
        return `
          bottom: 100%;
          left: 0;
          transform: translateY(-8px);
        `
      case 'top-right':
        return `
          bottom: 100%;
          right: 0;
          transform: translateY(-8px);
        `
      case 'bottom':
        return `
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(8px);
        `
      case 'bottom-left':
        return `
          top: 100%;
          left: 0;
          transform: translateY(8px);
        `
      case 'bottom-right':
        return `
          top: 100%;
          right: 0;
          transform: translateY(8px);
        `
      case 'left':
        return `
          right: 100%;
          top: 50%;
          transform: translateY(-50%) translateX(-8px);
        `
      case 'right':
        return `
          left: 100%;
          top: 50%;
          transform: translateY(-50%) translateX(8px);
        `
    }
  }}
`

export default function Tooltip({
  content,
  children,
  placement = 'bottom-left',
  className,
  disabled = false,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const handleMouseEnter = () => {
    if (disabled) return
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    if (disabled) return
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false)
    }, 100)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <TooltipContainer
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <TooltipContent placement={placement} isVisible={isVisible}>
        {content}
      </TooltipContent>
    </TooltipContainer>
  )
}
