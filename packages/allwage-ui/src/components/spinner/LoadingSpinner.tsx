import styled from '@emotion/styled'

type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type SpinnerType = 'filled' | 'outline' | 'ghost'

const SPINNER_SIZES: Record<SpinnerSize, string> = {
  xs: '14px',
  sm: '18px',
  md: '20px',
  lg: '20px',
  xl: '24px',
}

const SpinnerWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

const SpinnerSvg = styled.svg<{ size: SpinnerSize; variant: SpinnerType }>`
  width: ${({ size }) => SPINNER_SIZES[size]};
  height: ${({ size }) => SPINNER_SIZES[size]};
  animation: spin 1s linear infinite;
  color: ${({ variant }) => (variant === 'filled' ? 'white' : '#111111')};

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

interface LoadingSpinnerProps {
  size?: SpinnerSize
  variant?: SpinnerType
  className?: string
}

export default function LoadingSpinner({
  size = 'lg',
  variant = 'filled',
  className,
}: LoadingSpinnerProps) {
  return (
    <SpinnerWrapper role="status" aria-label="loading" className={className}>
      <SpinnerSvg viewBox="0 0 24 24" size={size} variant={variant} fill="none">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          opacity={0.25}
        />
        <path
          d="M12 2C6.47715 2 2 6.47715 2 12"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </SpinnerSvg>
    </SpinnerWrapper>
  )
}
