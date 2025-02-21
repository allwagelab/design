import { forwardRef } from 'react'

import type { IconProps } from '../types'

export const IconWrapper = forwardRef<SVGSVGElement, IconProps & { component: React.FC<any> }>(
  (
    {
      component: Component,
      size = 24,
      color = 'currentColor',
      className,
      onClick,
      style,
      ...props
    },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        width={size}
        height={size}
        fill={color}
        className={className}
        onClick={onClick}
        style={style}
        {...props}
      />
    )
  },
)

IconWrapper.displayName = 'IconWrapper'
