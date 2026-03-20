import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export type BlogPostMeta = {
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  coverImage?: string
  featured?: boolean
  readingTime: string
}

export type BlogPost = BlogPostMeta & {
  contentHtml: string
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

function toReadingTime(markdown: string): string {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / 220))
  return `${minutes} min read`
}

function normalizeMeta(slug: string, frontmatter: Record<string, unknown>, rawContent: string): BlogPostMeta {
  const tags = Array.isArray(frontmatter.tags)
    ? frontmatter.tags.filter((value): value is string => typeof value === 'string')
    : []

  return {
    slug,
    title: typeof frontmatter.title === 'string' ? frontmatter.title : slug,
    description: typeof frontmatter.description === 'string' ? frontmatter.description : '',
    date: typeof frontmatter.date === 'string' ? frontmatter.date : '',
    author: typeof frontmatter.author === 'string' ? frontmatter.author : '0x1 Labs',
    tags,
    coverImage: typeof frontmatter.coverImage === 'string' ? frontmatter.coverImage : undefined,
    featured: frontmatter.featured === true,
    readingTime: toReadingTime(rawContent),
  }
}

export async function getAllPostsMeta(): Promise<BlogPostMeta[]> {
  const entries = await fs.readdir(BLOG_DIR)
  const markdownFiles = entries.filter((file) => file.endsWith('.md') && !file.startsWith('_'))

  const posts = await Promise.all(
    markdownFiles.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(BLOG_DIR, fileName)
      const raw = await fs.readFile(fullPath, 'utf8')
      const parsed = matter(raw)
      return normalizeMeta(slug, parsed.data, parsed.content)
    }),
  )

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(BLOG_DIR, `${slug}.md`)
    const raw = await fs.readFile(fullPath, 'utf8')
    const parsed = matter(raw)
    const processed = await remark().use(html).process(parsed.content)

    return {
      ...normalizeMeta(slug, parsed.data, parsed.content),
      contentHtml: processed.toString(),
    }
  } catch {
    return null
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  const entries = await fs.readdir(BLOG_DIR)
  return entries
    .filter((file) => file.endsWith('.md') && !file.startsWith('_'))
    .map((file) => file.replace(/\.md$/, ''))
}
