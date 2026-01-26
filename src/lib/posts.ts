import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const postsDirectory = path.join(process.cwd(), 'content/posts')

// Check if we're in development mode
const isDev = process.env.NODE_ENV === 'development'

// Cache for posts data
let postsCache: Post[] | null = null
let postsCacheTime: number = 0
const CACHE_TTL = 60000 // 1 minute TTL for development

function invalidateCache() {
  postsCache = null
  postsCacheTime = 0
}

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
  // New fields
  draft?: boolean
  series?: string
  seriesOrder?: number
  coverImage?: string
  lastModified?: string
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
  // New fields
  draft?: boolean
  series?: string
  seriesOrder?: number
  coverImage?: string
  lastModified?: string
}

export interface SeriesInfo {
  name: string
  slug: string
  posts: PostMeta[]
  description?: string
}

function loadAllPostsFromDisk(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const folders = fs.readdirSync(postsDirectory)
  return folders
    .filter((folder) => {
      const indexPath = path.join(postsDirectory, folder, 'index.md')
      return fs.existsSync(indexPath)
    })
    .map((folder) => getPostBySlug(folder))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => (a.date > b.date ? -1 : 1))
}

function getCachedPosts(): Post[] {
  const now = Date.now()
  // In production, cache indefinitely; in dev, use TTL
  if (!postsCache || (isDev && now - postsCacheTime > CACHE_TTL)) {
    postsCache = loadAllPostsFromDisk()
    postsCacheTime = now
  }
  return postsCache
}

export function getAllPosts(includeDrafts: boolean = isDev): Post[] {
  const posts = getCachedPosts()
  return posts.filter((post) => includeDrafts || !post.draft)
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
    // New fields
    draft: data.draft || false,
    series: data.series || undefined,
    seriesOrder: data.seriesOrder || undefined,
    coverImage: data.coverImage || undefined,
    lastModified: data.lastModified || undefined,
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

// Get all series with their posts
export function getAllSeries(): SeriesInfo[] {
  const posts = getAllPostsMeta()
  const seriesMap = new Map<string, PostMeta[]>()

  posts.forEach((post) => {
    if (post.series) {
      const existing = seriesMap.get(post.series) || []
      existing.push(post)
      seriesMap.set(post.series, existing)
    }
  })

  const series: SeriesInfo[] = []
  seriesMap.forEach((posts, name) => {
    // Sort by seriesOrder, then by date
    const sortedPosts = posts.sort((a, b) => {
      if (a.seriesOrder !== undefined && b.seriesOrder !== undefined) {
        return a.seriesOrder - b.seriesOrder
      }
      if (a.seriesOrder !== undefined) return -1
      if (b.seriesOrder !== undefined) return 1
      return a.date > b.date ? 1 : -1
    })

    series.push({
      name,
      slug: encodeURIComponent(name),
      posts: sortedPosts,
    })
  })

  return series.sort((a, b) => a.name.localeCompare(b.name))
}

// Get a specific series by name
export function getSeriesByName(name: string): SeriesInfo | null {
  const series = getAllSeries()
  return series.find((s) => s.name === name || s.slug === name) || null
}

// Get posts in the same series
export function getSeriesPosts(seriesName: string): PostMeta[] {
  const series = getSeriesByName(seriesName)
  return series?.posts || []
}

// Get previous and next posts for navigation
export function getAdjacentPosts(currentSlug: string): {
  prev: PostMeta | null
  next: PostMeta | null
} {
  const posts = getAllPostsMeta()
  const currentIndex = posts.findIndex((post) => post.slug === currentSlug)

  if (currentIndex === -1) {
    return { prev: null, next: null }
  }

  return {
    prev: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
  }
}

// Get popular posts (by featured status, can be extended with view counts)
export function getPopularPosts(limit: number = 5): PostMeta[] {
  const posts = getAllPostsMeta()
  // Prioritize featured posts, then sort by date
  return posts
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return a.date > b.date ? -1 : 1
    })
    .slice(0, limit)
}

// Get tags with count
export function getTagsWithCount(): { tag: string; count: number }[] {
  const posts = getAllPostsMeta()
  const tagCount = new Map<string, number>()

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCount.set(tag, (tagCount.get(tag) || 0) + 1)
    })
  })

  return Array.from(tagCount.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
}

// Get categories with count
export function getCategoriesWithCount(): { category: string; count: number }[] {
  const posts = getAllPostsMeta()
  const categoryCount = new Map<string, number>()

  posts.forEach((post) => {
    categoryCount.set(post.category, (categoryCount.get(post.category) || 0) + 1)
  })

  return Array.from(categoryCount.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)
}
