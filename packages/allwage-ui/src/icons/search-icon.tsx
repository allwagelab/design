interface IconProps {
  size?: number
  color?: string
  className?: string
}

export function SearchIcon({ size = 20, color = 'currentColor', className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8.33333 14.1667C11.555 14.1667 14.1667 11.555 14.1667 8.33333C14.1667 5.11167 11.555 2.5 8.33333 2.5C5.11167 2.5 2.5 5.11167 2.5 8.33333C2.5 11.555 5.11167 14.1667 8.33333 14.1667Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 12.5L17.5 17.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
