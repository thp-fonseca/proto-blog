import { api } from "./api-client";

interface DeletePostRequest {
  postId: string;
}

export async function deletePost({
  postId,
}: DeletePostRequest): Promise<void> {
  await api.delete(`posts/${postId}`);
}
