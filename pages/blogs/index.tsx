import { NextPage } from 'next'
import { Layout, Blogs } from '../../components'
import styled from 'styled-components'
import { getSortedBlogsData } from '../../lib/blog'
import { BlogData } from '../../types'

const blogs: NextPage<{ allBlogsData: BlogData[] }> = ({ allBlogsData }) => (
  <Layout>
    <Wrapper>
      <Blogs blogs={allBlogsData} />
    </Wrapper>
  </Layout>
)

export default blogs

export async function getStaticProps() {
  const allBlogsData = getSortedBlogsData()

  return {
    props: { allBlogsData },
  }
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
