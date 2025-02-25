import { api } from "./api-client";

interface CreatePostRequest {
  content: string;
  title: string;
}

export async function createPost({
  content,
  title,
}: CreatePostRequest): Promise<void> {
  await api.post("posts", {
    json: {
      content,
      title,
    },
  });
}
