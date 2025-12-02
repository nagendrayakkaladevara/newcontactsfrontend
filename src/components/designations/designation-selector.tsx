import * as React from "react"
import { Building2, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { Skeleton } from "@/components/ui/skeleton"

interface DesignationSelectorProps {
  designations: string[]
  selectedDesignations: string[]
  onSelectionChange: (selected: string[]) => void
  loading?: boolean
  error?: string | null
}

export function DesignationSelector({
  designations,
  selectedDesignations,
  onSelectionChange,
  loading = false,
  error = null,
}: DesignationSelectorProps) {
  const isMobile = useIsMobile()

  const toggleDesignation = (designation: string) => {
    if (selectedDesignations.includes(designation)) {
      onSelectionChange(selectedDesignations.filter((d) => d !== designation))
    } else {
      onSelectionChange([...selectedDesignations, designation])
    }
  }

  const clearAll = () => {
    onSelectionChange([])
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <div className="flex flex-wrap gap-2">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-9 w-24 rounded-full" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-md border border-destructive bg-destructive/10 p-4 text-destructive">
        <p className="text-sm font-medium">Error loading designations</p>
        <p className="text-xs">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Selected Items - Always visible at top */}
      {selectedDesignations.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Selected ({selectedDesignations.length})
            </p>
            <button
              onClick={clearAll}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedDesignations.map((designation) => (
              <button
                key={designation}
                onClick={() => toggleDesignation(designation)}
                className={cn(
                  "group inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium",
                  "bg-purple-500 text-white shadow-sm",
                  "hover:bg-purple-600 active:scale-95 transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                )}
              >
                <Building2 className="h-3.5 w-3.5" />
                <span>{designation}</span>
                <X className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Available Options */}
      <div className="space-y-2">
        {selectedDesignations.length > 0 && (
          <p className="text-sm font-medium text-muted-foreground">
            Available Options
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          {designations
            .filter((des) => !selectedDesignations.includes(des))
            .map((designation) => (
              <button
                key={designation}
                onClick={() => toggleDesignation(designation)}
                className={cn(
                  "group inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium",
                  "border-2 border-border bg-card text-foreground",
                  "hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-950/10",
                  "active:scale-95 transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                )}
              >
                <Building2 className="h-3.5 w-3.5 text-muted-foreground group-hover:text-purple-600" />
                <span>{designation}</span>
                <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30 group-hover:border-purple-500 group-hover:bg-purple-500/10 transition-colors" />
              </button>
            ))}
        </div>
      </div>
    </div>
  )
}
