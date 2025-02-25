import { api } from './api-client'

interface SignUpRequest {
  name: string
  username: string
  password: string
}

export async function signUp({
  name,
  username,
  password,
}: SignUpRequest): Promise<void> {
  await api.post('users', {
    json: {
      name,
      username,
      password,
    },
  })
}
