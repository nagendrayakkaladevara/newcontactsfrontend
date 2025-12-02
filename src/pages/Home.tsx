import { useState } from "react"
import { useContactsSearch } from "@/hooks/use-contacts-search"
import { ContactsSearch } from "@/components/contacts/contacts-search"
import { ContactsList } from "@/components/contacts/contacts-list"
import { PaginationControls } from "@/components/contacts/pagination-controls"

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
    } = useContactsSearch()

    const handleSearch = async (query: string, isPhone: boolean) => {
        setLastQuery(query)
        setIsPhoneSearch(isPhone)
        setHasSearched(true)
        if (isPhone) {
            await searchByPhone(query)
        } else {
            await searchByName(query, 1)
        }
    }

    const handlePageChange = async (page: number) => {
        if (lastQuery && !isPhoneSearch) {
            await searchByName(lastQuery, page)
        }
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Welcome Section */}
            <div className="flex flex-col gap-2 my-4">
                <h1 className="text-xl font-bold tracking-tight">Welcome to Employee Contact Directory</h1>
                <p className="text-muted-foreground text-sm">
                    Manage efficiently with modern employee contact directory system.
                </p>
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

