import * as React from "react"
import { Search, FileText, ExternalLink, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { documentsService } from "@/services/documents.service"
import type { Document } from "@/types/document"

export function Documents() {
  const [documents, setDocuments] = React.useState<Document[]>([])
  const [filteredDocuments, setFilteredDocuments] = React.useState<Document[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [searchQuery, setSearchQuery] = React.useState("")

  // Fetch documents on mount
  React.useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await documentsService.getDocuments()
        setDocuments(data)
        setFilteredDocuments(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch documents")
        console.error("Error fetching documents:", err)
        setDocuments([])
        setFilteredDocuments([])
      } finally {
        setLoading(false)
      }
    }

    fetchDocuments()
  }, [])

  // Filter documents based on search query (title only)
  React.useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredDocuments(documents)
      return
    }

    const query = searchQuery.toLowerCase().trim()
    const filtered = documents.filter((doc) =>
      doc.doc_title.toLowerCase().includes(query)
    )
    setFilteredDocuments(filtered)
  }, [searchQuery, documents])

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground">
            View and manage documents related to your contacts.
          </p>
        </div>

        {/* Search skeleton */}
        <div className="relative">
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Documents skeleton */}
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground">
            View and manage documents related to your contacts.
          </p>
        </div>
        <div className="rounded-lg border border-destructive bg-destructive/10 p-6 text-center">
          <p className="text-sm font-medium text-destructive">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold tracking-tight text-xl">Documents</h1>
        <p className="text-muted-foreground text-sm">
          View and manage documents. {documents.length > 0 && `Found ${documents.length} document${documents.length !== 1 ? "s" : ""}.`}
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search documents by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 cursor-pointer"
            onClick={() => setSearchQuery("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Documents Grid */}
      {filteredDocuments.length === 0 ? (
        <div className="rounded-lg border bg-card p-12 text-center shadow-sm">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">
            {searchQuery ? "No documents found" : "No documents available"}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {searchQuery
              ? "Try adjusting your search query"
              : "Documents will appear here once they are available"}
          </p>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.map((doc) => (
            <div
              key={doc._id}
              className="group relative flex flex-col rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md hover:border-primary/50"
            >
              {/* Document Title */}
              <h3 className="mb-2 text-base font-semibold line-clamp-2">
                {doc.doc_title}
              </h3>

              {/* Document Description */}
              {/* {doc.doc_discription && (
                <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                  {doc.doc_discription}
                </p>
              )} */}

              {/* View Document Button */}
              {doc.doc_link && (
                <Button
                  asChild
                  variant="outline"
                  className="mt-auto w-full"
                  size="sm"
                >
                  <a
                    href={doc.doc_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Document
                  </a>
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Search Results Count */}
      {searchQuery && filteredDocuments.length > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          Showing {filteredDocuments.length} of {documents.length} document
          {documents.length !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  )
}
