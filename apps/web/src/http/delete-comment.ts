import { api } from "./api-client";

interface DeleteCommentRequest {
  postId: unknown;
  commentId: string;
}

export async function deleteComment({
  postId,
  commentId
}: DeleteCommentRequest): Promise<void> {
  await api.delete(`posts/${postId}/comments/${commentId}`);
}
