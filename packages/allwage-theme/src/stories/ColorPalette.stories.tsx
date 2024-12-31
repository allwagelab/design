import React from 'react'

import styled from '@emotion/styled'
import type { Meta, StoryObj } from '@storybook/react'

interface ColorSwatchProps {
  colorName: string
  colorValue: string
}

interface ColorGroupProps {
  title: string
  colors: Record<string, string>
}

interface ColorPaletteProps {
  colors: {
    baseColors: Record<string, string>
    grayScale: Record<string, string>
    green: Record<string, string>
    purple: Record<string, string>
    yellow: Record<string, string>
    blue: Record<string, string>
    orange: Record<string, string>
  }
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ colors }) => {
  return (
    <PaletteContainer>
      <ColorGroup title="Base Colors" colors={colors.baseColors} />
      <ColorGroup title="Gray Scale" colors={colors.grayScale} />
      <ColorGroup title="Green" colors={colors.green} />
      <ColorGroup title="Purple" colors={colors.purple} />
      <ColorGroup title="Yellow" colors={colors.yellow} />
      <ColorGroup title="Blue" colors={colors.blue} />
      <ColorGroup title="Orange" colors={colors.orange} />
    </PaletteContainer>
  )
}

const meta = {
  title: 'Foundation/ColorPalette',
  component: ColorPalette,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ColorPalette>

export default meta

const SwatchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const ColorBox = styled.div<{ bgColor: string }>`
  width: 96px;
  height: 96px;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  background-color: ${props => props.bgColor};
`

const ColorInfo = styled.div`
  font-size: 14px;
`

const ColorName = styled.div`
  font-weight: 500;
`

const ColorValue = styled.div`
  color: #666670;
`

const ColorSwatch: React.FC<ColorSwatchProps> = ({ colorName, colorValue }) => {
  return (
    <SwatchContainer>
      <ColorBox bgColor={colorValue} />
      <ColorInfo>
        <ColorName>{colorName}</ColorName>
        <ColorValue>{colorValue}</ColorValue>
      </ColorInfo>
    </SwatchContainer>
  )
}

const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const GroupTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
`

const ColorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(6, 1fr);
  }
`

const ColorGroup: React.FC<ColorGroupProps> = ({ title, colors }) => {
  return (
    <GroupContainer>
      <GroupTitle>{title}</GroupTitle>
      <ColorsGrid>
        {Object.entries(colors).map(([name, value]) => (
          <ColorSwatch key={name} colorName={name} colorValue={value} />
        ))}
      </ColorsGrid>
    </GroupContainer>
  )
}

const PaletteContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 24px;
`

const colors = {
  baseColors: {
    baseWhite: '#FFFFFF',
    baseBlack: '#171717',
    baseRed: '#FF3939',
    baseBackground: '#F5F7FA',
  },
  grayScale: {
    gray0: '#FDFDFD',
    gray10: '#F9F9F9',
    gray20: '#F5F5F5',
    gray30: '#EAEAEC',
    gray40: '#DDDDE0',
    gray50: '#CCCCD1',
    gray60: '#B9B9BE',
    gray70: '#9999A0',
    gray80: '#666670',
    gray90: '#33333E',
    gray100: '#111111',
  },
  green: {
    green10: '#F7FDFB',
    green20: '#E7FAF3',
    green30: '#B6EFDB',
    green40: '#9DE9CE',
    green50: '#84E4C2',
    green60: '#6BDFB5',
    green70: '#53DAA9',
    green80: '#22CF91',
    green90: '#09C984',
    green100: '#00C67F',
  },
  purple: {
    purple0: '#FBFAFF',
    purple10: '#F0ECFE',
    purple20: '#DBD3FE',
    purple30: '#C0B0FF',
    purple40: '#9E86FC',
    purple50: '#7D5EF7',
    purple60: '#6541F2',
    purple70: '#4F29E5',
    purple80: '#3A16C9',
    purple90: '#23098F',
    purple100: '#11024D',
  },
  yellow: {
    yellow10: '#FEFBE8',
    yellow20: '#FFF9C5',
    yellow30: '#FEF29C',
    yellow40: '#FFF177',
    yellow50: '#FFEE58',
    yellow60: '#FFEA3B',
    yellow70: '#FDD835',
    yellow80: '#FBC02D',
    yellow90: '#F9A926',
    yellow100: '#F67F17',
  },
  blue: {
    blue10: '#F1F5FF',
    blue20: '#E4ECFF',
    blue30: '#9DBBFF',
    blue40: '#709BFF',
    blue50: '#457DFF',
    blue60: '#1C61FF',
    blue70: '#1852D9',
    blue80: '#1445B5',
    blue90: '#103791',
    blue100: '#0D2C73',
  },
  orange: {
    orange10: '#FFECE8',
    orange20: '#FFC3B8',
    orange30: '#FFA596',
    orange40: '#FF7C66',
    orange50: '#FF6348',
    orange60: '#FF3C1A',
    orange70: '#E83718',
    orange80: '#B52B12',
    orange90: '#8C210E',
    orange100: '#6B190B',
  },
}

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    colors,
  },
}

export const DarkMode: Story = {
  args: {
    colors,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
}
