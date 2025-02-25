import { api } from "./api-client";

interface CreateCommentPostRequest {
  content: string;
  postId: unknown;
}

export async function createCommentPost({
  content,
  postId,
}: CreateCommentPostRequest): Promise<void> {
  await api.post(`posts/${postId}/comments`, {
    json: {
      content,
    },
  });
}
