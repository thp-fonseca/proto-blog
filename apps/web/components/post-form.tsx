import { Button } from '@workspace/ui/components/button'
import { Card, CardContent, CardFooter } from '@workspace/ui/components/card'
import { Textarea } from '@workspace/ui/components/textarea'

export default function PostForm() {
  return (
    <Card>
      <CardContent className="pt-4">
        <Textarea placeholder="What's on your mind?" />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Post</Button>
      </CardFooter>
    </Card>
  )
}
