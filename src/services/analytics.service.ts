/**
 * Analytics Service
 * Service layer for analytics-related API operations
 */

import { apiClient } from "@/lib/api-client"
import { API_ENDPOINTS } from "@/config/api"
import type {
  AnalyticsOverviewResponse,
  BloodGroupDistributionResponse,
  LobbyDistributionResponse,
  DesignationDistributionResponse,
  GrowthResponse,
  RecentContactsResponse,
  AnalyticsOverview,
  BloodGroupDistribution,
  LobbyDistribution,
  DesignationDistribution,
  GrowthData,
  RecentContacts,
} from "@/types/analytics"

interface VisitCountResponse {
  success: boolean
  data: {
    visitCount: number
  }
}

/**
 * Analytics Service Class
 * Provides methods for all analytics-related operations
 */
export class AnalyticsService {
  /**
   * Increment visit count (thread-safe)
   * Call this when a user visits the application/page
   */
  async incrementVisitCount(): Promise<number> {
    const response = await apiClient.post<VisitCountResponse>(
      API_ENDPOINTS.analytics.visits.increment,
      {}
    )
    return response.data.visitCount
  }

  /**
   * Get visit count without incrementing
   * Use this to display the count without tracking
   */
  async getVisitCount(): Promise<number> {
    const response = await apiClient.get<VisitCountResponse>(
      API_ENDPOINTS.analytics.visits.get
    )
    return response.data.visitCount
  }

  /**
   * Get analytics overview
   */
  async getOverview(): Promise<AnalyticsOverview> {
    const response = await apiClient.get<AnalyticsOverviewResponse>(
      API_ENDPOINTS.analytics.overview
    )
    return response.data
  }

  /**
   * Get blood group distribution
   */
  async getBloodGroupDistribution(): Promise<BloodGroupDistribution> {
    const response = await apiClient.get<BloodGroupDistributionResponse>(
      API_ENDPOINTS.analytics.bloodGroups
    )
    return response.data
  }

  /**
   * Get lobby distribution
   */
  async getLobbyDistribution(): Promise<LobbyDistribution> {
    const response = await apiClient.get<LobbyDistributionResponse>(
      API_ENDPOINTS.analytics.lobbies
    )
    return response.data
  }

  /**
   * Get designation distribution
   */
  async getDesignationDistribution(): Promise<DesignationDistribution> {
    const response = await apiClient.get<DesignationDistributionResponse>(
      API_ENDPOINTS.analytics.designations
    )
    return response.data
  }

  /**
   * Get contacts growth over time
   * @param days - Number of days to analyze (default: 7, max: 365)
   */
  async getGrowth(days: number = 7): Promise<GrowthData> {
    const response = await apiClient.get<GrowthResponse>(
      API_ENDPOINTS.analytics.growth(days)
    )
    return response.data
  }

  /**
   * Get recent contacts
   * @param limit - Number of recent contacts to return (default: 10, max: 100)
   */
  async getRecentContacts(limit: number = 10): Promise<RecentContacts> {
    const response = await apiClient.get<RecentContactsResponse>(
      API_ENDPOINTS.analytics.recent(limit)
    )
    return response.data
  }
}

// Export singleton instance
export const analyticsService = new AnalyticsService()

