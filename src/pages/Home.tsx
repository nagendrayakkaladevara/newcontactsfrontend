import { useState, useCallback, useRef } from "react"
import { useContactsSearch } from "@/hooks/use-contacts-search"
import { useVisitCount } from "@/hooks/use-visit-count"
import { ContactsSearch } from "@/components/contacts/contacts-search"
import { ContactsList } from "@/components/contacts/contacts-list"
import { PaginationControls } from "@/components/contacts/pagination-controls"
import { DocumentsList } from "@/components/documents/documents-list"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Phone, FileText } from "lucide-react"
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
    
    // Get visit count (don't auto-increment since App.tsx already handles it)
    const { visitCount } = useVisitCount(false, true)
    
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
        <div className="flex flex-col gap-6 pb-16 md:pb-0">
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

            {/* Tabs Component */}
            <Tabs defaultValue="contacts" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="contacts" className="flex items-center gap-2 border-gray-200 rounded-md">
                        <Phone className="h-4 w-4" />
                        Contacts
                    </TabsTrigger>
                    <TabsTrigger value="documents" className="flex items-center gap-2 border-gray-200 rounded-md">
                        <FileText className="h-4 w-4" />
                        Important Documents
                    </TabsTrigger>
                </TabsList>

                {/* Contacts Tab */}
                <TabsContent value="contacts" className="mt-6">
                    <div className="flex flex-col gap-6">
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
                </TabsContent>

                {/* Documents Tab */}
                <TabsContent value="documents" className="mt-6">
                    <DocumentsList />
                </TabsContent>
            </Tabs>

            {/* Developer Credit - Mobile Only - Fixed at bottom of screen */}
            <div className="block md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 z-10">
                <p className="text-xs text-center text-gray-500">
                    Developer by Nagendra Yakkaladevara |
                    {visitCount !== null && (
                        <span className="font-bold ml-2">Usage count : {visitCount.toLocaleString()}</span>
                    )}
                </p>
            </div>
        </div>
    )
}

