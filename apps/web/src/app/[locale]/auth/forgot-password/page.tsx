import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-md p-4 mx-auto">
      <form action="" className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input name="email" type="email" id="email" />
        </div>

        <Button className="w-full" type="submit">
          Recover password
        </Button>

        <Button className="w-full" variant="link" size="sm" asChild>
          <Link href="/auth/sign-in">Sign in instead</Link>
        </Button>
      </form>
    </div>
  );
}
