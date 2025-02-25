"use server";

import { HTTPError } from "ky";
import { z } from "zod";

import { createPost } from "@/http/create-post";

const createPostSchema = z.object({
  title: z.string().min(3, { message: "Please, provide a title" }),
  content: z.string().min(1, { message: "Please, provide a content." }),
});

export async function createPostForm(data: FormData) {
  const result = createPostSchema.safeParse(Object.fromEntries(data));

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    return { success: false, message: null, errors };
  }

  const { content, title } = result.data;
  try {
    await createPost({
      content,
      title,
    });
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json();
      return { success: false, message, errors: null };
    }

    return {
      success: false,
      message: "Unexpected error, try again in a few minutes.",
      errors: null,
    };
  }

  return { success: true, message: null, errors: null };
}
