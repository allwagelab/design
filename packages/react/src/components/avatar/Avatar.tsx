import type { FC, SVGProps } from 'react'

import { theme } from '@allwagelab/design'
import styled from '@emotion/styled'

import { UserRoundedIcon } from '../../icons'

const AVATAR_SIZES: Record<AvatarSize, { size: number; iconSize: number }> = {
  xs: { size: 32, iconSize: 13.33 },
  sm: { size: 48, iconSize: 22.33 },
  md: { size: 56, iconSize: 26.67 },
  lg: { size: 80, iconSize: 38.1 },
}

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg'
type AvatarShape = 'circle' | 'square'

interface AvatarProps {
  size?: AvatarSize
  shape?: AvatarShape
  src?: string
  alt?: string
  className?: string
  icon?: FC<SVGProps<SVGSVGElement>>
}

const AvatarContainer = styled.div<{ size: AvatarSize; shape: AvatarShape }>`
  width: ${props => AVATAR_SIZES[props.size].size}px;
  height: ${props => AVATAR_SIZES[props.size].size}px;
  border-radius: ${props => (props.shape === 'circle' ? '50%' : '8px')};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.gray30};
`

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const IconWrapper = styled.div<{ size: AvatarSize }>`
  color: ${theme.colors.gray50};
  width: ${props => AVATAR_SIZES[props.size].iconSize}px;
  height: ${props => AVATAR_SIZES[props.size].iconSize}px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default function Avatar({
  size = 'md',
  shape = 'circle',
  src,
  alt,
  className,
  icon: Icon = UserRoundedIcon,
}: AvatarProps) {
  return (
    <AvatarContainer size={size} shape={shape} className={className}>
      {src ? (
        <AvatarImage src={src} alt={alt || 'avatar'} />
      ) : (
        <IconWrapper size={size}>
          <Icon width={AVATAR_SIZES[size].iconSize} height={AVATAR_SIZES[size].iconSize} />
        </IconWrapper>
      )}
    </AvatarContainer>
  )
}
