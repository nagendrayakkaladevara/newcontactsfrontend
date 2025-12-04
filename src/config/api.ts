/**
 * API Configuration
 * Centralized configuration for API endpoints and base URL
 */

/**
 * Get the API base URL from environment variables or use default
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
  console.log(API_BASE_URL);

/**
 * Get the API key from environment variables
 */
export const API_KEY = import.meta.env.VITE_API_KEY || "";

/**
 * Get Basic Auth credentials from environment variables
 */
export const API_USERNAME = import.meta.env.VITE_API_USERNAME || "";
export const API_PASSWORD = import.meta.env.VITE_API_PASSWORD || "";

/**
 * Generate Basic Auth header value
 */
export const getBasicAuthHeader = (): string => {
  if (!API_USERNAME || !API_PASSWORD) {
    return "";
  }
  const credentials = `${API_USERNAME}:${API_PASSWORD}`;
  return `Basic ${btoa(credentials)}`;
};

/**
 * API endpoints configuration
 */
export const API_ENDPOINTS = {
  contacts: {
    base: "/api/contacts",
    count: "/api/contacts/count",
    getAll: (page: number = 1, limit: number = 50) =>
      `/api/contacts?page=${page}&limit=${limit}`,
    getById: (id: string) => `/api/contacts/${id}`,
    create: "/api/contacts",
    update: (id: string) => `/api/contacts/${id}`,
    delete: (id: string) => `/api/contacts/${id}`,
    searchByName: (query: string, page: number = 1, limit: number = 50) =>
      `/api/contacts/search/name?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`,
    searchByPhone: (phone: string) =>
      `/api/contacts/search/phone?phone=${encodeURIComponent(phone)}`,
    getBloodGroups: "/api/contacts/blood-groups",
    getByBloodGroup: (
      bloodGroups: string[] = [],
      lobbies: string[] = [],
      page: number = 1,
      limit: number = 50
    ) => {
      const params = new URLSearchParams()
      if (bloodGroups.length > 0) {
        params.append("bloodGroup", bloodGroups.join(","))
      }
      if (lobbies.length > 0) {
        params.append("lobby", lobbies.join(","))
      }
      params.append("page", page.toString())
      params.append("limit", limit.toString())
      return `/api/contacts/by-blood-group?${params.toString()}`
    },
    getLobbies: "/api/contacts/lobbies",
    getDesignations: "/api/contacts/designations",
    getByLobby: (
      lobbies: string[] = [],
      designations: string[] = [],
      page: number = 1,
      limit: number = 50
    ) => {
      const params = new URLSearchParams()
      if (lobbies.length > 0) {
        params.append("lobby", lobbies.join(","))
      }
      if (designations.length > 0) {
        params.append("designation", designations.join(","))
      }
      params.append("page", page.toString())
      params.append("limit", limit.toString())
      return `/api/contacts/by-lobby?${params.toString()}`
    },
    filter: (
      bloodGroups: string[] = [],
      lobbies: string[] = [],
      designations: string[] = [],
      page: number = 1,
      limit: number = 50
    ) => {
      const params = new URLSearchParams()
      if (bloodGroups.length > 0) {
        params.append("bloodGroup", bloodGroups.join(","))
      }
      if (lobbies.length > 0) {
        params.append("lobby", lobbies.join(","))
      }
      if (designations.length > 0) {
        params.append("designation", designations.join(","))
      }
      params.append("page", page.toString())
      params.append("limit", limit.toString())
      return `/api/contacts/filter?${params.toString()}`
    },
  },
  analytics: {
    visits: {
      increment: "/api/analytics/visits",
      get: "/api/analytics/visits",
    },
    overview: "/api/analytics/overview",
    bloodGroups: "/api/analytics/blood-groups",
    lobbies: "/api/analytics/lobbies",
    designations: "/api/analytics/designations",
    growth: (days: number = 30) => `/api/analytics/growth?days=${days}`,
    recent: (limit: number = 10) => `/api/analytics/recent?limit=${limit}`,
  },
} as const

/**
 * Default pagination settings
 */
export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 50,
} as const

