import { ClientUser, PayloadRequest } from 'payload'

export const superAdminCollection = (args: { user: ClientUser | PayloadRequest['user'] }) => {
  if (!args.user || !args.user.roles) {
    return true
  }
  return !args.user.roles.includes('superadmin')
}
