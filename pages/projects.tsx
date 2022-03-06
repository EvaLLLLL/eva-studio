import { NextPage } from 'next'
import Image from 'next/image'
import { Layout } from '../components'
import styled from 'styled-components'
import { colors, projects as sideProjects } from '../lib'

const projects: NextPage = () => (
  <Layout>
    <Title>Click One!⬇️</Title>
    
    {sideProjects.map(({ name, description, icon, key }) => (
      <ProjectItem key={key}>
        <Info>
          <ItemName>{name}</ItemName>
          <ItemContent>{description}</ItemContent>
        </Info>

        <Image height={36} width={36} src={icon} alt={key} />
      </ProjectItem>
    ))}
  </Layout>
)

export default projects

const Title = styled.div`
  font-size: 18px;
  margin-bottom: 16px;
  color: ${colors.text_2};
`

const ProjectItem = styled.div`
  width: 100%;
  border-radius: 12px;
  border: 1px solid ${colors.border};
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin-bottom: 16px;

  &:hover {
    background: ${colors.hoverBackground};
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const ItemName = styled.div`
  color: ${colors.text_2};
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 8px;
`

const ItemContent = styled.div`
  font-size: 14px;
  color: rgba(6, 12, 25, 0.65);
`
