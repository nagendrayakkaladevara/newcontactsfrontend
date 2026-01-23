import { describe, it, expect, beforeEach, vi } from "vitest"
import { AnalyticsService } from "./analytics.service"
import { apiClient } from "@/lib/api-client"
import { API_ENDPOINTS } from "@/config/api"

vi.mock("@/lib/api-client")
vi.mock("@/config/api", async () => {
  const actual = await vi.importActual("@/config/api")
  return {
    ...actual,
    API_ENDPOINTS: {
    analytics: {
      visits: {
        increment: "/api/analytics/visits",
        get: "/api/analytics/visits",
        history: (days: number) => `/api/analytics/visits/history?days=${days}`,
      },
      overview: "/api/analytics/overview",
      bloodGroups: "/api/analytics/blood-groups",
      lobbies: "/api/analytics/lobbies",
      designations: "/api/analytics/designations",
      growth: (days: number) => `/api/analytics/growth?days=${days}`,
      recent: (limit: number) => `/api/analytics/recent?limit=${limit}`,
    },
  },
  }
})

describe("AnalyticsService", () => {
  let service: AnalyticsService
  const mockApiClient = vi.mocked(apiClient)

  beforeEach(() => {
    service = new AnalyticsService()
    vi.clearAllMocks()
  })

  describe("incrementVisitCount", () => {
    it("should increment visit count and return the new count", async () => {
      const mockResponse = {
        success: true,
        data: { visitCount: 100 },
      }
      mockApiClient.post.mockResolvedValueOnce(mockResponse)

      const result = await service.incrementVisitCount()

      expect(mockApiClient.post).toHaveBeenCalledWith(
        API_ENDPOINTS.analytics.visits.increment,
        {}
      )
      expect(result).toBe(100)
    })

    it("should handle errors from API", async () => {
      mockApiClient.post.mockRejectedValueOnce(new Error("API Error"))

      await expect(service.incrementVisitCount()).rejects.toThrow("API Error")
    })
  })

  describe("getVisitCount", () => {
    it("should get visit count without incrementing", async () => {
      const mockResponse = {
        success: true,
        data: { visitCount: 99 },
      }
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await service.getVisitCount()

      expect(mockApiClient.get).toHaveBeenCalledWith(
        API_ENDPOINTS.analytics.visits.get
      )
      expect(result).toBe(99)
    })

    it("should handle errors from API", async () => {
      mockApiClient.get.mockRejectedValueOnce(new Error("API Error"))

      await expect(service.getVisitCount()).rejects.toThrow("API Error")
    })
  })

  describe("getOverview", () => {
    it("should get analytics overview", async () => {
      const mockData = {
        totalContacts: 1000,
        contactsWithBloodGroup: 800,
        contactsWithLobby: 700,
        contactsWithoutBloodGroup: 200,
        contactsWithoutLobby: 300,
        recentContacts7Days: 50,
        recentContacts30Days: 150,
        visitCount: 5000,
        bloodGroupCoverage: "80%",
        lobbyCoverage: "70%",
      }
      const mockResponse = {
        success: true,
        data: mockData,
      }
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await service.getOverview()

      expect(mockApiClient.get).toHaveBeenCalledWith(
        API_ENDPOINTS.analytics.overview
      )
      expect(result).toEqual(mockData)
    })
  })

  describe("getBloodGroupDistribution", () => {
    it("should get blood group distribution", async () => {
      const mockData = {
        total: 1000,
        distribution: [
          { bloodGroup: "A+", count: 300, percentage: "30%" },
          { bloodGroup: "B+", count: 250, percentage: "25%" },
        ],
      }
      const mockResponse = {
        success: true,
        data: mockData,
      }
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await service.getBloodGroupDistribution()

      expect(mockApiClient.get).toHaveBeenCalledWith(
        API_ENDPOINTS.analytics.bloodGroups
      )
      expect(result).toEqual(mockData)
    })
  })

  describe("getLobbyDistribution", () => {
    it("should get lobby distribution", async () => {
      const mockData = {
        total: 1000,
        distribution: [
          { lobby: "Engineering", count: 400, percentage: "40%" },
          { lobby: "Sales", count: 300, percentage: "30%" },
        ],
      }
      const mockResponse = {
        success: true,
        data: mockData,
      }
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await service.getLobbyDistribution()

      expect(mockApiClient.get).toHaveBeenCalledWith(
        API_ENDPOINTS.analytics.lobbies
      )
      expect(result).toEqual(mockData)
    })
  })

  describe("getDesignationDistribution", () => {
    it("should get designation distribution", async () => {
      const mockData = {
        total: 1000,
        distribution: [
          { designation: "Manager", count: 200, percentage: "20%" },
          { designation: "Developer", count: 300, percentage: "30%" },
        ],
      }
      const mockResponse = {
        success: true,
        data: mockData,
      }
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await service.getDesignationDistribution()

      expect(mockApiClient.get).toHaveBeenCalledWith(
        API_ENDPOINTS.analytics.designations
      )
      expect(result).toEqual(mockData)
    })
  })

  describe("getGrowth", () => {
    it("should get growth data with default days", async () => {
      const mockData = {
        period: "7 days",
        totalAdded: 50,
        dailyGrowth: [
          { date: "2024-01-01", count: 10, cumulative: 10 },
          { date: "2024-01-02", count: 15, cumulative: 25 },
        ],
      }
      const mockResponse = {
        success: true,
        data: mockData,
      }
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await service.getGrowth()

      expect(mockApiClient.get).toHaveBeenCalledWith(
        API_ENDPOINTS.analytics.growth(7)
      )
      expect(result).toEqual(mockData)
    })

    it("should get growth data with custom days", async () => {
      const mockData = {
        period: "30 days",
        totalAdded: 200,
        dailyGrowth: [],
      }
      const mockResponse = {
        success: true,
        data: mockData,
      }
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await service.getGrowth(30)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        API_ENDPOINTS.analytics.growth(30)
      )
      expect(result).toEqual(mockData)
    })
  })

  describe("getRecentContacts", () => {
    it("should get recent contacts with default limit", async () => {
      const mockData = {
        count: 10,
        contacts: [
          {
            id: "1",
            name: "John Doe",
            phone: "1234567890",
            createdAt: "2024-01-01",
          },
        ],
      }
      const mockResponse = {
        success: true,
        data: mockData,
      }
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await service.getRecentContacts()

      expect(mockApiClient.get).toHaveBeenCalledWith(
        API_ENDPOINTS.analytics.recent(10)
      )
      expect(result).toEqual(mockData)
    })

    it("should get recent contacts with custom limit", async () => {
      const mockData = {
        count: 50,
        contacts: [],
      }
      const mockResponse = {
        success: true,
        data: mockData,
      }
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await service.getRecentContacts(50)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        API_ENDPOINTS.analytics.recent(50)
      )
      expect(result).toEqual(mockData)
    })
  })

  describe("getVisitsHistory", () => {
    it("should get visits history with default days", async () => {
      const mockResponse = {
        success: true,
        period: "30 days",
        totalVisits: 1000,
        data: [
          { date: "2024-01-01", count: 50 },
          { date: "2024-01-02", count: 75 },
        ],
      }
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await service.getVisitsHistory()

      expect(mockApiClient.get).toHaveBeenCalledWith(
        API_ENDPOINTS.analytics.visits.history(30)
      )
      expect(result).toEqual({
        period: "30 days",
        totalVisits: 1000,
        data: [
          { date: "2024-01-01", count: 50 },
          { date: "2024-01-02", count: 75 },
        ],
      })
    })

    it("should get visits history with custom days", async () => {
      const mockResponse = {
        success: true,
        period: "7 days",
        totalVisits: 200,
        data: [{ date: "2024-01-01", count: 30 }],
      }
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await service.getVisitsHistory(7)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        API_ENDPOINTS.analytics.visits.history(7)
      )
      expect(result).toEqual({
        period: "7 days",
        totalVisits: 200,
        data: [{ date: "2024-01-01", count: 30 }],
      })
    })
  })
})

