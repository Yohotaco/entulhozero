import type { Conversation, DBState, Listing, MaterialCategory, Message, Unit, User } from '../types'

const DEFAULT_STATE: DBState = {
  version: 1,
  users: {},
  listings: {},
  conversations: {},
  messages: {},
}

let MEMORY_STATE: DBState = structuredClone(DEFAULT_STATE)
let CURRENT_USER_ID: string | null = null

function now() {
  return Date.now()
}

function id() {
  return crypto.randomUUID()
}

function getState(): DBState {
  return MEMORY_STATE
}

function setState(next: DBState) {
  MEMORY_STATE = next
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('entulhozero:dbchange'))
  }
}

export function getOrCreateCurrentUser(): User {
  const state = getState()
  if (CURRENT_USER_ID && state.users[CURRENT_USER_ID]) return state.users[CURRENT_USER_ID]

  const user: User = { id: id(), name: 'Visitante', createdAt: now() }
  state.users[user.id] = user
  CURRENT_USER_ID = user.id
  setState(state)
  return user
}

export function setCurrentUserName(name: string) {
  const state = getState()
  if (!CURRENT_USER_ID) return
  const user = state.users[CURRENT_USER_ID]
  if (!user) return
  state.users[CURRENT_USER_ID] = { ...user, name }
  setState(state)
}

export function seedIfEmpty() {
  const state = getState()
  if (Object.keys(state.listings).length > 0) return

  const alice: User = { id: id(), name: 'Alice (Anunciante)', createdAt: now() - 1000 * 60 * 60 * 24 }
  const bob: User = { id: id(), name: 'Bruno (Anunciante)', createdAt: now() - 1000 * 60 * 60 * 12 }
  state.users[alice.id] = alice
  state.users[bob.id] = bob

  const l1: Listing = {
    id: id(),
    title: 'Telhas cerâmicas (sobraram da obra)',
    description: 'Tenho 12 telhas cerâmicas em bom estado. Retirada no local.',
    category: 'telha',
    quantity: 12,
    unit: 'un',
    neighborhood: 'Praia do Canto',
    city: 'Vitória',
    expiresAt: now() + 1000 * 60 * 60 * 24 * 5,
    status: 'open',
    createdAt: now() - 1000 * 60 * 25,
    ownerId: alice.id,
  }

  const l2: Listing = {
    id: id(),
    title: 'Madeira (resto de caibro e tábua)',
    description: 'Resto de madeira de reforma. Dá pra reaproveitar fácil.',
    category: 'madeira',
    quantity: 25,
    unit: 'kg',
    neighborhood: 'Jardim Camburi',
    city: 'Vitória',
    expiresAt: now() + 1000 * 60 * 60 * 24 * 2,
    status: 'open',
    createdAt: now() - 1000 * 60 * 50,
    ownerId: bob.id,
  }

  state.listings[l1.id] = l1
  state.listings[l2.id] = l2

  setState(state)
}

export function listListings(): Listing[] {
  const state = getState()
  const listings = Object.values(state.listings)
  return listings
    .map((l) => normalizeListing(l))
    .sort((a, b) => b.createdAt - a.createdAt)
}

export function getListing(listingId: string): Listing | null {
  const state = getState()
  const listing = state.listings[listingId]
  return listing ? normalizeListing(listing) : null
}

export function createListing(input: {
  title: string
  description: string
  category: MaterialCategory
  quantity: number
  unit: Unit
  neighborhood: string
  city: string
  expiresAt: number
  ownerId: string
}): Listing {
  const state = getState()
  const listing: Listing = {
    id: id(),
    title: input.title,
    description: input.description,
    category: input.category,
    quantity: input.quantity,
    unit: input.unit,
    neighborhood: input.neighborhood,
    city: input.city,
    expiresAt: input.expiresAt,
    status: 'open',
    createdAt: now(),
    ownerId: input.ownerId,
  }
  state.listings[listing.id] = listing
  setState(state)
  return listing
}

export function getUser(userId: string): User | null {
  const state = getState()
  return state.users[userId] ?? null
}

export function ensureConversation(listingId: string, a: string, b: string): Conversation {
  const state = getState()
  const existing = Object.values(state.conversations).find((c) => {
    if (c.listingId !== listingId) return false
    const set = new Set(c.participantIds)
    return set.has(a) && set.has(b) && c.participantIds.length === 2
  })
  if (existing) return existing

  const conv: Conversation = {
    id: id(),
    listingId,
    participantIds: [a, b],
    createdAt: now(),
    lastMessageAt: now(),
  }
  state.conversations[conv.id] = conv
  setState(state)
  return conv
}

export function listConversationsForUser(userId: string): Conversation[] {
  const state = getState()
  return Object.values(state.conversations)
    .filter((c) => c.participantIds.includes(userId))
    .sort((a, b) => b.lastMessageAt - a.lastMessageAt)
}

export function listMessages(conversationId: string): Message[] {
  const state = getState()
  return Object.values(state.messages)
    .filter((m) => m.conversationId === conversationId)
    .sort((a, b) => a.createdAt - b.createdAt)
}

export function sendMessage(conversationId: string, senderId: string, text: string): Message {
  const state = getState()
  const msg: Message = { id: id(), conversationId, senderId, text, createdAt: now() }
  state.messages[msg.id] = msg

  const conv = state.conversations[conversationId]
  if (conv) state.conversations[conversationId] = { ...conv, lastMessageAt: msg.createdAt }

  setState(state)
  return msg
}

export function deleteListing(listingId: string) {
  const state = getState()
  if (!state.listings[listingId]) return

  delete state.listings[listingId]

  const convosToDelete = Object.values(state.conversations)
    .filter((c) => c.listingId === listingId)
    .map((c) => c.id)

  for (const convoId of convosToDelete) {
    delete state.conversations[convoId]
    for (const msg of Object.values(state.messages)) {
      if (msg.conversationId === convoId) delete state.messages[msg.id]
    }
  }

  setState(state)
}

function normalizeListing(listing: Listing): Listing {
  if (listing.status === 'closed') return listing
  if (listing.status === 'expired') return listing
  if (listing.expiresAt <= now()) return { ...listing, status: 'expired' }
  return listing
}

