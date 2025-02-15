import type { IconProps } from './types'

export const BuildingIcon = ({
  size = 22,
  className,
  color = 'currentColor',
  onClick,
  style,
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
      style={style}
    >
      <path
        d="M19.4204 15.7402H21.2916V17.6661H0.708252V15.7402H2.57946V1.29578C2.57946 1.04039 2.67804 0.795453 2.8535 0.614862C3.02896 0.434272 3.26693 0.332817 3.51507 0.332817H12.8711C13.1193 0.332817 13.3572 0.434272 13.5327 0.614862C13.7082 0.795453 13.8067 1.04039 13.8067 1.29578V15.7402H15.6779V6.11059H18.4848C18.7329 6.11059 18.9709 6.21205 19.1463 6.39264C19.3218 6.57323 19.4204 6.81816 19.4204 7.07356V15.7402ZM6.32189 8.03652V9.96245H10.0643V8.03652H6.32189ZM6.32189 4.18467V6.11059H10.0643V4.18467H6.32189Z"
        fill={color}
      />
    </svg>
  )
}

BuildingIcon.displayName = 'BuildingIcon'
