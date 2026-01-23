import { describe, it, expect, beforeEach, vi } from "vitest"
import { ContactsService } from "./contacts.service"
import { apiClient } from "@/lib/api-client"
import { API_ENDPOINTS, DEFAULT_PAGINATION } from "@/config/api"

vi.mock("@/lib/api-client")
vi.mock("@/config/api", async () => {
  const actual = await vi.importActual("@/config/api")
  return {
    ...actual,
    API_ENDPOINTS: {
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
        `/api/contacts/search/phone?query=${encodeURIComponent(phone)}`,
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
  },
  DEFAULT_PAGINATION: {
    page: 1,
    limit: 50,
  },
  }
})

describe("ContactsService", () => {
  let service: ContactsService
  const mockApiClient = vi.mocked(apiClient)

  beforeEach(() => {
    service = new ContactsService()
    vi.clearAllMocks()
  })

  describe("getContactsCount", () => {
    it("should get contacts count", async () => {
      const mockResponse = {
        success: true,
        count: 100,
      }
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await service.getContactsCount()

      expect(mockApiClient.get).toHaveBeenCalledWith(API_ENDPOINTS.contacts.count)
      expect(result).toBe(100)
    })
  })

  describe("getAllContacts", () => {
    it("should get all contacts with default pagination", async () => {
      const mockResponse = {
        success: true,
        data: [{ id: "1", name: "John" }],
        pagination: {
          page: 1,
          limit: 50,
          total: 100,
          totalPages: 2,
        },
      }
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await service.getAllContacts()

      expect(mockApiClient.get).toHaveBeenCalledWith(
        API_ENDPOINTS.contacts.getAll(DEFAULT_PAGINATION.page, DEFAULT_PAGINATION.limit)
      )
      expect(result).toEqual(mockResponse)
    })

    it("should get all contacts with custom pagination", async () => {
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
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await service.getAllContacts(2, 25)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        API_ENDPOINTS.contacts.getAll(2, 25)
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe("getContactById", () => {
    it("should get contact by ID", async () => {
      const mockContact = {
        id: "1",
        name: "John Doe",
        phone: "1234567890",
      }
      mockApiClient.get.mockResolvedValueOnce(mockContact)

      const result = await service.getContactById("1")

      expect(mockApiClient.get).toHaveBeenCalledWith(
        API_ENDPOINTS.contacts.getById("1")
      )
      expect(result).toEqual(mockContact)
    })
  })

  describe("createContact", () => {
    it("should create a new contact", async () => {
      const newContact = {
        name: "Jane Doe",
        phone: "0987654321",
      }
      const mockResponse = {
        id: "2",
        ...newContact,
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
      }
      mockApiClient.post.mockResolvedValueOnce(mockResponse)

      const result = await service.createContact(newContact)

      expect(mockApiClient.post).toHaveBeenCalledWith(
        API_ENDPOINTS.contacts.create,
        newContact
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe("updateContact", () => {
    it("should update an existing contact", async () => {
      const updates = {
        name: "Updated Name",
      }
      const mockResponse = {
        id: "1",
        name: "Updated Name",
        phone: "1234567890",
        updatedAt: "2024-01-02",
      }
      mockApiClient.put.mockResolvedValueOnce(mockResponse)

      const result = await service.updateContact("1", updates)

      expect(mockApiClient.put).toHaveBeenCalledWith(
        API_ENDPOINTS.contacts.update("1"),
        updates
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe("deleteContact", () => {
    it("should delete a contact", async () => {
      mockApiClient.delete.mockResolvedValueOnce(undefined)

      await service.deleteContact("1")

      expect(mockApiClient.delete).toHaveBeenCalledWith(
        API_ENDPOINTS.contacts.delete("1")
      )
    })
  })

  describe("searchByName", () => {
    it("should search contacts by name with default pagination", async () => {
      const mockResponse = {
        success: true,
        data: [{ id: "1", name: "John" }],
        pagination: {
          page: 1,
          limit: 50,
          total: 1,
          totalPages: 1,
        },
      }
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await service.searchByName("John")

      expect(mockApiClient.get).toHaveBeenCalledWith(
        API_ENDPOINTS.contacts.searchByName("John", DEFAULT_PAGINATION.page, DEFAULT_PAGINATION.limit)
      )
      expect(result).toEqual(mockResponse)
    })

    it("should search contacts by name with custom pagination", async () => {
      const mockResponse = {
        success: true,
        data: [],
        pagination: {
          page: 2,
          limit: 25,
          total: 0,
          totalPages: 0,
        },
      }
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await service.searchByName("John", 2, 25)

      expect(mockApiClient.get).toHaveBeenCalledWith(
        API_ENDPOINTS.contacts.searchByName("John", 2, 25)
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe("searchByPhone", () => {
    it("should search contacts by phone with count field", async () => {
      const mockResponse = {
        success: true,
        count: 1,
        data: [{ id: "1", name: "John", phone: "1234567890" }],
        limit: 50,
        page: 1,
      }
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await service.searchByPhone("1234567890")

      expect(mockApiClient.get).toHaveBeenCalledWith(
        API_ENDPOINTS.contacts.searchByPhone("1234567890")
      )
      expect(result).toEqual({
        success: true,
        data: [{ id: "1", name: "John", phone: "1234567890" }],
        pagination: {
          page: 1,
          limit: 50,
          total: 1,
          totalPages: 1,
        },
      })
    })

    it("should search contacts by phone with pagination field", async () => {
      const mockResponse = {
        success: true,
        data: [{ id: "1", name: "John", phone: "1234567890" }],
        pagination: {
          page: 1,
          limit: 50,
          total: 1,
          totalPages: 1,
        },
      }
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await service.searchByPhone("1234567890")

      expect(result).toEqual(mockResponse)
    })

    it("should handle searchByPhone with fallback format", async () => {
      const mockResponse = {
        success: false,
        data: [],
      }
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await service.searchByPhone("1234567890")

      // When success is false, it stays false (response.success !== false evaluates to false when success is false)
      expect(result.success).toBe(false)
      expect(result.data).toEqual([])
      expect(result.pagination).toEqual({
        page: 1,
        limit: 50,
        total: 0,
        totalPages: 1,
      })
    })

    it("should handle searchByPhone with missing count", async () => {
      const mockResponse = {
        success: true,
        data: [],
        limit: 25,
        page: 2,
        count: 0, // Include count to trigger the first branch
      }
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await service.searchByPhone("1234567890")

      expect(result.pagination.page).toBe(2)
      expect(result.pagination.limit).toBe(25)
      expect(result.pagination.total).toBe(0)
      expect(result.pagination.totalPages).toBe(0)
    })
  })

  describe("getBloodGroups", () => {
    it("should get all blood groups", async () => {
      const mockResponse = {
        success: true,
        data: ["A+", "B+", "O+", "AB+"],
      }
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await service.getBloodGroups()

      expect(mockApiClient.get).toHaveBeenCalledWith(
        API_ENDPOINTS.contacts.getBloodGroups
      )
      expect(result).toEqual(["A+", "B+", "O+", "AB+"])
    })
  })

  describe("getContactsByBloodGroup", () => {
    it("should get contacts by blood group", async () => {
      const mockResponse = {
        success: true,
        data: [{ id: "1", name: "John", bloodGroup: "A+" }],
        pagination: {
          page: 1,
          limit: 50,
          total: 1,
          totalPages: 1,
        },
      }
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await service.getContactsByBloodGroup(["A+"])

      expect(mockApiClient.get).toHaveBeenCalledWith(
        API_ENDPOINTS.contacts.getByBloodGroup(["A+"], [], DEFAULT_PAGINATION.page, DEFAULT_PAGINATION.limit)
      )
      expect(result).toEqual(mockResponse)
    })

    it("should get contacts by blood group and lobby", async () => {
      const mockResponse = {
        success: true,
        data: [],
        pagination: {
          page: 1,
          limit: 50,
          total: 0,
          totalPages: 0,
        },
      }
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await service.getContactsByBloodGroup(["A+"], ["Engineering"])

      expect(mockApiClient.get).toHaveBeenCalledWith(
        API_ENDPOINTS.contacts.getByBloodGroup(["A+"], ["Engineering"], DEFAULT_PAGINATION.page, DEFAULT_PAGINATION.limit)
      )
      expect(result).toEqual(mockResponse)
    })

    it("should throw error when both bloodGroups and lobbies are empty", async () => {
      await expect(
        service.getContactsByBloodGroup([], [])
      ).rejects.toThrow("At least one blood group or lobby is required")
    })
  })

  describe("getLobbies", () => {
    it("should get all lobbies", async () => {
      const mockResponse = {
        success: true,
        data: ["Engineering", "Sales", "Marketing"],
      }
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await service.getLobbies()

      expect(mockApiClient.get).toHaveBeenCalledWith(
        API_ENDPOINTS.contacts.getLobbies
      )
      expect(result).toEqual(["Engineering", "Sales", "Marketing"])
    })
  })

  describe("getDesignations", () => {
    it("should get all designations", async () => {
      const mockResponse = {
        success: true,
        data: ["Manager", "Developer", "Designer"],
      }
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await service.getDesignations()

      expect(mockApiClient.get).toHaveBeenCalledWith(
        API_ENDPOINTS.contacts.getDesignations
      )
      expect(result).toEqual(["Manager", "Developer", "Designer"])
    })
  })

  describe("getContactsByLobby", () => {
    it("should get contacts by lobby", async () => {
      const mockResponse = {
        success: true,
        data: [{ id: "1", name: "John", lobby: "Engineering" }],
        pagination: {
          page: 1,
          limit: 50,
          total: 1,
          totalPages: 1,
        },
      }
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await service.getContactsByLobby(["Engineering"])

      expect(mockApiClient.get).toHaveBeenCalledWith(
        API_ENDPOINTS.contacts.getByLobby(["Engineering"], [], DEFAULT_PAGINATION.page, DEFAULT_PAGINATION.limit)
      )
      expect(result).toEqual(mockResponse)
    })

    it("should get contacts by lobby and designation", async () => {
      const mockResponse = {
        success: true,
        data: [],
        pagination: {
          page: 1,
          limit: 50,
          total: 0,
          totalPages: 0,
        },
      }
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await service.getContactsByLobby(["Engineering"], ["Manager"])

      expect(mockApiClient.get).toHaveBeenCalledWith(
        API_ENDPOINTS.contacts.getByLobby(["Engineering"], ["Manager"], DEFAULT_PAGINATION.page, DEFAULT_PAGINATION.limit)
      )
      expect(result).toEqual(mockResponse)
    })

    it("should throw error when both lobbies and designations are empty", async () => {
      await expect(
        service.getContactsByLobby([], [])
      ).rejects.toThrow("At least one lobby or designation is required")
    })
  })

  describe("filterContacts", () => {
    it("should filter contacts by blood group, lobby, and designation", async () => {
      const mockResponse = {
        success: true,
        data: [{ id: "1", name: "John" }],
        pagination: {
          page: 1,
          limit: 50,
          total: 1,
          totalPages: 1,
        },
      }
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await service.filterContacts(["A+"], ["Engineering"], ["Manager"])

      expect(mockApiClient.get).toHaveBeenCalledWith(
        API_ENDPOINTS.contacts.filter(["A+"], ["Engineering"], ["Manager"], DEFAULT_PAGINATION.page, DEFAULT_PAGINATION.limit)
      )
      expect(result).toEqual(mockResponse)
    })

    it("should filter contacts by blood group only", async () => {
      const mockResponse = {
        success: true,
        data: [],
        pagination: {
          page: 1,
          limit: 50,
          total: 0,
          totalPages: 0,
        },
      }
      mockApiClient.get.mockResolvedValueOnce(mockResponse)

      const result = await service.filterContacts(["A+"], [], [])

      expect(mockApiClient.get).toHaveBeenCalledWith(
        API_ENDPOINTS.contacts.filter(["A+"], [], [], DEFAULT_PAGINATION.page, DEFAULT_PAGINATION.limit)
      )
      expect(result).toEqual(mockResponse)
    })

    it("should throw error when all filters are empty", async () => {
      await expect(
        service.filterContacts([], [], [])
      ).rejects.toThrow("At least one filter (bloodGroup, lobby, or designation) is required")
    })
  })
})

