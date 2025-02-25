'use client';

import useFetchUserProfile from "@/hooks/use-user-profile";
import useSessionStore from '@/lib/store';

import { CreatePost } from "./create-post"
import { FeedList } from "./feed-list"
import { useEffect } from "react";

export default function FeedPage() {
  const user = useSessionStore((state) => state.user);
  const fetchUserProfile = useFetchUserProfile();

  useEffect(() => {
    if (!user) {
      fetchUserProfile();
    }
  }, [user, fetchUserProfile]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Feed</h1>
      <div className="grid gap-8">
        <section className="bg-card rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Create a Post</h2>
          <CreatePost />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
          <FeedList />
        </section>
      </div>
    </div>
  )
}
