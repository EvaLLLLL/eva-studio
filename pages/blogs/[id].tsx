import React from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Layout } from '../../components'
import { getAllBlogIds, getBlogData } from '../../lib/blog'
import { BlogData } from '../../types'

const Blog: NextPage<{ blogData: BlogData; params: { id: string } }> = ({
  blogData,
}) => {
  const { title, content, date } = blogData
  return (
    <Layout>
      <div>
        {title} {date}
      </div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  )
}

export default Blog

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getAllBlogIds()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (typeof params?.id !== 'string') return { props: {} }

  const blogData = await getBlogData(params.id)
  return { props: { blogData } }
}
