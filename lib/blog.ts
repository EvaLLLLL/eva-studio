import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import moment from 'moment'
import { BlogData } from '../types'

const blogsDirectory = path.join(process.cwd(), 'blogs')

export const getAllBlogIds = () => {
  const fileNames = fs.readdirSync(blogsDirectory)

  return fileNames.map(name => ({
    params: { id: name.replace(/\.md$/, '') },
  }))
}

export const getSortedBlogsData = () => {
  const fileName = fs.readdirSync(blogsDirectory)
  const allBlogsData = fileName.map(name => {
    const id = name.replace(/\.md$/, '')

    const fullPath = path.join(blogsDirectory, name)
    const fileContent = fs.readFileSync(fullPath, 'utf8')

    const { data } = matter(fileContent)

    return { id, ...data } as BlogData
  })

  return allBlogsData.sort((a, b) => (moment(a.date).isBefore(b.date) ? 1 : -1))
}

export const getBlogData = async (id: string) => {
  const fullPath = path.join(blogsDirectory, `${id}.md`)
  const fileContent = fs.readFileSync(fullPath, 'utf8')

  const { data, content } = matter(fileContent)

  return { id, content, ...data }
}
