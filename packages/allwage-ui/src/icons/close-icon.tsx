import type { IconProps } from './types'

export function CloseIcon({ size = 24, color = 'currentColor', className, onClick }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <g id="&#8;&#237;&#129;&#180;&#235;&#161;&#156;&#236;&#166;&#136;">
        <path
          id="Vector"
          d="M18 18L6 6"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M18 6L6 18"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
