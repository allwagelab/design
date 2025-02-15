import type { IconProps } from './types'

export const CalendarIcon = ({
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
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
      style={style}
    >
      <path
        d="M14.875 2.19948H18.775C19.0336 2.19948 19.2816 2.3022 19.4644 2.48505C19.6473 2.6679 19.75 2.9159 19.75 3.17448V18.7745C19.75 19.0331 19.6473 19.2811 19.4644 19.4639C19.2816 19.6468 19.0336 19.7495 18.775 19.7495H1.225C0.966414 19.7495 0.718419 19.6468 0.535571 19.4639C0.352723 19.2811 0.25 19.0331 0.25 18.7745V3.17448C0.25 2.9159 0.352723 2.6679 0.535571 2.48505C0.718419 2.3022 0.966414 2.19948 1.225 2.19948H5.125V0.249481H7.075V2.19948H12.925V0.249481H14.875V2.19948ZM2.2 8.04948V17.7995H17.8V8.04948H2.2ZM4.15 11.9495H9.025V15.8495H4.15V11.9495Z"
        fill={color}
      />
    </svg>
  )
}

CalendarIcon.displayName = 'CalendarIcon'
