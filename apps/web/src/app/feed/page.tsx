import { Card, CardContent, CardFooter, CardHeader } from '@workspace/ui/components/card'
import { Button } from '@workspace/ui/components/button'
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar'
import PostForm from '@/components/post-form'

export default function FeedPage() {
  return (
    <div className="space-y-8">
      <PostForm />
      <Card>
        <CardHeader className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">User Name</h3>
            <p className="text-sm text-muted-foreground">2 hours ago</p>
          </div>
        </CardHeader>
        <CardContent>
          <p>This is a sample post content. Replace this with actual post data from your API.</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost">Like</Button>
          <Button variant="ghost">Comment</Button>
          <Button variant="ghost">Share</Button>
        </CardFooter>
      </Card>
      {/* Add more post cards here */}
    </div>
  )
}
