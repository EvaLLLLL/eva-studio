import { BlogData } from '../types'
import Link from 'next/link'
import styled, { css } from 'styled-components'
import { colors } from '../lib'
import React from 'react'

export const Blogs: React.FC<{ blogs: BlogData[]; smaller?: boolean }> = ({
  blogs,
  smaller,
}) => (
  <Wrapper>
    {blogs.map(({ id, title, date }) => (
      <Link href={`/blogs/${id}`} key={id} passHref>
        <BlogItem smaller={smaller}>
          <Date>{date}</Date>
          <Title>{title}</Title>
        </BlogItem>
      </Link>
    ))}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 24px;
`

const BlogItem = styled.div<{ smaller?: boolean }>`
  display: flex;
  align-items: center;
  font-size: 18px;
  margin-bottom: 16px;

  ${props =>
    props.smaller
      ? css`
          font-size: 16px;
        `
      : null}
`

const Title = styled.div`
  color: ${colors.text_2};
  font-style: italic;
  cursor: pointer;
  text-align: left;

  &:hover {
    color: ${colors.highlight};
  }
`

const Date = styled.div`
  margin-right: 56px;
  color: ${colors.text_3};
  font-size: 14px;
  white-space: nowrap;

  @media (max-width: 500px) {
    margin-right: 16px;
  }
`
