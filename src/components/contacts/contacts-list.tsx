/**
 * ContactsList Component
 * Displays a list of contacts in a table format with loading and error states
 */

import { Contact as ContactIcon, Phone, Building2, Briefcase, HeartPulse } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { ContactActions } from "@/components/contacts/contact-actions"
import { useIsMobile } from "@/hooks/use-mobile"
import { formatPhoneNumber } from "@/lib/phone-formatter"
import type { Contact } from "@/types/contact"

interface ContactsListProps {
  contacts: Contact[]
  loading: boolean
  error: string | null
  hasSearched?: boolean
}

export function ContactsList({ contacts, loading, error, hasSearched = false }: ContactsListProps) {
  const isMobile = useIsMobile()

  // Show loading state
  if (loading) {
    if (isMobile) {
      return (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-lg border bg-card p-3 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <Skeleton className="h-5 w-32 mb-2" />
                  <div className="flex flex-wrap items-center gap-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
                <Skeleton className="h-8 w-16 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      )
    }
    return (
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3 mb-3">
              <Skeleton className="h-5 w-32 flex-1" />
              <Skeleton className="h-8 w-16 rounded-md" />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="rounded-lg border border-destructive bg-destructive/10 p-6 text-center">
        <p className="text-sm font-medium text-destructive">{error}</p>
      </div>
    )
  }

  // Show empty state only if a search has been performed
  if (!loading && contacts.length === 0 && hasSearched) {
    return (
      <div className="rounded-lg border bg-card p-12 text-center shadow-sm">
        <ContactIcon className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No contacts found</h3>
      </div>
    )
  }

  // Don't show anything on initial load before search
  if (!loading && contacts.length === 0 && !hasSearched && !error) {
    return null
  }

  // Mobile card layout
  if (isMobile) {
    return (
      <div className="space-y-2">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="rounded-lg border bg-card p-3 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold mb-2 truncate">{contact.name}</h3>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  {contact.phone && (
                    <div className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 shrink-0" />
                      <span className="font-medium">{formatPhoneNumber(contact.phone)}</span>
                    </div>
                  )}
                  {contact.lobby && (
                    <div className="flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 shrink-0 text-blue-500" />
                      <span>{contact.lobby}</span>
                    </div>
                  )}
                  {contact.designation && (
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5 shrink-0 text-purple-500" />
                      <span>{contact.designation}</span>
                    </div>
                  )}
                  {contact.bloodGroup && (
                    <div className="flex items-center gap-1.5">
                      <HeartPulse className="h-3.5 w-3.5 shrink-0 text-red-500" />
                      <span className="font-medium">{contact.bloodGroup}</span>
                    </div>
                  )}
                </div>
              </div>
              <ContactActions
                phone={contact.phone || ""}
                contactName={contact.name}
              />
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Desktop card layout
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="rounded-lg border bg-card p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="text-base font-semibold truncate flex-1">{contact.name}</h3>
            <ContactActions
              phone={contact.phone || ""}
              contactName={contact.name}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            {contact.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 shrink-0" />
                <span className="font-medium">{formatPhoneNumber(contact.phone)}</span>
              </div>
            )}
            {contact.lobby && (
              <div className="flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 shrink-0 text-blue-500" />
                <span>{contact.lobby}</span>
              </div>
            )}
            {contact.designation && (
              <div className="flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 shrink-0 text-purple-500" />
                <span>{contact.designation}</span>
              </div>
            )}
            {contact.bloodGroup && (
              <div className="flex items-center gap-1.5">
                <HeartPulse className="h-3.5 w-3.5 shrink-0 text-red-500" />
                <span className="font-medium">{contact.bloodGroup}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

