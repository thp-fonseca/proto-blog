"use client";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import { Input } from '@workspace/ui/components/input'
import { Textarea } from "@workspace/ui/components/textarea";
import type React from "react";

import { createPostForm } from "./actions";
import { useFormState } from "@/hooks/use-form-state";
import { useQueryClient } from "@tanstack/react-query";
import useUserSession from "@/lib/store";
import { useEffect, useState } from "react";

export function CreatePost() {
  const queryClient = useQueryClient()
  const user = useUserSession.getState().user;
  const [fallback, setFallback] = useState("UN");

  useEffect(() => {
    if (user) {
      setFallback(user.name.slice(0, 2)); // Define o fallback com o nome do usuário
    }
  }, [user]);

  const [{ errors, }, handleSubmit, isPending] = useFormState(
    createPostForm,
    () => {
      queryClient.invalidateQueries({
        queryKey: [
          "posts"
        ]
      })
    }
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-start space-x-4">
        <Input
          id="title"
          placeholder="Title of your content"
          type="text"
          name="title"
          autoCapitalize="none"
          autoCorrect="on"
          required
        />
        {errors?.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title[0]}</p>
        )}
      </div>
      <div className="flex items-start space-x-4">
        <Avatar>
          <AvatarImage src="/avatars/01.png" alt="@username" />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        <Textarea
          placeholder="What's on your mind?"
          name="content"
          className="flex-grow"
          rows={5}
          required
        />
         {errors?.content && (
            <p className="mt-1 text-sm text-red-600">
              {errors.content[0]}
            </p>
          )}
      </div>
      <div className="flex justify-end">
        <Button className="bg-gray-300 hover:bg-gray-500" type="submit" disabled={isPending}>
          Post
        </Button>
      </div>
    </form>
  );
}
