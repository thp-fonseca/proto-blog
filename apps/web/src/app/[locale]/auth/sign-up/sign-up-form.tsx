'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useFormState } from '@/hooks/use-form-state'

import { signUpAction } from './actions'
import { Alert, AlertTitle, AlertDescription } from '@workspace/ui/components/alert'
import { Button } from '@workspace/ui/components/button'
import { Input } from '@workspace/ui/components/input'
import { Label } from '@workspace/ui/components/label'

export function SignUpForm() {
  const router = useRouter()

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    signUpAction,
    () => {
      router.push('/auth/sign-in')
    },
  )

  return (
    <div className='flex items-center justify-center p-4 lg:p-8'>
      <div className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {success === false && message && (
            <Alert variant="destructive">
              <AlertTriangle className="size-4" />
              <AlertTitle>Sign up failed!</AlertTitle>
              <AlertDescription>
                <p>{message}</p>
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input name="name" id="name" />

            {errors?.name && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.name[0]}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">E-mail</Label>
            <Input name="username" type="email" id="email" />

            {errors?.email && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.email[0]}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input name="password" type="password" id="password" />

            {errors?.password && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.password[0]}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="password_confirmation">Confirm your password</Label>
            <Input
              name="password_confirmation"
              type="password"
              id="password_confirmation"
            />

            {errors?.password_confirmation && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.password_confirmation[0]}
              </p>
            )}
          </div>

          <Button variant="secondary" className="w-full hover:bg-gray-700" type="submit" disabled={isPending}>
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              'Create account'
            )}
          </Button>

          <Button className="w-full" variant="link" size="sm" asChild>
            <Link href="/auth/sign-in">Already registered? Sign In</Link>
          </Button>
        </form>
      </div>
    </div>
  )
}
