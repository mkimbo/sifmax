import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type isAuthenticated = (args: AccessArgs<User>) => boolean

export const anyAdmin: isAuthenticated = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes('sifmax_admin') || user?.roles?.includes('superadmin'))
}
