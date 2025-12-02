import { Briefcase, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface DivisionSelectorProps {
  divisions: string[]
  selectedDivisions: string[]
  onSelectionChange: (selected: string[]) => void
  loading?: boolean
  error?: string | null
}

export function DivisionSelector({
  divisions,
  selectedDivisions,
  onSelectionChange,
  loading = false,
  error = null,
}: DivisionSelectorProps) {

  const toggleDivision = (division: string) => {
    if (selectedDivisions.includes(division)) {
      onSelectionChange(selectedDivisions.filter((d) => d !== division))
    } else {
      onSelectionChange([...selectedDivisions, division])
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
        <p className="text-sm font-medium">Error loading divisions</p>
        <p className="text-xs">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Selected Items - Always visible at top */}
      {selectedDivisions.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Selected ({selectedDivisions.length})
            </p>
            <button
              onClick={clearAll}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedDivisions.map((division) => (
              <button
                key={division}
                onClick={() => toggleDivision(division)}
                className={cn(
                  "group inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium",
                  "bg-blue-500 text-white shadow-sm",
                  "hover:bg-blue-600 active:scale-95 transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                )}
              >
                <Briefcase className="h-3.5 w-3.5" />
                <span>{division}</span>
                <X className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Available Options */}
      <div className="space-y-2">
        {selectedDivisions.length > 0 && (
          <p className="text-sm font-medium text-muted-foreground">
            Available Options
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          {divisions
            .filter((div) => !selectedDivisions.includes(div))
            .map((division) => (
              <button
                key={division}
                onClick={() => toggleDivision(division)}
                className={cn(
                  "group inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium",
                  "border-2 border-border bg-card text-foreground",
                  "hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/10",
                  "active:scale-95 transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                )}
              >
                <Briefcase className="h-3.5 w-3.5 text-muted-foreground group-hover:text-blue-600" />
                <span>{division}</span>
                <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30 group-hover:border-blue-500 group-hover:bg-blue-500/10 transition-colors" />
              </button>
            ))}
        </div>
      </div>
    </div>
  )
}
