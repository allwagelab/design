import { theme } from '@allwagelab/design'
import isPropValid from '@emotion/is-prop-valid'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

import LoadingSpinner from '../spinner/LoadingSpinner'

const BUTTON_SIZES: Record<ButtonSize, ReturnType<typeof css>> = {
  xs: css`
    height: 24px;
    padding: 0 0.75rem;
    ${theme.typography.caption.c1_rg};
  `,
  sm: css`
    height: 36px;
    ${theme.typography.caption.c1_rg};
  `,
  md: css`
    height: 44px;
    ${theme.typography.body.b2_rg};
  `,
  lg: css`
    height: 48px;
    ${theme.typography.body.b2_rg};
  `,
  xl: css`
    height: 56px;
    ${theme.typography.body.b1_rg};
  `,
}

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type ButtonType = 'filled' | 'outline' | 'ghost'

interface BaseButtonCssProps {
  weak?: boolean
  full?: boolean
  size?: ButtonSize
  variant?: ButtonType
  loading?: boolean
  disabled?: boolean
}

type ButtonBaseProps = BaseButtonCssProps &
  React.PropsWithChildren &
  React.ButtonHTMLAttributes<HTMLButtonElement>

const baseButtonCss = ({ full, size = 'md', variant = 'filled' }: ButtonBaseProps) => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  border-radius: 6px;
  font-weight: 600;
  border: none;
  outline: none;
  position: relative;

  ${full &&
  css`
    width: 100%;
    display: flex;
  `};

  ${BUTTON_SIZES[size]}

  &:disabled:not([aria-busy='true']) {
    cursor: not-allowed;
  }

  &[aria-busy='true'] {
    cursor: wait;

    .button-content {
      opacity: 0;
    }
  }

  & > [aria-label='loading'] {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  ${variant === 'filled' &&
  css`
    background-color: ${theme.colors.blue60};
    color: ${theme.colors.gray0};

    &:hover:not(:disabled) {
      background-color: ${theme.colors.blue50};
      color: ${theme.colors.baseWhite};
    }

    &:active:not(:disabled) {
      background-color: ${theme.colors.blue40};
      color: ${theme.colors.baseWhite};
    }

    &:focus {
      background-color: ${theme.colors.blue40};
      color: ${theme.colors.baseWhite};
    }

    &:disabled:not([aria-busy='true']) {
      background-color: ${theme.colors.gray20};
      color: ${theme.colors.gray70};
    }
  `}

  ${variant === 'outline' &&
  css`
    background-color: transparent;
    border: 1px solid ${theme.colors.blue60};
    color: ${theme.colors.blue60};

    &:hover:not(:disabled) {
      background-color: ${theme.colors.blue20};
    }

    &:active:not(:disabled) {
      background-color: ${theme.colors.blue10};
    }

    &:focus {
      background-color: ${theme.colors.blue10};
    }

    &:disabled:not([aria-busy='true']) {
      background-color: ${theme.colors.gray10};
      border-color: ${theme.colors.gray30};
      color: ${theme.colors.gray70};
    }

    &[aria-current='false'] {
      background-color: ${theme.colors.baseWhite};
      border-color: ${theme.colors.gray30};
      color: ${theme.colors.gray90};
    }

    &[aria-busy='true'] {
      border-color: ${theme.colors.blue60};
    }
  `}

  ${variant === 'ghost' &&
  css`
    background-color: transparent;
    color: ${theme.colors.gray90};

    &:hover:not(:disabled) {
      color: ${theme.colors.baseBlack};
    }

    &:active:not(:disabled) {
      color: ${theme.colors.gray80};
    }

    &:focus {
      color: ${theme.colors.gray80};
    }

    &:disabled:not([aria-busy='true']) {
      color: ${theme.colors.gray70};
    }
  `}
`

const ButtonBase = styled('button', {
  shouldForwardProp: prop => isPropValid(prop),
})<ButtonBaseProps>`
  ${props => baseButtonCss(props)}
`

export default function Button({
  children,
  weak,
  loading = false,
  disabled = false,
  ...props
}: ButtonBaseProps) {
  return (
    <ButtonBase {...props} aria-current={!weak} aria-busy={loading} disabled={disabled || loading}>
      {loading && <LoadingSpinner size={props.size} variant={props.variant} />}
      <span className="button-content">{children}</span>
    </ButtonBase>
  )
}
