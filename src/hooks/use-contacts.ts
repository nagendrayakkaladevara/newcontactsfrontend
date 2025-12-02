/**
 * useContacts Hook
 * Custom React hook for fetching and managing contacts with pagination
 */

import { useState, useEffect, useCallback } from "react"
import { contactsService } from "@/services/contacts.service"
import type { Contact, PaginatedContactsResponse } from "@/types/contact"
import { ApiError } from "@/lib/api-client"

interface UseContactsOptions {
  page?: number
  limit?: number
  autoFetch?: boolean
}

interface UseContactsReturn {
  contacts: Contact[]
  loading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  } | null
  refetch: () => Promise<void>
  setPage: (page: number) => void
  setLimit: (limit: number) => void
}

/**
 * Hook for fetching paginated contacts
 */
export function useContacts(
  options: UseContactsOptions = {}
): UseContactsReturn {
  const { page: initialPage = 1, limit: initialLimit = 50, autoFetch = true } =
    options

  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState<boolean>(autoFetch)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<UseContactsReturn["pagination"]>(
    null
  )
  const [page, setPage] = useState<number>(initialPage)
  const [limit, setLimit] = useState<number>(initialLimit)

  const fetchContacts = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response: PaginatedContactsResponse =
        await contactsService.getAllContacts(page, limit)

      setContacts(response.data)
      setPagination({
        page: response.pagination.page,
        limit: response.pagination.limit,
        total: response.pagination.total,
        totalPages: response.pagination.totalPages,
      })
    } catch (err) {
      const errorMessage =
        err instanceof ApiError
          ? err.message
          : "Failed to fetch contacts. Please try again."
      setError(errorMessage)
      setContacts([])
      setPagination(null)
    } finally {
      setLoading(false)
    }
  }, [page, limit])

  useEffect(() => {
    if (autoFetch) {
      fetchContacts()
    }
  }, [fetchContacts, autoFetch])

  const refetch = useCallback(async () => {
    await fetchContacts()
  }, [fetchContacts])

  return {
    contacts,
    loading,
    error,
    pagination,
    refetch,
    setPage,
    setLimit,
  }
}

