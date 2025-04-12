import type { Access } from 'payload'

export const superAdminOrPublished: Access = ({ req: { user } }) => {
  if (user && user.roles?.includes('superadmin')) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}
