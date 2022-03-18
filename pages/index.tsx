import { NextPage } from 'next'
import styled from 'styled-components'
import { Layout } from '../components'
import { contacts, colors } from '../lib'

const Home: NextPage = () => (
  <Layout>
    <Contacts>
      {contacts.map(({ name, address, Icon }) => (
        <AboutItem key={name} onClick={() => window.open(address, '__blank')}>
          <Icon />
          <Name>{name}</Name>
        </AboutItem>
      ))}
    </Contacts>
  </Layout>
)

export default Home

const AboutItem = styled.div`
  padding: 12px 20px;
  color: ${colors.text_2};
  font-size: 12px;
  border: 1px solid ${colors.border};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 12px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: ${colors.hoverBackground};
  }
`

const Contacts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`

const Name = styled.div`
  margin-top: 8px;
`
