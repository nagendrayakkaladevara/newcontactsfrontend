import { describe, it, expect, beforeEach, vi } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { useVisitCount } from "./use-visit-count"
import { analyticsService } from "@/services/analytics.service"
import { ApiError } from "@/lib/api-client"

vi.mock("@/services/analytics.service")

describe("useVisitCount", () => {
  const mockAnalyticsService = vi.mocked(analyticsService)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should increment and fetch count on mount with defaults", async () => {
    mockAnalyticsService.incrementVisitCount.mockResolvedValueOnce(100)

    const { result } = renderHook(() => useVisitCount())

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.visitCount).toBe(100)
    expect(result.current.error).toBeNull()
    expect(mockAnalyticsService.incrementVisitCount).toHaveBeenCalledTimes(1)
  })

  it("should only fetch count when autoIncrement is false", async () => {
    mockAnalyticsService.getVisitCount.mockResolvedValueOnce(99)

    const { result } = renderHook(() =>
      useVisitCount(false, true)
    )

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.visitCount).toBe(99)
    expect(mockAnalyticsService.incrementVisitCount).not.toHaveBeenCalled()
    expect(mockAnalyticsService.getVisitCount).toHaveBeenCalledTimes(1)
  })

  it("should not fetch when both autoIncrement and autoFetch are false", async () => {
    const { result } = renderHook(() =>
      useVisitCount(false, false)
    )

    expect(result.current.loading).toBe(false)
    expect(result.current.visitCount).toBeNull()
    expect(mockAnalyticsService.incrementVisitCount).not.toHaveBeenCalled()
    expect(mockAnalyticsService.getVisitCount).not.toHaveBeenCalled()
  })

    it("should handle increment errors", async () => {
      const error = new ApiError("Failed to increment", 500)
      mockAnalyticsService.incrementVisitCount.mockRejectedValueOnce(error)

      const { result } = renderHook(() => useVisitCount())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
        expect(result.current.error).toBeTruthy()
      })

      // The error message from ApiError is used directly, so it might be shorter
      expect(result.current.error).toBeTruthy()
      expect(result.current.error).toMatch(/Failed to increment/)
    })

  it("should handle fetch errors", async () => {
    const error = new ApiError("Failed to fetch", 500)
    mockAnalyticsService.getVisitCount.mockRejectedValueOnce(error)

    const { result } = renderHook(() =>
      useVisitCount(false, true)
    )

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBeTruthy()
    })

    // The error message from ApiError is used directly
    expect(result.current.error).toBeTruthy()
    expect(result.current.error).toMatch(/Failed to fetch/)
    expect(result.current.visitCount).toBeNull()
  })

  it("should handle non-ApiError errors on increment", async () => {
    const error = new Error("Network error")
    mockAnalyticsService.incrementVisitCount.mockRejectedValueOnce(error)

    const { result } = renderHook(() => useVisitCount())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe(
      "Failed to increment visit count. Please try again."
    )
  })

  it("should handle non-ApiError errors on fetch", async () => {
    const error = new Error("Network error")
    mockAnalyticsService.getVisitCount.mockRejectedValueOnce(error)

    const { result } = renderHook(() =>
      useVisitCount(false, true)
    )

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe(
      "Failed to fetch visit count. Please try again."
    )
  })

  it("should refetch count", async () => {
    mockAnalyticsService.incrementVisitCount.mockResolvedValueOnce(100)
    mockAnalyticsService.getVisitCount
      .mockResolvedValueOnce(150)
      .mockResolvedValueOnce(200)

    const { result } = renderHook(() => useVisitCount())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    await result.current.refetch()

    await waitFor(() => {
      expect(result.current.visitCount).toBe(150)
    })

    await result.current.refetch()

    await waitFor(() => {
      expect(result.current.visitCount).toBe(200)
    })

    expect(mockAnalyticsService.getVisitCount).toHaveBeenCalledTimes(2)
  })

  it("should handle zero count", async () => {
    mockAnalyticsService.incrementVisitCount.mockResolvedValueOnce(0)

    const { result } = renderHook(() => useVisitCount())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.visitCount).toBe(0)
  })
})

