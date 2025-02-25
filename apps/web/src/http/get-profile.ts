import { RoleEnum } from '@workspace/acl'
import { api } from './api-client'

interface GetProfileResponse {
  user: {
    id: string
    name: string | null
    email: string
    role: RoleEnum
    avatarUrl: string | null
  }
}

export async function getProfile() {
  const result = await api.get('users/profile').json<GetProfileResponse>()

  return result
}
