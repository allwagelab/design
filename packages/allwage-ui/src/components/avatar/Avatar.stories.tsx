import styled from '@emotion/styled'
import type { Meta, StoryObj } from '@storybook/react'

import { BuildingIcon, UserIcon, UserRoundedIcon } from '../../icons'
import Avatar from './Avatar'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof Avatar>

const Container = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  justify-items: center;
  gap: 24px;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: #333;
`

// 기본 아바타 (크기별)
export const Sizes: Story = {
  render: () => (
    <Container>
      <Avatar size="xs" />
      <Avatar size="sm" />
      <Avatar size="md" />
      <Avatar size="lg" />
    </Container>
  ),
}

// 이미지가 있는 아바타 (크기별)
export const WithImage: Story = {
  render: () => (
    <Container>
      <Avatar size="xs" src="https://i.pravatar.cc/300" />
      <Avatar size="sm" src="https://i.pravatar.cc/300" />
      <Avatar size="md" src="https://i.pravatar.cc/300" />
      <Avatar size="lg" src="https://i.pravatar.cc/300" />
    </Container>
  ),
}

// 모양별 아바타
export const Shapes: Story = {
  render: () => (
    <Section>
      <div>
        <SectionTitle>Circle</SectionTitle>
        <Container>
          <Avatar size="xs" shape="circle" />
          <Avatar size="sm" shape="circle" />
          <Avatar size="md" shape="circle" />
          <Avatar size="lg" shape="circle" />
        </Container>
      </div>
      <div>
        <SectionTitle>Square</SectionTitle>
        <Container>
          <Avatar size="xs" shape="square" />
          <Avatar size="sm" shape="square" />
          <Avatar size="md" shape="square" />
          <Avatar size="lg" shape="square" />
        </Container>
      </div>
    </Section>
  ),
}

// 아이콘별 아바타
export const Icons: Story = {
  render: () => (
    <Section>
      <div>
        <SectionTitle>User Rounded Icon (Default)</SectionTitle>
        <Container>
          <Avatar size="md" icon={UserRoundedIcon} />
          <Avatar size="md" shape="square" icon={UserRoundedIcon} />
        </Container>
      </div>
      <div>
        <SectionTitle>Building Icon</SectionTitle>
        <Container>
          <Avatar size="md" icon={BuildingIcon} />
          <Avatar size="md" shape="square" icon={BuildingIcon} />
        </Container>
      </div>
    </Section>
  ),
}

// 모든 변형
export const AllVariants: Story = {
  render: () => (
    <Section>
      <div>
        <GridContainer>
          <Avatar size="xs" shape="circle" />
          <Avatar size="sm" shape="circle" />
          <Avatar size="md" shape="circle" />
          <Avatar size="lg" shape="circle" />
        </GridContainer>
      </div>
      <div>
        <GridContainer>
          <Avatar size="xs" shape="circle" src="https://i.pravatar.cc/300" />
          <Avatar size="sm" shape="circle" src="https://i.pravatar.cc/300" />
          <Avatar size="md" shape="circle" src="https://i.pravatar.cc/300" />
          <Avatar size="lg" shape="circle" src="https://i.pravatar.cc/300" />
        </GridContainer>
      </div>
      <div>
        <GridContainer>
          <Avatar size="xs" shape="square" />
          <Avatar size="sm" shape="square" />
          <Avatar size="md" shape="square" />
          <Avatar size="lg" shape="square" />
        </GridContainer>
      </div>
      <div>
        <GridContainer>
          <Avatar size="xs" shape="square" src="https://i.pravatar.cc/300" />
          <Avatar size="sm" shape="square" src="https://i.pravatar.cc/300" />
          <Avatar size="md" shape="square" src="https://i.pravatar.cc/300" />
          <Avatar size="lg" shape="square" src="https://i.pravatar.cc/300" />
        </GridContainer>
      </div>
      <div>
        <GridContainer>
          <Avatar size="md" icon={UserRoundedIcon} />
          <Avatar size="md" icon={UserIcon} />
          <Avatar size="md" icon={BuildingIcon} />
          <Avatar size="md" shape="square" icon={BuildingIcon} />
        </GridContainer>
      </div>
    </Section>
  ),
}
