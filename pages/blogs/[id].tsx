import React from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Layout } from '../../components'
import { getAllBlogIds, getBlogData } from '../../lib/blog'
import { BlogData } from '../../types'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

const Blog: NextPage<{ blogData: BlogData; params: { id: string } }> = ({
  blogData,
}) => {
  const { title, content, date } = blogData
  return (
    <Layout>
      <div>
        {title} {date}
      </div>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkParse]}
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                style={materialDark}
                customStyle={{
                  fontSize: 13,
                  borderRadius: '8px',
                  fontFamily: 'JetBrains Mono',
                }}
                showLineNumbers={true}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
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
