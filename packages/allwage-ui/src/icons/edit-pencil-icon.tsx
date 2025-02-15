import type { IconProps } from './types'

export function EditPencilIcon({
  size = 24,
  color = 'currentColor',
  className,
  onClick,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 9 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path
        d="M1 7L0.5 9L2.5 8.5L8.5 2.5L7 1L1 7Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4.5 9H8.5" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
