import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  category: string
  tags: string[]
  featured: boolean
  readingTime: number
  content: string
}

export interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  category: string
  tags: string[]
  featured: boolean
  readingTime: number
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const folders = fs.readdirSync(postsDirectory)
  const posts = folders
    .filter((folder) => {
      const indexPath = path.join(postsDirectory, folder, 'index.md')
      return fs.existsSync(indexPath)
    })
    .map((folder) => getPostBySlug(folder))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => (a.date > b.date ? -1 : 1))

  return posts
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(postsDirectory, slug, 'index.md')

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)
  const stats = readingTime(content)

  return {
    slug,
    title: data.title || '无标题',
    date: data.date || new Date().toISOString().split('T')[0],
    excerpt: data.excerpt || '',
    category: data.category || '未分类',
    tags: data.tags || [],
    featured: data.featured || false,
    readingTime: Math.ceil(stats.minutes),
    content,
  }
}

export function getAllPostsMeta(): PostMeta[] {
  const posts = getAllPosts()
  return posts.map(({ content, ...meta }) => meta)
}

export function getFeaturedPosts(limit?: number): PostMeta[] {
  const posts = getAllPostsMeta().filter((post) => post.featured)
  return limit ? posts.slice(0, limit) : posts
}

export function getRecentPosts(limit: number = 5): PostMeta[] {
  return getAllPostsMeta().slice(0, limit)
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPostsMeta().filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  )
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPostsMeta().filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  )
}

export function getAllCategories(): string[] {
  const posts = getAllPostsMeta()
  const categories = new Set(posts.map((post) => post.category))
  return Array.from(categories).sort()
}

export function getAllTags(): string[] {
  const posts = getAllPostsMeta()
  const tags = new Set(posts.flatMap((post) => post.tags))
  return Array.from(tags).sort()
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const folders = fs.readdirSync(postsDirectory)
  return folders.filter((folder) => {
    const indexPath = path.join(postsDirectory, folder, 'index.md')
    return fs.existsSync(indexPath)
  })
}

export function getRelatedPosts(
  currentSlug: string,
  limit: number = 3
): PostMeta[] {
  const currentPost = getPostBySlug(currentSlug)
  if (!currentPost) return []

  const allPosts = getAllPostsMeta().filter((post) => post.slug !== currentSlug)

  // Score posts by relevance (same category or shared tags)
  const scoredPosts = allPosts.map((post) => {
    let score = 0
    if (post.category === currentPost.category) {
      score += 2
    }
    const sharedTags = post.tags.filter((tag) =>
      currentPost.tags.includes(tag)
    ).length
    score += sharedTags

    return { post, score }
  })

  return scoredPosts
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post)
}
