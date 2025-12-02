import { HeartPulse, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface BloodGroupSelectorProps {
  bloodGroups: string[]
  selectedGroups: string[]
  onSelectionChange: (selected: string[]) => void
  loading?: boolean
  error?: string | null
}

export function BloodGroupSelector({
  bloodGroups,
  selectedGroups,
  onSelectionChange,
  loading = false,
  error = null,
}: BloodGroupSelectorProps) {

  const toggleGroup = (group: string) => {
    if (selectedGroups.includes(group)) {
      onSelectionChange(selectedGroups.filter((g) => g !== group))
    } else {
      onSelectionChange([...selectedGroups, group])
    }
  }

  const clearAll = () => {
    onSelectionChange([])
  }

  if (loading) {
    return (
      <div className="space-y-4">
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
        <p className="text-sm font-medium">Error loading blood groups</p>
        <p className="text-xs">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Selected Items - Always visible at top */}
      {selectedGroups.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Selected ({selectedGroups.length})
            </p>
            <button
              onClick={clearAll}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedGroups.map((group) => (
              <button
                key={group}
                onClick={() => toggleGroup(group)}
                className={cn(
                  "group inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium",
                  "bg-red-500 text-white shadow-sm",
                  "hover:bg-red-600 active:scale-95 transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                )}
              >
                <HeartPulse className="h-3.5 w-3.5" />
                <span>{group}</span>
                <X className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Available Options */}
      <div className="space-y-2">
        {selectedGroups.length > 0 && (
          <p className="text-sm font-medium text-muted-foreground">
            Available Options
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          {bloodGroups
            .filter((group) => !selectedGroups.includes(group))
            .map((group) => (
              <button
                key={group}
                onClick={() => toggleGroup(group)}
                className={cn(
                  "group inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium",
                  "border-2 border-border bg-card text-foreground",
                  "hover:border-red-400 hover:bg-red-50/50 dark:hover:bg-red-950/10",
                  "active:scale-95 transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                )}
              >
                <HeartPulse className="h-3.5 w-3.5 text-muted-foreground group-hover:text-red-600" />
                <span>{group}</span>
                <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30 group-hover:border-red-500 group-hover:bg-red-500/10 transition-colors" />
              </button>
            ))}
        </div>
      </div>
    </div>
  )
}
