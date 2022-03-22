import React from 'react'
import styled from 'styled-components'
import { colors } from '../lib'
import Image from 'next/image'
import { useRouter } from 'next/router'

export const SectionHeader: React.FC<{ name: string; href: string }> = ({
  name,
  href,
}) => {
  const router = useRouter()

  return (
    <Wrapper>
      <SectionTitle>{name}</SectionTitle>

      <More onClick={() => router.push(href)}>
        <Label>More</Label>
        <Image src="/doubleright.svg" width={24} height={24} alt="more" />
      </More>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.border};
  padding: 8px;
`

const Label = styled.div`
  line-height: 18px;
  margin-right: 4px;
  transform: translateY(-1px);

  &:hover {
    color: ${colors.highlight};
  }
`

const SectionTitle = styled.div`
  text-align: left;
  color: ${colors.text_2};
  font-size: 18px;
  width: 100%;
`

const More = styled.div`
  display: flex;
  align-items: center;
  font-style: italic;
  font-weight: 300;
  color: ${colors.text_2};
  cursor: pointer;
`
