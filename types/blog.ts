import { ContentResponse, ListContentsResponse } from './api'
import { CategoryResponse } from './category'

export type Image = {
  url: string
  height: number
  width: number
}

export type BlogResponse = ContentResponse<{
  title: string
  description: string
  thumbnail?: Image
  body: string
  categories?: CategoryResponse[]
}>

export type BlogListResponse = ListContentsResponse<BlogResponse>

export type CategoryListResponse = ListContentsResponse<CategoryResponse>
