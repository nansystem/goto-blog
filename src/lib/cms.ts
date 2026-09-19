import { getSecret } from 'astro:env/server'
export interface Category {
  id: string
  name: string
}
export interface Post {
  id: string
  title: string
  description?: string
  body: string
  createdAt: string
  publishedAt?: string
  updatedAt: string
  thumbnail?: { url: string; width: number; height: number }
  categories?: Category[]
  author?: string[]
}
export interface List<T> {
  contents: T[]
  totalCount: number
  offset: number
  limit: number
}
export const PAGE_SIZE = 10
export class CmsError extends Error {
  constructor(public status: number) {
    super(`microCMS request failed (${status})`)
  }
}
async function request<T>(
  path: string,
  params: Record<string, string> = {},
): Promise<T> {
  const base = getSecret('BASE_API_URL')
  const key = getSecret('API_KEY')
  if (!base || !key)
    throw new Error('BASE_API_URL and API_KEY are required on the server')
  const url = new URL(`${base.replace(/\/$/, '')}/${path}`)
  url.search = new URLSearchParams(params).toString()
  const response = await fetch(url, {
    headers: { 'X-MICROCMS-API-KEY': key },
    signal: AbortSignal.timeout(10000),
  })
  if (!response.ok) throw new CmsError(response.status)
  return response.json()
}
export function getPosts(page = 1, category?: string) {
  return request<List<Post>>('blogs', {
    limit: String(PAGE_SIZE),
    offset: String((page - 1) * PAGE_SIZE),
    orders: '-publishedAt',
    ...(category ? { filters: `categories[contains]${category}` } : {}),
  })
}
export function getPost(id: string) {
  return request<Post>(`blogs/${encodeURIComponent(id)}`)
}
async function getAll<T>(endpoint: string): Promise<T[]> {
  const contents: T[] = []
  let total = Infinity
  while (contents.length < total) {
    const result = await request<List<T>>(endpoint, {
      limit: '100',
      offset: String(contents.length),
    })
    if (!result.contents.length && contents.length < result.totalCount)
      throw new Error('Incomplete microCMS response')
    contents.push(...result.contents)
    total = result.totalCount
  }
  return contents
}
export const getCategories = () => getAll<Category>('categories')
export const getAllPosts = () => getAll<Post>('blogs')
export const publishedDate = (post: Post) => post.publishedAt || post.createdAt
export const formatDate = (date: string) =>
  new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Tokyo',
  }).format(new Date(date))
export function imageUrl(url: string, width: number) {
  const image = new URL(url)
  if (image.hostname === 'images.microcms-assets.io') {
    for (const [key, value] of Object.entries({
      w: String(width),
      fm: 'webp',
      fit: 'crop',
      ar: '3:2',
    }))
      image.searchParams.set(key, value)
  }
  return image.href
}

export async function getListing(page = 1, categoryId?: string) {
  const categories = await getCategories()
  const category = categories.find((c) => c.id === categoryId)
  if (categoryId && !category) return null
  const posts = await getPosts(page, categoryId)
  const totalPages = Math.max(1, Math.ceil(posts.totalCount / PAGE_SIZE))
  if (page > totalPages) return null
  return { categories, category, posts, totalPages }
}
