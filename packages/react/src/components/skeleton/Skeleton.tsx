import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

interface SkeletonProps {
  width?: number | string
  height?: number | string
  radius?: number
  animation?: boolean
  className?: string
  style?: React.CSSProperties
}

const shimmer = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
`

const SkeletonBase = styled.div<SkeletonProps>`
  display: ${props =>
    typeof props.width === 'number' || props.width === '100%' ? 'block' : 'inline-block'};
  background: linear-gradient(90deg, #f5f5f4 25%, #fafaf9 37%, #f5f5f4 63%);
  background-size: 200% 100%;
  width: ${props => (typeof props.width === 'number' ? `${props.width}px` : props.width) || '100%'};
  height: ${props =>
    typeof props.height === 'number' ? `${props.height}px` : props.height || '20px'};
  border-radius: ${props => props.radius || 4}px;
  animation: ${props => props.animation !== false && shimmer} 3.5s linear infinite;
`

export default function Skeleton({
  width,
  height,
  radius,
  animation = true,
  className,
  style,
}: SkeletonProps) {
  return (
    <SkeletonBase
      width={width}
      height={height}
      radius={radius}
      animation={animation}
      className={className}
      style={style}
    />
  )
}
