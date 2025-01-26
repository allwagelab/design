import styled from '@emotion/styled'

const ColorDot = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.color};
`

export default function Dot({ color }: { color: string }) {
  return <ColorDot color={color} />
}
