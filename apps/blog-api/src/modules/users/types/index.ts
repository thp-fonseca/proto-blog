import { RoleEnum } from '@workspace/acl'

export type Profile = {
  user: {
    id: string
    role: RoleEnum
    name: string
    email: string
    avatarUrl?: string
  }
}
