interface ArrowDoubleIconProps {
  size?: number
  className?: string
}

export function ArrowDoubleIcon({ size = 16, className }: ArrowDoubleIconProps) {
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
        d="M1.72579 8.32146L6.69685 13.274C6.99874 13.5753 7.48176 13.5753 7.77358 13.274C8.07547 12.9726 8.07547 12.4904 7.77358 12.1991L3.56729 8L7.77358 3.80091C8.07547 3.49954 8.07547 3.01735 7.77358 2.72603C7.4717 2.42466 6.98868 2.42466 6.69686 2.72603L1.72579 7.68858C1.55472 7.85936 1.55472 8.14064 1.72579 8.32146Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.3"
      />
      <path
        d="M8.12837 8.32146L13.0994 13.274C13.4013 13.5753 13.8843 13.5753 14.1762 13.274C14.4781 12.9726 14.4781 12.4904 14.1762 12.1991L9.96988 8L14.1762 3.80091C14.4781 3.49954 14.4781 3.01735 14.1762 2.72603C13.8743 2.42466 13.3913 2.42466 13.0994 2.72603L8.12837 7.68858C7.9573 7.85936 7.9573 8.14064 8.12837 8.32146Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.3"
      />
    </svg>
  )
}
