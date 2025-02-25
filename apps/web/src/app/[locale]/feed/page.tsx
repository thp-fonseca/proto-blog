import useUserSession from "@/lib/store";
import { CreatePost } from "../post/create-post/create-post"
import { FeedList } from "./feed-list"
import { ability, auth } from "@/auth/auth";

export default async function FeedPage() {
  const permissions = await ability()
  const {user} = await auth()
  const canDeletePost = permissions?.can('delete', 'Post')
  const {setUser} = useUserSession();
  setUser({
    name: user.name ?? "",
    avatarUrl: user.avatarUrl,
    email: user.email,
    role: user.role,
    id: user.id,
    permissions
  })
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
          <FeedList permissions={{ canDeletePost }}/>
        </section>
      </div>
    </div>
  )
}
