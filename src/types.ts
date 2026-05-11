export type MaterialCategory =
  | 'telha'
  | 'tijolo'
  | 'madeira'
  | 'ferro'
  | 'cimento'
  | 'tinta'
  | 'pvc'
  | 'vidro'
  | 'outro'

export type Unit = 'un' | 'kg' | 'm²' | 'm³'

export type ListingStatus = 'open' | 'reserved' | 'closed' | 'expired'

export type User = {
  id: string
  name: string
  createdAt: number
}

export type Listing = {
  id: string
  title: string
  description: string
  category: MaterialCategory
  quantity: number
  unit: Unit
  neighborhood: string
  city: string
  expiresAt: number
  status: ListingStatus
  createdAt: number
  ownerId: string
}

export type Conversation = {
  id: string
  listingId: string
  participantIds: string[]
  createdAt: number
  lastMessageAt: number
}

export type Message = {
  id: string
  conversationId: string
  senderId: string
  text: string
  createdAt: number
}

export type DBState = {
  version: 1
  users: Record<string, User>
  listings: Record<string, Listing>
  conversations: Record<string, Conversation>
  messages: Record<string, Message>
}

