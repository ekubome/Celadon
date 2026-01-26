import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'

export interface TocItem {
  id: string
  text: string
  level: number
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: {
        className: ['anchor-link'],
      },
    })
    .use(rehypePrettyCode, {
      theme: 'github-dark',
      keepBackground: true,
      defaultLang: 'plaintext',
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown)

  return result.toString()
}

/**
 * Generate a slug matching github-slugger (used by rehype-slug)
 * Algorithm: lowercase, replace spaces with hyphens, remove non-alphanumeric except hyphens and CJK
 */
function githubSlug(text: string, existingSlugs: Set<string>): string {
  let slug = text
    .toLowerCase()
    .trim()
    // Replace spaces with hyphens
    .replace(/\s+/g, '-')
    // Remove characters that are not alphanumeric, hyphens, underscores, or CJK
    .replace(/[^\p{L}\p{N}\-_]/gu, '')
    // Remove consecutive hyphens
    .replace(/-+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-|-$/g, '')

  // Handle duplicates by appending -1, -2, etc.
  const originalSlug = slug
  let counter = 1
  while (existingSlugs.has(slug)) {
    slug = `${originalSlug}-${counter}`
    counter++
  }
  existingSlugs.add(slug)

  return slug
}

export function extractTableOfContents(markdown: string): TocItem[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm
  const toc: TocItem[] = []
  const existingSlugs = new Set<string>()
  let match

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = githubSlug(text, existingSlugs)

    toc.push({ id, text, level })
  }

  return toc
}
