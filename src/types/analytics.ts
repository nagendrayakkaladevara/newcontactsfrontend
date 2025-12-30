/**
 * Analytics type definitions
 */

export interface AnalyticsOverview {
  totalContacts: number
  contactsWithBloodGroup: number
  contactsWithLobby: number
  contactsWithoutBloodGroup: number
  contactsWithoutLobby: number
  recentContacts7Days: number
  recentContacts30Days: number
  visitCount: number
  bloodGroupCoverage: string
  lobbyCoverage: string
}

export interface DistributionItem {
  bloodGroup?: string
  lobby?: string
  designation?: string
  count: number
  percentage: string
}

export interface BloodGroupDistribution {
  total: number
  distribution: DistributionItem[]
}

export interface LobbyDistribution {
  total: number
  distribution: DistributionItem[]
}

export interface DesignationDistribution {
  total: number
  distribution: DistributionItem[]
}

export interface AnalyticsOverviewResponse {
  success: boolean
  data: AnalyticsOverview
}

export interface BloodGroupDistributionResponse {
  success: boolean
  data: BloodGroupDistribution
}

export interface LobbyDistributionResponse {
  success: boolean
  data: LobbyDistribution
}

export interface DesignationDistributionResponse {
  success: boolean
  data: DesignationDistribution
}

export interface DailyGrowth {
  date: string
  count: number
  cumulative: number
}

export interface GrowthData {
  period: string
  totalAdded: number
  dailyGrowth: DailyGrowth[]
}

export interface GrowthResponse {
  success: boolean
  data: GrowthData
}

export interface RecentContacts {
  count: number
  contacts: Array<{
    id: string
    name: string
    phone?: string
    bloodGroup?: string
    lobby?: string
    designation?: string
    createdAt: string
  }>
}

export interface RecentContactsResponse {
  success: boolean
  data: RecentContacts
}

export interface VisitHistoryItem {
  date: string
  count: number
}

export interface VisitHistory {
  period: string
  totalVisits: number
  data: VisitHistoryItem[]
}

export interface VisitHistoryResponse {
  success: boolean
  data: VisitHistoryItem[]
  period: string
  totalVisits: number
}

