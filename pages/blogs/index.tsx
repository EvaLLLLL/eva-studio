import { NextPage } from 'next'
import { Layout } from '../../components'
import styled from 'styled-components'
import { colors } from '../../lib'
import { getSortedBlogsData } from '../../lib/blog'
import { BlogData } from '../../types'
import Link from 'next/link'

const blogs: NextPage<{ allBlogsData: BlogData[] }> = ({ allBlogsData }) => (
    <Layout>
      <Wrapper>
        <Blogs>
          {allBlogsData.map(({ id, title, date }) => (
            <Link href={`/blogs/${id}`} key={id} passHref>
              <BlogItem>
                <Date>{date}</Date>
                <Title>{title}</Title>
              </BlogItem>
            </Link>
          ))}
        </Blogs>
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

const Blogs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 24px;
`

const BlogItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  margin-bottom: 16px;
`

const Title = styled.div`
  color: ${colors.text_1};
  font-style: italic;
  cursor: pointer;

  &:hover {
    color: ${colors.highlight};
  }
`

const Date = styled.div`
  margin-right: 56px;
  color: ${colors.text_3};
`
