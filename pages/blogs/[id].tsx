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
import Image from 'next/image'
import Link from 'next/link'

const Blogs: NextPage<{ blogData: BlogData; params: { id: string } }> = ({
  blogData,
}) => {
  const { title, content, date } = blogData
  return (
    <Layout>
      <Link href="/blogs" passHref>
        <GobackButton>
          <Image src="/doubleleft.svg" width={24} height={24} alt="goback" />
          <span>Go Back</span>
        </GobackButton>
      </Link>

      <Info>
        <Title>{title}</Title>
        <Date>{date}</Date>
      </Info>

      <MarkdownWrapper>
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

const GobackButton = styled.div`
  display: flex;
  align-items: center;
  font-style: italic;
  font-weight: 300;
  color: ${colors.text_2};
  cursor: pointer;
  margin-bottom: 6px;
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

const MarkdownWrapper = styled.div`
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';

  img {
    max-width: 666px;
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
