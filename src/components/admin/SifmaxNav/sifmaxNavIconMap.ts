import { CollectionSlug, GlobalSlug } from 'payload' // Use types from payload/types
import {
  BadgePercent, // Alternative for DiscountCodes
  BookCopy,
  CalendarClock, // For Appointments
  FileText, // For Pages / Posts
  FolderTree, // For Categories
  Footprints,
  Image,
  LayoutGrid, // Could be Posts or Dashboard Grid
  List,
  LucideProps,
  Menu,
  MessageSquare, // For Forms/Submissions
  Scissors, // For Services
  Search, // For Search global/view
  Settings, // For Settings global?
  Smile,
  StickyNote,
  TabletSmartphone,
  Users, // For Customers & Users
  Link as LinkIcon, // For Redirects
} from 'lucide-react'
import React from 'react' // Import React for ExoticComponent type

// Define the type for Lucide icon components more explicitly
type LucideIcon = React.ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
>

// Using Sifmax specific slugs and relevant icons
export const sifmaxNavIconMap: Partial<
  Record<CollectionSlug | GlobalSlug | 'dashboard', LucideIcon>
> = {
  // Core Sifmax
  appointments: CalendarClock,
  customers: Users,
  services: Scissors,

  // Website Content (Example)
  pages: StickyNote,
  posts: FileText, // Or LayoutGrid if preferred
  categories: FolderTree,
  media: Image,

  // Admin / Other (From your screenshot)
  users: Users,
  forms: MessageSquare,
  'form-submissions': BookCopy, // Assuming this is the slug
  redirects: LinkIcon,
  search: Search, // Assuming 'search' is a slug

  // Example Globals (if you had them)
  // header: Smile,
  // mainMenu: Menu,
  // footer: Footprints,

  // Special case for Dashboard
  dashboard: LayoutGrid,
}

export const getSifmaxNavIcon = (slug: string): LucideIcon | undefined => {
  const map = sifmaxNavIconMap as Record<string, LucideIcon>
  return map[slug]
}
