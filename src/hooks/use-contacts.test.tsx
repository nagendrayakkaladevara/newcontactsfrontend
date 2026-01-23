import { describe, it, expect, beforeEach, vi } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { useContacts } from "./use-contacts"
import { contactsService } from "@/services/contacts.service"
import { ApiError } from "@/lib/api-client"

vi.mock("@/services/contacts.service")

describe("useContacts", () => {
  const mockContactsService = vi.mocked(contactsService)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should fetch contacts on mount with default options", async () => {
    const mockResponse = {
      success: true,
      data: [
        { id: "1", name: "John Doe", phone: "1234567890" },
        { id: "2", name: "Jane Doe", phone: "0987654321" },
      ],
      pagination: {
        page: 1,
        limit: 50,
        total: 2,
        totalPages: 1,
      },
    }

    mockContactsService.getAllContacts.mockResolvedValueOnce(mockResponse)

    const { result } = renderHook(() => useContacts())

    expect(result.current.loading).toBe(true)
    expect(result.current.contacts).toEqual([])

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.contacts).toEqual(mockResponse.data)
    expect(result.current.pagination).toEqual(mockResponse.pagination)
    expect(result.current.error).toBeNull()
    expect(mockContactsService.getAllContacts).toHaveBeenCalledWith(1, 50)
  })

  it("should not fetch contacts when autoFetch is false", async () => {
    const { result } = renderHook(() =>
      useContacts({ autoFetch: false })
    )

    expect(result.current.loading).toBe(false)
    expect(result.current.contacts).toEqual([])
    expect(mockContactsService.getAllContacts).not.toHaveBeenCalled()
  })

  it("should handle custom page and limit", async () => {
    const mockResponse = {
      success: true,
      data: [],
      pagination: {
        page: 2,
        limit: 25,
        total: 100,
        totalPages: 4,
      },
    }

    mockContactsService.getAllContacts.mockResolvedValueOnce(mockResponse)

    const { result } = renderHook(() =>
      useContacts({ page: 2, limit: 25 })
    )

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(mockContactsService.getAllContacts).toHaveBeenCalledWith(2, 25)
    expect(result.current.pagination?.page).toBe(2)
    expect(result.current.pagination?.limit).toBe(25)
  })

  it("should handle errors", async () => {
    const error = new ApiError("Failed to fetch", 500)
    mockContactsService.getAllContacts.mockRejectedValueOnce(error)

    const { result } = renderHook(() => useContacts())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe("Failed to fetch")
    expect(result.current.contacts).toEqual([])
    expect(result.current.pagination).toBeNull()
  })

  it("should handle non-ApiError errors", async () => {
    const error = new Error("Network error")
    mockContactsService.getAllContacts.mockRejectedValueOnce(error)

    const { result } = renderHook(() => useContacts())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe(
      "Failed to fetch contacts. Please try again."
    )
  })

  it("should refetch contacts", async () => {
    const mockResponse1 = {
      success: true,
      data: [{ id: "1", name: "John" }],
      pagination: {
        page: 1,
        limit: 50,
        total: 1,
        totalPages: 1,
      },
    }

    const mockResponse2 = {
      success: true,
      data: [
        { id: "1", name: "John" },
        { id: "2", name: "Jane" },
      ],
      pagination: {
        page: 1,
        limit: 50,
        total: 2,
        totalPages: 1,
      },
    }

    mockContactsService.getAllContacts
      .mockResolvedValueOnce(mockResponse1)
      .mockResolvedValueOnce(mockResponse2)

    const { result } = renderHook(() => useContacts({ autoFetch: false }))

    await result.current.refetch()

    await waitFor(() => {
      expect(result.current.contacts).toEqual(mockResponse1.data)
    })

    await result.current.refetch()

    await waitFor(() => {
      expect(result.current.contacts).toEqual(mockResponse2.data)
    })
  })

  it("should update page and refetch", async () => {
    const mockResponse1 = {
      success: true,
      data: [],
      pagination: {
        page: 1,
        limit: 50,
        total: 100,
        totalPages: 2,
      },
    }

    const mockResponse2 = {
      success: true,
      data: [],
      pagination: {
        page: 2,
        limit: 50,
        total: 100,
        totalPages: 2,
      },
    }

    mockContactsService.getAllContacts
      .mockResolvedValueOnce(mockResponse1)
      .mockResolvedValueOnce(mockResponse2)

    const { result } = renderHook(() => useContacts())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    result.current.setPage(2)

    await waitFor(() => {
      expect(mockContactsService.getAllContacts).toHaveBeenCalledWith(2, 50)
    })
  })

  it("should update limit and refetch", async () => {
    const mockResponse1 = {
      success: true,
      data: [],
      pagination: {
        page: 1,
        limit: 50,
        total: 100,
        totalPages: 2,
      },
    }

    const mockResponse2 = {
      success: true,
      data: [],
      pagination: {
        page: 1,
        limit: 25,
        total: 100,
        totalPages: 4,
      },
    }

    mockContactsService.getAllContacts
      .mockResolvedValueOnce(mockResponse1)
      .mockResolvedValueOnce(mockResponse2)

    const { result } = renderHook(() => useContacts())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    result.current.setLimit(25)

    await waitFor(() => {
      expect(mockContactsService.getAllContacts).toHaveBeenCalledWith(1, 25)
    })
  })
})

