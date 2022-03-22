import React from 'react'
import { ProjectData } from '../types'
import { colors } from '../lib'
import Image from 'next/image'
import styled, { css } from 'styled-components'

export const Projects: React.FC<{
  projects: ProjectData[]
  horizontal?: boolean
}> = ({ projects, horizontal }) => (
  <Wrapper horizontal={horizontal}>
    {projects.map(({ name, description, icon, key }) => (
      <ProjectItem key={key} horizontal={horizontal}>
        <Info>
          <ItemName horizontal={horizontal}>{name}</ItemName>

          {!!horizontal ? null : <ItemContent>{description}</ItemContent>}
        </Info>

        <Image height={36} width={36} src={icon} alt={key} />
      </ProjectItem>
    ))}
  </Wrapper>
)

const Wrapper = styled.div<{ horizontal?: boolean }>`
  margin-top: 24px;
  ${props =>
    props.horizontal
      ? css`
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        `
      : null}
`

const ProjectItem = styled.div<{ horizontal?: boolean }>`
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

  ${props =>
    props.horizontal
      ? css`
          width: auto;

          &:not(:last-child) {
            margin-right: 12px;
          }
        `
      : null}
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const ItemName = styled.div<{ horizontal?: boolean }>`
  color: ${colors.text_2};
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 8px;

  ${props =>
    props.horizontal
      ? css`
          margin-bottom: 0;
        `
      : null}
`

const ItemContent = styled.div`
  font-size: 14px;
  color: ${colors.text_3};
`