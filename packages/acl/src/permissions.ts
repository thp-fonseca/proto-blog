import { AbilityBuilder } from '@casl/ability'

import { AppAbility } from './'
import { User } from './models/user'
import { Role } from './roles'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN(_, { can }) {
    can('manage', 'all')
  },
  MEMBER(user, { can }) {
    can('get', 'User')
    can(['create', 'get'], 'Post')
    can(['update', 'delete'], 'Post', { ownerId: { $eq: user.id } })
    can(['create', 'get'], 'Comment')
    can(['update', 'delete'], 'Comment', { ownerId: { $eq: user.id } })
    can('delete', 'Comment', { post: { ownerId: user.id } })
  },
}
