import { NextPage } from 'next'
import styled from 'styled-components'
import Image from 'next/image'
import { Blogs, Layout, Projects, SectionHeader } from '../components'
import { contacts, colors, projects as sideProjects } from '../lib'
import { getSortedBlogsData } from '../lib/blog'
import { BlogData, ProjectData } from '../types'

const Home: NextPage<{
  latestBlogs: BlogData[]
  latestProjects: ProjectData[]
}> = ({ latestBlogs, latestProjects }) => (
  <Layout>
    <Wrapper>
      <InfosWrapper>
        <Introduction>
          <Image src="/flight.png" alt="flight" width={256} height={200} />
          <div>⚡️⚡️⚡️</div>
          <Description>前端工程师 / 有三只可爱的猫咪 / 老头环 ing / 试图学习 Golang ing</Description>
        </Introduction>

        <LatestBlogs>
          <SectionHeader name="Latest Posts" href="/blogs" />
          <Blogs blogs={latestBlogs} smaller={true} />
        </LatestBlogs>

        <PinedProjects>
          <SectionHeader name="Pined Projects" href="/projects" />
          <Projects projects={latestProjects} horizontal={true} />
        </PinedProjects>
      </InfosWrapper>

      <Contacts>
        {contacts.map(({ name, address, Icon, callback }) => (
          <AboutItem
            key={name}
            onClick={() => {
              if (callback) {
                callback()
              } else {
                window.open(address, '__blank')
              }
            }}
          >
            <Icon />
            <Name>{name}</Name>
          </AboutItem>
        ))}
      </Contacts>
    </Wrapper>
  </Layout>
)

export default Home

export async function getStaticProps() {
  const latestBlogs = getSortedBlogsData()?.slice(0, 3)
  const latestProjects = sideProjects.slice(0, 3)

  return {
    props: { latestBlogs, latestProjects },
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const InfosWrapper = styled.div`
  flex: 1;
`

const LatestBlogs = styled.div`
  text-align: center;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  padding: 0 24px;
`

const PinedProjects = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 0 24px;
`

const Description = styled.div`
  text-align: center;
  color: ${colors.text_3};
  margin-top: 8px;
  font-size: 14px;
`

const Introduction = styled.div`
  margin: auto auto 24px;
  text-align: center;
`

const AboutItem = styled.div`
  padding: 4px 0;
  color: ${colors.text_2};
  font-size: 12px;
  border: 1px solid ${colors.border};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100%;

  &:hover {
    background: ${colors.hoverBackground};
  }

  &:not(:last-child) {
    border-right: 0;
  }

  &:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  &:last-child {
    border-bottom-right-radius: 8px;
    border-top-right-radius: 8px;
  }
`

const Contacts = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;

  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
  }
`

const Name = styled.div`
  margin-top: 4px;
  color: ${colors.text_3};
`
