import { RoleEnum } from '@workspace/acl'
import { FormEvent, useState, useTransition } from 'react'
import { requestFormReset } from 'react-dom'

interface User {
  name: string
  role: RoleEnum
  email: string
  id: string
  avatarUrl: string | null
}

interface FormState {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
  user?: User | null
}

export function useFormState(
  action: (data: FormData) => Promise<FormState>,
  onSuccess?: (user: User | null) => Promise<void> | void,
  initialState?: FormState,
) {
  const [isPending, startTransition] = useTransition()

  const [formState, setFormState] = useState<FormState>(
    initialState ?? { success: false, message: null, errors: null, user: null },
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const state = await action(data)

      if (state.success && onSuccess) {
        await onSuccess(state.user ?? null)
      }
      startTransition(() => {
        setFormState(state)
        requestFormReset(form)
      })
    })
  }

  return [formState, handleSubmit, isPending] as const
}
