import type { IconProps } from '../types'

export const AlarmIcon = ({
  size = 19,
  className,
  color = 'currentColor',
  onClick,
  style,
  notificationColor = '#2768FF',
  hasNotification = false,
}: IconProps & {
  notificationColor?: string
  hasNotification?: boolean
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
      style={style}
    >
      <path
        d="M6.15601 18.6661H9.96998"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M8.38428 2.41607V1.33273"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M16.1309 15.6869H0.875L3.05441 13.5202V8.10356C3.05441 4.96406 5.23382 2.68689 8.50294 2.68689C11.7721 2.68689 13.9515 4.96406 13.9515 8.10356V13.5202L16.1309 15.6869Z"
        fill={color}
      />
      {hasNotification && (
        <path
          d="M13.3113 8.91607C15.4177 8.91607 17.1253 7.21848 17.1253 5.1244C17.1253 3.03032 15.4177 1.33273 13.3113 1.33273C11.2049 1.33273 9.49731 3.03032 9.49731 5.1244C9.49731 7.21848 11.2049 8.91607 13.3113 8.91607Z"
          fill={notificationColor}
          stroke="#FAFAFA"
          strokeWidth="2"
        />
      )}
    </svg>
  )
}

AlarmIcon.displayName = 'AlarmIcon'
