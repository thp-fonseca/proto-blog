
import { Avatar, AvatarImage, AvatarFallback } from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { Card, CardHeader, CardContent, CardFooter } from "@workspace/ui/components/card"
import { Heart, MessageCircle, Share2 } from "lucide-react"

const posts = [
  {
    id: 1,
    author: {
      name: "John Doe",
      avatar: "/avatars/01.png",
    },
    content: "Just finished a great workout! 💪 #FitnessJourney",
    likes: 15,
    comments: 3,
  },
  {
    id: 2,
    author: {
      name: "Jane Smith",
      avatar: "/avatars/02.png",
    },
    content: "Excited to announce my new project! Stay tuned for more details. 🚀",
    likes: 32,
    comments: 8,
  },
  // Add more posts as needed
]

export function FeedList() {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p>{post.content}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" size="sm">
              <Heart className="w-4 h-4 mr-2" />
              {post.likes}
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircle className="w-4 h-4 mr-2" />
              {post.comments}
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

