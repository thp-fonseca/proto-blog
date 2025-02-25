"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPostComments } from "@/http/get-post-comments";
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
import { CommentForm } from "@/components/comment-form";
import { formatDistanceToNow } from "date-fns";
import { createCommentPost } from "@/http/create-comment-post";
import { Heart, Trash2 } from "lucide-react";
import { deleteComment } from "@/http/delete-comment";
import { ConfirmDialog } from "@/components/confirm-dialog";
import useUserSession from "@/lib/store";

export default function PostComments() {
  const { user } = useUserSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { postId } = useParams();

  const { permissions } = user ?? {};
  const canDeleteComment = permissions?.can("delete", "Comment");
  console.log(canDeleteComment, user)
  const { data, error } = useQuery({
    queryKey: ["postComments", postId],
    queryFn: () => getPostComments({ postId }),
    enabled: !!postId,
  });

  if (error) return <div>Error loading comments: {error.message}</div>;

  const handleCommentSubmit = async (comment: string) => {
    createCommentPost({
      postId,
      content: comment,
    }).then(() => {
      queryClient.invalidateQueries({
        queryKey: ["postComments", postId],
      });
    });
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment({ commentId, postId });
      queryClient.invalidateQueries({
        queryKey: ["postComments", postId],
      });
    } catch (error) {
      console.error("Erro ao excluir comentário:", error);
    }
  };

  return (
    <div className="space-y-6">
      <Button onClick={() => router.back()} variant="ghost" size="sm">
        Voltar
      </Button>
      {data?.post && (
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  src={data.post.author.avatar}
                  alt={data.post.author.name}
                />
                <AvatarFallback>
                  {data.post.author.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{data.post.author.name}</p>
                <p className="font-semibold">{data.post.title}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(data.post.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p>{data.post.content}</p>
          </CardContent>
          <CardFooter>
            <CommentForm onSubmit={handleCommentSubmit} />
          </CardFooter>
        </Card>
      )}
      {data?.comments.map((comment) => (
        <Card key={comment.id}>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  src={comment.author.avatar}
                  alt={comment.author.name}
                />
                <AvatarFallback>
                  {comment.author.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{comment.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p>{comment.content}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" size="sm">
              <Heart className="w-4 h-4 mr-2" />
              {comment.likes}
            </Button>
            {canDeleteComment && (
              <ConfirmDialog
                trigger={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                  </Button>
                }
                title="Confirmar Exclusão"
                description="Tem certeza que deseja excluir este comentário? Esta ação não pode ser desfeita."
                onConfirm={() => handleDeleteComment(comment.id)}
              />
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
