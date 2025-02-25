"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { Textarea } from "@workspace/ui/components/textarea"
import type React from "react"

import { useState } from "react"

export function CreatePost() {
  const [content, setContent] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle post submission here
    console.log("Submitting post:", content)
    setContent("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-start space-x-4">
        <Avatar>
          <AvatarImage src="/avatars/01.png" alt="@username" />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
        <Textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-grow"
        />
      </div>
      <div className="flex justify-end">
        <Button className="bg-gray-300 hover:bg-gray-500" type="submit">Post</Button>
      </div>
    </form>
  )
}

