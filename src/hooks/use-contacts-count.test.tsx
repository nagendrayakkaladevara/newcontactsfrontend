import { describe, it, expect, beforeEach, vi } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { useContactsCount } from "./use-contacts-count"
import { contactsService } from "@/services/contacts.service"
import { ApiError } from "@/lib/api-client"

vi.mock("@/services/contacts.service")

describe("useContactsCount", () => {
  const mockContactsService = vi.mocked(contactsService)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should fetch count on mount with autoFetch true", async () => {
    mockContactsService.getContactsCount.mockResolvedValueOnce(100)

    const { result } = renderHook(() => useContactsCount())

    expect(result.current.loading).toBe(true)
    expect(result.current.count).toBeNull()

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.count).toBe(100)
    expect(result.current.error).toBeNull()
    expect(mockContactsService.getContactsCount).toHaveBeenCalledTimes(1)
  })

  it("should not fetch count when autoFetch is false", async () => {
    const { result } = renderHook(() => useContactsCount(false))

    expect(result.current.loading).toBe(false)
    expect(result.current.count).toBeNull()
    expect(mockContactsService.getContactsCount).not.toHaveBeenCalled()
  })

  it("should handle errors", async () => {
    const error = new ApiError("Failed to fetch", 500)
    mockContactsService.getContactsCount.mockRejectedValueOnce(error)

    const { result } = renderHook(() => useContactsCount())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe("Failed to fetch")
    expect(result.current.count).toBeNull()
  })

  it("should handle non-ApiError errors", async () => {
    const error = new Error("Network error")
    mockContactsService.getContactsCount.mockRejectedValueOnce(error)

    const { result } = renderHook(() => useContactsCount())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe(
      "Failed to fetch contacts count. Please try again."
    )
    expect(result.current.count).toBeNull()
  })

  it("should refetch count", async () => {
    mockContactsService.getContactsCount
      .mockResolvedValueOnce(100)
      .mockResolvedValueOnce(150)

    const { result } = renderHook(() => useContactsCount(false))

    await result.current.refetch()

    await waitFor(() => {
      expect(result.current.count).toBe(100)
    })

    await result.current.refetch()

    await waitFor(() => {
      expect(result.current.count).toBe(150)
    })

    expect(mockContactsService.getContactsCount).toHaveBeenCalledTimes(2)
  })

  it("should handle zero count", async () => {
    mockContactsService.getContactsCount.mockResolvedValueOnce(0)

    const { result } = renderHook(() => useContactsCount())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.count).toBe(0)
    })
  })
})

