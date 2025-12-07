/**
 * ContactsSearch Component
 * Search bar with name/phone toggle for searching contacts
 */

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface ContactsSearchProps {
  onSearch: (query: string, isPhoneSearch: boolean) => void
  loading: boolean
}

export function ContactsSearch({ onSearch, loading }: ContactsSearchProps) {
  const [query, setQuery] = useState("")
  // Phone search is disabled for now - coming soon
  // const [isPhoneSearch, setIsPhoneSearch] = useState(false)
  const isPhoneSearch = false
  
  // Use refs to store values and prevent unnecessary re-renders
  const onSearchRef = useRef(onSearch)
  const lastSearchedQueryRef = useRef<string>("")
  const isMountedRef = useRef(true)
  const isInitialMountRef = useRef(true)
  
  // Update ref when onSearch changes
  useEffect(() => {
    onSearchRef.current = onSearch
  }, [onSearch])

  // Track component mount state
  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    
    if (isPhoneSearch) {
      // Only allow numbers, +, -, spaces, and parentheses for phone numbers
      const phonePattern = /^[0-9+\-\s()]*$/
      if (phonePattern.test(value) || value === "") {
        setQuery(value)
      }
    } else {
      // Allow all characters for name search
      setQuery(value)
    }
  }

  // Debounced search effect with edge case handling
  useEffect(() => {
    // Don't search on initial mount (only when user types)
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false
      return
    }

    // Don't search if component is unmounted
    if (!isMountedRef.current) {
      return
    }

    const trimmedQuery = query.trim()
    const isEmpty = trimmedQuery === ""
    
    // Skip if this is the same query we just searched
    if (trimmedQuery === lastSearchedQueryRef.current) {
      return
    }

    const timer = setTimeout(() => {
      // Double-check component is still mounted
      if (!isMountedRef.current) {
        return
      }

      // Don't search if loading (prevent race conditions)
      if (loading) {
        return
      }

      if (isEmpty) {
        // Clear results when input is empty or whitespace-only
        lastSearchedQueryRef.current = ""
        onSearchRef.current("", isPhoneSearch)
      } else {
        // Only search if query has minimum length (at least 1 character after trim)
        if (trimmedQuery.length >= 1) {
          lastSearchedQueryRef.current = trimmedQuery
          onSearchRef.current(trimmedQuery, isPhoneSearch)
        }
      }
    }, 2000) // 2000ms debounce delay

    return () => {
      clearTimeout(timer)
    }
  }, [query, isPhoneSearch, loading])

  const handleClear = () => {
    setQuery("")
    lastSearchedQueryRef.current = ""
    onSearchRef.current("", isPhoneSearch)
  }

  const handlePhoneCheckboxChange = (_checked: boolean) => {
    // Phone search is disabled for now - coming soon
    // setIsPhoneSearch(checked)
    // // Clear the query if switching modes and it contains invalid characters
    // if (checked && query) {
    //   const phonePattern = /^[0-9+\-\s()]*$/
    //   if (!phonePattern.test(query)) {
    //     setQuery("")
    //   }
    // }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type={isPhoneSearch ? "tel" : "text"}
          placeholder={isPhoneSearch ? "Enter phone number..." : "Search by name..."}
          value={query}
          onChange={handleChange}
          className="pl-9 pr-9 border-foreground/90 dark:border-foreground/90"
          disabled={loading}
          inputMode={isPhoneSearch ? "tel" : "text"}
        />
        {loading ? (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : query ? (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>
      <div className="flex justify-end items-center gap-2">
        <Checkbox
          id="phone-search"
          checked={false}
          onCheckedChange={(checked) => handlePhoneCheckboxChange(checked === true)}
          disabled={true}
        />
        <Label
          htmlFor="phone-search"
          className="text-sm font-normal cursor-not-allowed opacity-60 flex items-center gap-2"
        >
          Search by phone number
          <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
            Coming Soon
          </span>
        </Label>
      </div>
    </div>
  )
}

