import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type isAuthenticated = (args: AccessArgs<User>) => boolean

export const sifmaxAdmin: isAuthenticated = ({ req: { user } }) => {
  return !!(user && user.roles && user.roles.includes('sifmax_admin'))
}
