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
  author: string[]
}>

export type BlogListResponse = ListContentsResponse<BlogResponse>

export type CategoryListResponse = ListContentsResponse<CategoryResponse>

export type Profile = {
  name: string
  title: string
  description: string
  profileImageId: string
}

export const nancy: Profile = {
  name: 'なんしー',
  title: 'プログラマー',
  description:
    '2021年に五島列島の福江島に夫婦で移住し、島で出会った犬と暮らしている。\n趣味はSUP、釣り、キャンプ、スイーツ巡り。',
  profileImageId: 'e84e0262a3b543d38085143281b2360e',
}

export const mado: Profile = {
  name: 'madoka♡',
  title: '釣り人',
  description:
    '美味しいお魚をたくさん釣りたい。\n上手にお魚さばけるようになりたい。\nお魚の種類覚えたい。',
  profileImageId: '86c7f6dfb49f48d69152654ad66ef5b8',
}
