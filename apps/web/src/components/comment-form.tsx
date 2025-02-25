"use client";

import { useState } from "react";
import { Button } from "@workspace/ui/components/button";

export function CommentForm({ onSubmit }: Readonly<{ onSubmit: (param: string) => void }>) {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment);
      setComment("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        className="w-full p-2 border rounded-md"
        rows={4}
        name="content"
        placeholder="Comment here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button type="submit" variant="outline">
        Send
      </Button>
    </form>
  );
}