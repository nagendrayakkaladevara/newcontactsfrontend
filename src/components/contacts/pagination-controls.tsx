/**
 * PaginationControls Component
 * Provides pagination controls for contacts list
 */

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaginationControlsProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  loading?: boolean
}

export function PaginationControls({
  page,
  totalPages,
  onPageChange,
  loading = false,
}: PaginationControlsProps) {
  if (totalPages <= 1) {
    return null
  }

  const handlePrevious = () => {
    if (page > 1) {
      onPageChange(page - 1)
    }
  }

  const handleNext = () => {
    if (page < totalPages) {
      onPageChange(page + 1)
    }
  }

  return (
    <div className="flex items-center justify-between border-t px-4 py-3">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={page === 1 || loading}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={page === totalPages || loading}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </div>
    </div>
  )
}





