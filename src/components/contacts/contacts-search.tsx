/**
 * ContactsSearch Component
 * Search bar with name/phone toggle for searching contacts
 */

import { useState, type FormEvent } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim(), isPhoneSearch)
    }
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type={isPhoneSearch ? "tel" : "text"}
            placeholder={isPhoneSearch ? "Enter phone number..." : "Search by name..."}
            value={query}
            onChange={handleChange}
            className="pl-9"
            disabled={loading}
            inputMode={isPhoneSearch ? "tel" : "text"}
          />
        </div>
        <Button type="submit" disabled={loading || !query.trim()}>
          {loading ? "Searching..." : "Search"}
        </Button>
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
    </form>
  )
}

