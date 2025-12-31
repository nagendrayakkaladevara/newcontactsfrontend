import * as React from "react"
import { contactsService } from "@/services/contacts.service"
import { BloodGroupSelector } from "@/components/blood-groups/blood-group-selector"
import { ContactsList } from "@/components/contacts/contacts-list"
import { PaginationControls } from "@/components/contacts/pagination-controls"
import type { Contact, PaginationMeta } from "@/types/contact"

export function BloodGroups() {
  const [bloodGroups, setBloodGroups] = React.useState<string[]>([])
  const [selectedGroups, setSelectedGroups] = React.useState<string[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  
  // Contacts state
  const [contacts, setContacts] = React.useState<Contact[]>([])
  const [contactsLoading, setContactsLoading] = React.useState(false)
  const [contactsError, setContactsError] = React.useState<string | null>(null)
  const [pagination, setPagination] = React.useState<PaginationMeta | null>(null)
  const [contactsPage, setContactsPage] = React.useState(1)
  const contactsListRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const fetchBloodGroups = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await contactsService.getBloodGroups()
        setBloodGroups(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch blood groups")
        console.error("Error fetching blood groups:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchBloodGroups()
  }, [])

  // Fetch contacts when blood groups are selected
  React.useEffect(() => {
    const fetchContacts = async () => {
      if (selectedGroups.length === 0) {
        setContacts([])
        setPagination(null)
        setContactsError(null)
        return
      }

      try {
        setContactsLoading(true)
        setContactsError(null)
        const response = await contactsService.getContactsByBloodGroup(
          selectedGroups,
          [],
          contactsPage,
          50
        )
        setContacts(response.data)
        setPagination(response.pagination)
      } catch (err) {
        setContactsError(err instanceof Error ? err.message : "Failed to fetch contacts")
        console.error("Error fetching contacts by blood group:", err)
        setContacts([])
        setPagination(null)
      } finally {
        setContactsLoading(false)
      }
    }

    fetchContacts()
  }, [selectedGroups, contactsPage])

  // Reset to page 1 when selection changes
  React.useEffect(() => {
    setContactsPage(1)
  }, [selectedGroups])

  // Scroll to top of contacts list when page changes
  React.useEffect(() => {
    if (contactsPage && contactsListRef.current) {
      const element = contactsListRef.current
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - 10 // 10px above the element
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }, [contactsPage])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">Blood Groups</h1>
        <p className="text-muted-foreground mt-1">
          Tap to select blood groups to filter contacts
        </p>
      </div>

      <BloodGroupSelector
        bloodGroups={bloodGroups}
        selectedGroups={selectedGroups}
        onSelectionChange={setSelectedGroups}
        loading={loading}
        error={error}
      />

      {selectedGroups.length > 0 && (
        <div className="rounded-lg border bg-muted/50 p-4 shadow-sm">
          <p className="text-sm font-semibold mb-2">
            Selected ({selectedGroups.length}):
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedGroups.map((group) => (
              <span
                key={group}
                className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700 dark:bg-red-950/30 dark:text-red-400"
              >
                {group}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Contacts Table */}
      {selectedGroups.length > 0 && (
        <div className="rounded-lg border bg-card shadow-sm" ref={contactsListRef}>
          <div className="border-b p-6">
            <h2 className="text-xl font-semibold">Contacts</h2>
            {pagination && (
              <p className="mt-1 text-sm text-muted-foreground">
                Showing {contacts.length} of {pagination.total} contacts
              </p>
            )}
          </div>
          <div className="p-6">
            <ContactsList
              contacts={contacts}
              loading={contactsLoading}
              error={contactsError}
              hasSearched={true}
            />
          </div>
          {pagination && pagination.totalPages > 1 && (
            <div className="border-t p-6">
              <PaginationControls
                page={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={setContactsPage}
                loading={contactsLoading}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
