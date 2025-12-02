import { useState, useCallback, useRef } from "react"
import { useContactsSearch } from "@/hooks/use-contacts-search"
import { ContactsSearch } from "@/components/contacts/contacts-search"
import { ContactsList } from "@/components/contacts/contacts-list"
import { PaginationControls } from "@/components/contacts/pagination-controls"
import logo from "@/assets/indian-railways-logo-Bn6xvMdg-removebg-preview.png"

export function Home() {
    const [lastQuery, setLastQuery] = useState("")
    const [isPhoneSearch, setIsPhoneSearch] = useState(false)
    const [hasSearched, setHasSearched] = useState(false)
    const {
        contacts,
        loading,
        error,
        pagination,
        searchByName,
        searchByPhone,
        clearResults,
    } = useContactsSearch()
    
    // Track if a search is in progress to prevent race conditions
    const isSearchingRef = useRef(false)

    const handleSearch = useCallback(async (query: string, isPhone: boolean) => {
        // Prevent concurrent searches
        if (isSearchingRef.current) {
            return
        }

        const trimmedQuery = query.trim()
        
        if (!trimmedQuery) {
            // Clear search results when query is empty or whitespace-only
            setHasSearched(false)
            setLastQuery("")
            clearResults()
            return
        }

        // Skip if this is the same query we're already searching/displaying
        if (trimmedQuery === lastQuery && hasSearched) {
            return
        }

        try {
            isSearchingRef.current = true
            setLastQuery(trimmedQuery)
            setIsPhoneSearch(isPhone)
            setHasSearched(true)
            
            if (isPhone) {
                await searchByPhone(trimmedQuery)
            } else {
                await searchByName(trimmedQuery, 1)
            }
        } catch (err) {
            // Error is handled by the hook
            console.error("Search error:", err)
        } finally {
            isSearchingRef.current = false
        }
    }, [lastQuery, hasSearched, searchByName, searchByPhone, clearResults])

    const handlePageChange = async (page: number) => {
        if (lastQuery && !isPhoneSearch) {
            await searchByName(lastQuery, page)
        }
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Welcome Section with Logo */}
            <div className="flex flex-col items-center gap-4 my-4">
                <img 
                    src={logo} 
                    alt="Indian Railways Logo" 
                    className="h-20 w-auto object-contain"
                />
                <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-xl font-bold tracking-tight">East Coast Railway, Waltair Division.</h1>
                </div>
            </div>

            {/* Search Section */}
            <ContactsSearch onSearch={handleSearch} loading={loading} />

            {/* Search Results */}
            {(hasSearched || loading || error || contacts.length > 0) && (
                <div className="p-0.5 mt-4">
                    <ContactsList
                        contacts={contacts}
                        loading={loading}
                        error={error}
                        hasSearched={hasSearched}
                        onRetry={() => {
                            if (lastQuery) {
                                handleSearch(lastQuery, isPhoneSearch)
                            }
                        }}
                    />
                </div>
            )}
            {pagination && pagination.totalPages > 1 && (
                <div className="border-t p-6">
                    <PaginationControls
                        page={pagination.page}
                        totalPages={pagination.totalPages}
                        onPageChange={handlePageChange}
                        loading={loading}
                    />
                </div>
            )}
        </div>
    )
}

