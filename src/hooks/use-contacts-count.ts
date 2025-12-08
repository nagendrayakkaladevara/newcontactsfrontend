/**
 * useContactsCount Hook
 * Custom React hook for fetching total contacts count
 */

import { useState, useEffect, useCallback } from "react"
import { contactsService } from "@/services/contacts.service"
import { ApiError } from "@/lib/api-client"

interface UseContactsCountReturn {
  count: number | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

/**
 * Hook for fetching contacts count
 */
export function useContactsCount(
  autoFetch: boolean = true
): UseContactsCountReturn {
  const [count, setCount] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(autoFetch)
  const [error, setError] = useState<string | null>(null)

  const fetchCount = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const totalCount = await contactsService.getContactsCount()
      setCount(totalCount)
    } catch (err) {
      const errorMessage =
        err instanceof ApiError
          ? err.message
          : "Failed to fetch contacts count. Please try again."
      setError(errorMessage)
      setCount(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (autoFetch) {
      fetchCount()
    }
  }, [fetchCount, autoFetch])

  const refetch = useCallback(async () => {
    await fetchCount()
  }, [fetchCount])

  return {
    count,
    loading,
    error,
    refetch,
  }
}



