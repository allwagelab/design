import { theme } from '@allwagelab/design'
import styled from '@emotion/styled'

import { UserIcon } from '../../icons/user-icon'

const AVATAR_SIZES: Record<AvatarSize, { size: number; iconSize: number }> = {
  xs: { size: 32, iconSize: 13.33 },
  sm: { size: 52, iconSize: 25.33 },
  md: { size: 56, iconSize: 26.67 },
  lg: { size: 80, iconSize: 38.1 },
}

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg'

interface AvatarProps {
  size?: AvatarSize
  src?: string
  alt?: string
  className?: string
}

const AvatarContainer = styled.div<{ size: AvatarSize }>`
  width: ${props => AVATAR_SIZES[props.size].size}px;
  height: ${props => AVATAR_SIZES[props.size].size}px;
  border-radius: 50%;
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

export default function Avatar({ size = 'md', src, alt, className }: AvatarProps) {
  return (
    <AvatarContainer size={size} className={className}>
      {src ? (
        <AvatarImage src={src} alt={alt || 'avatar'} />
      ) : (
        <IconWrapper size={size}>
          <UserIcon size={AVATAR_SIZES[size].iconSize} />
        </IconWrapper>
      )}
    </AvatarContainer>
  )
}
