import React from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Layout } from '../../components'
import { getAllBlogIds, getBlogData } from '../../lib/blog'
import { BlogData } from '../../types'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import styled from 'styled-components'
import { colors } from '../../lib'

const Blogs: NextPage<{ blogData: BlogData; params: { id: string } }> = ({
  blogData,
}) => {
  const { title, content, date } = blogData
  const markdownRef = React.useRef<HTMLDivElement>(null)
  const [markdownWidth, setMarkdownWidth] = React.useState(0)

  React.useEffect(
    () => setMarkdownWidth(markdownRef.current?.clientWidth || 0),
    [],
  )

  return (
    <Layout gobackVisible={true}>
      <Info>
        <Title>{title}</Title>
        <Date>{date}</Date>
      </Info>

      <MarkdownWrapper ref={markdownRef} width={markdownWidth}>
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
                <SingleCode className={className} {...props}>
                  {children}
                </SingleCode>
              )
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </MarkdownWrapper>
    </Layout>
  )
}

export default Blogs

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

const Info = styled.div`
  text-align: center;
`

const Title = styled.div`
  font-size: 24px;
  color: ${colors.text_1};
`

const Date = styled.div`
  font-size: 14px;
  color: ${colors.text_3};
  margin-top: 8px;
`

const SingleCode = styled.span`
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(175, 184, 193, 0.2);
  border-radius: 6px;
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
    Liberation Mono, monospace;
`

const MarkdownWrapper = styled.div<{ width?: number }>`
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';

  img {
    max-width: 666px;
  }

  @media (max-width: 500px) {
    img {
      max-width: ${props => `${props.width}px` ?? '80vw'};
    }
  }

  a {
    color: ${colors.highlight};
    &:hover {
      text-decoration-line: underline;
    }
  }

  blockquote {
    border-left: 4px solid #d3d5db;
    margin: 1.5em 10px;
    padding: 0.5em 10px;
  }

  blockquote p {
    color: #57606a;
    display: inline;
    font-size: 16px;
    line-height: 1.5;
  }
`
