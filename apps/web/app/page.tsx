import { Button } from '@workspace/ui/components/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card'
import { Input } from '@workspace/ui/components/input'
import { Label } from '@workspace/ui/components/label'

export default function LoginPage() {
  console.log('LoginPage', process.env.NEXT_PUBLIC_API_URL)
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Login</Button>
      </CardFooter>
    </Card>
  )
}
