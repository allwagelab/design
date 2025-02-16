export interface IconProps {
  size?: number
  className?: string
  color?: string
  onClick?: () => void
  style?: React.CSSProperties
}

export interface IconComponent extends React.FC<IconProps> {
  displayName?: string
}
