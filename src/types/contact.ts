/**
 * Contact entity type definition
 */
export interface Contact {
  id: string
  name: string
  phone?: string
  address?: string
  notes?: string
  favorite?: boolean
  group?: string
  bloodGroup?: string
  lobby?: string
  designation?: string
  createdAt?: string
  updatedAt?: string
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

/**
 * Paginated contacts response
 */
export interface PaginatedContactsResponse {
  success: boolean
  data: Contact[]
  pagination: PaginationMeta
}

/**
 * Contacts count response
 */
export interface ContactsCountResponse {
  success: boolean
  count: number
}

/**
 * API error response
 */
export interface ApiErrorResponse {
  success: false
  message: string
  error?: string
}

