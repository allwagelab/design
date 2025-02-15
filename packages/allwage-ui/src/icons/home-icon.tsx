import type { IconProps } from './types'

export const HomeIcon = ({
  size = 20,
  className,
  color = 'currentColor',
  onClick,
  style,
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
      style={style}
    >
      <path
        d="M7.83332 17.5828V12.1661H12.1667V17.5828C12.1667 18.1786 12.6542 18.6661 13.25 18.6661H16.5C17.0958 18.6661 17.5833 18.1786 17.5833 17.5828V9.99948H19.425C19.9233 9.99948 20.1617 9.38198 19.7825 9.05698L10.7258 0.89948C10.3142 0.531147 9.68582 0.531147 9.27415 0.89948L0.217484 9.05698C-0.150849 9.38198 0.0766508 9.99948 0.574984 9.99948H2.41665V17.5828C2.41665 18.1786 2.90415 18.6661 3.49998 18.6661H6.74998C7.34582 18.6661 7.83332 18.1786 7.83332 17.5828Z"
        fill={color}
      />
    </svg>
  )
}

HomeIcon.displayName = 'HomeIcon'
