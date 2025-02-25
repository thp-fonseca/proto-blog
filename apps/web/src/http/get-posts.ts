import { api } from './api-client'

const FETCH_POSTS_LIMIT = 18

export interface GetPostsResponse {
  data: {
    id: string
    content: string
    title: string
    author: {
      name: string
      avatar?: string
    },
    likes: number
    comments: number
    createdAt: string
  }[]
  total: number,
  page: number,
  lastPage: number
}

export async function getPosts({
  pageParam = 1,
}: {
  pageParam: unknown;
}) {
  const result = await api.get(`posts?page=${pageParam}&limit=${FETCH_POSTS_LIMIT}`).json<GetPostsResponse>()

  return result
}
