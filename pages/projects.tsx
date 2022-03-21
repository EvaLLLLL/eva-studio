import { NextPage } from 'next'
import { Layout, Projects } from '../components'
import { projects as sideProjects } from '../lib'

const projects: NextPage = () => (
  <Layout>
    <Projects projects={sideProjects} />
  </Layout>
)

export default projects
