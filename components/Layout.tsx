import { NextComponentType } from 'next'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { routes, colors } from '../lib'
import { useRouter } from 'next/router'

export const Layout: NextComponentType = ({ children }) => {
  const { pathname } = useRouter()

  return (
    <Wrapper>
      <Head>
        <title>W I P</title>
        <link rel="icon" href="/lightning.svg" />
      </Head>

      <Navigation>
        <Link href="/" passHref={true}>
          <Logo>
            <Image src="/lightning.svg" width="36" height="36" alt="logo" />
            <Name>Eva's Studio</Name>
          </Logo>
        </Link>

        <Menus>
          {routes.map(({ path, name }) => (
            <MenuItem key={path}>
              <Link key={path} href={path} passHref={true}>
                <MenuLabel isActive={pathname === path}>{name}</MenuLabel>
              </Link>
            </MenuItem>
          ))}
        </Menus>
      </Navigation>

      <ChildrenWrapper>{children}</ChildrenWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 720px;
  background: ${colors.lightBackground};
  margin: auto;
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const ChildrenWrapper = styled.div`
  flex: 1;
  margin-top: 24px;
  overflow: auto;
  padding: 0 24px;
  
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 4px;
    transition: background-color 0.3s;
  }
  
  &:hover::-webkit-scrollbar-thumb {
    background: #d8d8d8;
  }
`

const Menus = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`

const MenuItem = styled.div`
  margin-left: 18px;
  border-radius: 6px;
`

const MenuLabel = styled.div<{ isActive: boolean }>`
  cursor: ${({ isActive }) => (isActive ? 'default' : 'pointer')};
  color: ${({ isActive }) => (isActive ? colors.highlight : colors.text_1)};
  font-weight: 300;

  &:hover {
    color: ${colors.highlight};
  }
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const Name = styled.div`
  margin-left: 8px;
  font-style: italic;
  font-size: 18px;
  font-weight: 300;
  color: ${colors.text_1};
`

const Navigation = styled.div`
  background: ${colors.lightBackground};
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
`