/**
 * Documents Service
 * Service layer for documents-related API operations
 */

import type { Document } from "@/types/document"
import { API_KEY, getBasicAuthHeader } from "@/config/api"

const DOCUMENTS_API_URL = "https://ecorsuexpressapp.vercel.app/docUpload"

/**
 * Documents Service Class
 * Provides methods for all document-related operations
 */
export class DocumentsService {
  /**
   * Get all documents
   * Filters documents that contain "WAT" in doc_title
   */
  async getDocuments(): Promise<Document[]> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

    try {
      // Build headers with X-API-Key and Basic Auth
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      }
      
      if (API_KEY && API_KEY.trim() !== "") {
        headers["X-API-Key"] = API_KEY
      }
      
      const basicAuth = getBasicAuthHeader()
      if (basicAuth) {
        headers["Authorization"] = basicAuth
      }
      
      const response = await fetch(DOCUMENTS_API_URL, {
        method: "GET",
        headers,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`Failed to fetch documents: ${response.statusText}`)
      }

      const data = await response.json()

      // Validate and filter documents containing "WAT" in doc_title
      const filtered = (Array.isArray(data) ? data : [])
        .filter(
          (doc: any) =>
            doc &&
            doc.doc_title &&
            typeof doc.doc_title === "string" &&
            doc.doc_title.includes("WAT")
        )
        .map((doc: any) => ({
          _id: doc._id || "",
          doc_title: doc.doc_title || "",
          doc_discription: doc.doc_discription || "",
          doc_link: doc.doc_link || "",
          doc_uploaded_by: doc.doc_uploaded_by || "",
          createdAt: doc.createdAt || "",
          updatedAt: doc.updatedAt || "",
          __v: doc.__v || 0,
        }))

      return filtered
    } catch (error) {
      clearTimeout(timeoutId)
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("Request timeout: Could not fetch documents")
      }
      throw error
    }
  }
}

// Export singleton instance
export const documentsService = new DocumentsService()

