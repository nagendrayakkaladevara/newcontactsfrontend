/**
 * ContactsList Component
 * Displays a list of contacts in a table format with loading and error states
 */

import { Contact as ContactIcon } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-lg border bg-card p-4 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-8 w-16 rounded-md" />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-28" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    }
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="h-9">Name</TableHead>
              <TableHead className="h-9">Phone</TableHead>
              <TableHead className="h-9">Lobby</TableHead>
              <TableHead className="h-9">Blood Group</TableHead>
              <TableHead className="h-9">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell className="h-9 py-2">
                  <Skeleton className="h-4 w-36" />
                </TableCell>
                <TableCell className="h-9 py-2">
                  <Skeleton className="h-4 w-28" />
                </TableCell>
                <TableCell className="h-9 py-2">
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell className="h-9 py-2">
                  <Skeleton className="h-4 w-12" />
                </TableCell>
                <TableCell className="h-9 py-2">
                  <Skeleton className="h-8 w-20" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
      <div className="space-y-3">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="rounded-lg border bg-card p-4 shadow-sm"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-base font-semibold">{contact.name}</h3>
              <ContactActions
                phone={contact.phone || ""}
                contactName={contact.name}
              />
            </div>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span className="text-muted-foreground font-bold">{contact.phone ? formatPhoneNumber(contact.phone) : "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lobby:</span>
                <span>{contact.lobby || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Blood Group:</span>
                <span>{contact.bloodGroup || "-"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Desktop table layout
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="h-9">Name</TableHead>
            <TableHead className="h-9">Phone</TableHead>
            <TableHead className="h-9">Lobby</TableHead>
            <TableHead className="h-9">Blood Group</TableHead>
            <TableHead className="h-9">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell className="h-9 py-2 font-medium">{contact.name}</TableCell>
              <TableCell className="h-9 py-2">
                {contact.phone ? formatPhoneNumber(contact.phone) : "-"}
              </TableCell>
              <TableCell className="h-9 py-2">{contact.lobby || "-"}</TableCell>
              <TableCell className="h-9 py-2">{contact.bloodGroup || "-"}</TableCell>
              <TableCell className="h-9 py-2">
                <ContactActions
                  phone={contact.phone || ""}
                  contactName={contact.name}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

