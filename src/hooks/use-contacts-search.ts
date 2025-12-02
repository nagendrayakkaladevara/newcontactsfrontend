/**
 * useContactsSearch Hook
 * Custom React hook for searching contacts by name or phone
 */

import { useState, useCallback } from "react"
import { contactsService } from "@/services/contacts.service"
import type { Contact, PaginatedContactsResponse } from "@/types/contact"
import { ApiError } from "@/lib/api-client"
import { z } from "zod"

// Zod schemas for validation
const nameSearchSchema = z.object({
  query: z
    .string()
    .min(1, "Search query is required")
    .max(100, "Search query must be less than 100 characters")
    .regex(/^[a-zA-Z0-9\s\-'.,]+$/, "Invalid characters in search query"),
})

const phoneSearchSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required")
    .max(20, "Phone number must be less than 20 characters")
    .regex(/^[0-9+\-\s()]+$/, "Invalid phone number format"),
})

interface UseContactsSearchReturn {
  contacts: Contact[]
  loading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  } | null
  searchByName: (query: string, page?: number) => Promise<void>
  searchByPhone: (phone: string) => Promise<void>
  clearResults: () => void
}

/**
 * Hook for searching contacts
 */
export function useContactsSearch(): UseContactsSearchReturn {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<UseContactsSearchReturn["pagination"]>(
    null
  )

  const searchByName = useCallback(async (query: string, page: number = 1) => {
    setLoading(true)
    setError(null)

    try {
      // Validate input with Zod
      const validated = nameSearchSchema.parse({ query })
      
      const response: PaginatedContactsResponse =
        await contactsService.searchByName(validated.query, page, 50)

      setContacts(response.data)
      setPagination({
        page: response.pagination.page,
        limit: response.pagination.limit,
        total: response.pagination.total,
        totalPages: response.pagination.totalPages,
      })
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message)
      } else if (err instanceof ApiError) {
        setError(err.message)
      } else {
        setError("Failed to search contacts. Please try again.")
      }
      setContacts([])
      setPagination(null)
    } finally {
      setLoading(false)
    }
  }, [])

  const searchByPhone = useCallback(async (phone: string) => {
    setLoading(true)
    setError(null)

    try {
      // Validate input with Zod
      const validated = phoneSearchSchema.parse({ phone })
      
      const contact: Contact = await contactsService.searchByPhone(validated.phone)

      // Convert single contact to array format for consistent display
      setContacts([contact])
      setPagination({
        page: 1,
        limit: 1,
        total: 1,
        totalPages: 1,
      })
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message)
      } else if (err instanceof ApiError) {
        if (err.status === 404) {
          setError("Contact not found")
        } else {
          setError(err.message)
        }
      } else {
        setError("Failed to search contacts. Please try again.")
      }
      setContacts([])
      setPagination(null)
    } finally {
      setLoading(false)
    }
  }, [])

  const clearResults = useCallback(() => {
    setContacts([])
    setError(null)
    setPagination(null)
  }, [])

  return {
    contacts,
    loading,
    error,
    pagination,
    searchByName,
    searchByPhone,
    clearResults,
  }
}

