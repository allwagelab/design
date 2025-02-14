interface ArrowIconProps {
  size?: number
  className?: string
}

export function ArrowIcon({ size = 16, className }: ArrowIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8.32146 11.073L13.274 6.10189C13.5753 5.8 13.5753 5.31698 13.274 5.02516C12.9726 4.72327 12.4904 4.72327 12.1991 5.02516L8 9.23145L3.80091 5.02516C3.49954 4.72327 3.01735 4.72327 2.72603 5.02516C2.42466 5.32704 2.42466 5.81006 2.72603 6.10189L7.68858 11.073C7.85936 11.244 8.14064 11.244 8.32146 11.073Z"
        stroke="currentColor"
        strokeWidth="0.3"
      />
    </svg>
  )
}
