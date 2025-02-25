import { api } from "./api-client";

export interface GetPostCommentsResponse {
  post: {
    id: string;
    title: string;
    content: string;
    author: {
      avatar: string;
      name: string;
    };
    createdAt: string;
  };
  comments: {
    id: string;
    author: {
      avatar: string;
      name: string;
    };
    likes: number;
    content: string;
    createdAt: string;
  }[];
}

export async function getPostComments({ postId }: { postId: unknown }) {
  const result = await api
    .get(`posts/${postId}/comments`)
    .json<GetPostCommentsResponse>();

  return result;
}
