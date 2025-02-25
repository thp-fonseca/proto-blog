"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@workspace/ui/components/card";
import { Heart, MessageCircle, Share2, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { getPosts } from "@/http/get-posts";
import { useEffect, useState } from "react";
import { deletePost } from "@/http/delete-post";
import { useRouter } from "next/navigation";

export function FeedList({
  permissions,
}: Readonly<{ permissions: { canDeletePost: boolean } }>) {
  const [showCommentForm, setShowCommentForm] = useState<string | null>(null);
  const { canDeletePost } = permissions;
  const router = useRouter();

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: getPosts,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.data.length === 0) {
          return undefined;
        }
        return lastPageParam + 1;
      },
    });

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleDeletePost = async (postId: string) => {
    await deletePost({ postId });
  };

  if (error) return <div>Error loading posts: {error.message}</div>;

  return (
    <div className="space-y-6">
      {data?.pages.map((page) =>
        page.data.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src={post.author.avatar}
                    alt={post.author.name}
                  />
                  <AvatarFallback>
                    {post.author.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{post.author.name}</p>
                  <p className="font-semibold">{post.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="cursor-auto w-full" onClick={() => router.push(`/post/${post.id}/comments`)}>
              <p>{post.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                {post.likes}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setShowCommentForm(
                    showCommentForm === post.id ? null : post.id
                  )
                }
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {post.comments}
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              {canDeletePost && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeletePost(post.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              )}
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}
