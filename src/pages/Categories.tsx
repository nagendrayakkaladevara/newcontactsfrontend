import { ContactsList } from "@/components/contacts/contacts-list"
import { PaginationControls } from "@/components/contacts/pagination-controls"
import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Users, Folder, HeartPulse, Briefcase, Building2, Hotel, Train } from "lucide-react"
import { BloodGroupSelector } from "@/components/blood-groups/blood-group-selector"
import { DivisionSelector } from "@/components/divisions/division-selector"
import { DesignationSelector } from "@/components/designations/designation-selector"
import { contactsService } from "@/services/contacts.service"
import type { Contact, PaginationMeta } from "@/types/contact"

interface Category {
  id: string
  name: string
  icon: React.ReactNode
  description: string
}

const categories: Category[] = [
  {
    id: "all-contacts",
    name: "All Contacts",
    icon: <Users className="h-6 w-6" />,
    description: "Filter contacts by blood group, lobby, and/or designation",
  },
  {
    id: "blood-group",
    name: "Blood Group",
    icon: <HeartPulse type="h-6 w-6" />,
    description: "Blood Group contacts are sorted by blood group",
  },
  {
    id: "division",
    name: "Division/Designation",
    icon: <Briefcase className="h-6 w-6" />,
    description: "Filter contacts by division (lobby) and/or designation",
  },
  {
    id: "emergency-contacts",
    name: "Emergency Contacts",
    icon: <Folder className="h-6 w-6" />,
    description: "Emergency contacts",
  },
  {
    id: "hotels",
    name: "Hotels",
    icon: <Hotel className="h-6 w-6" />,
    description: "View all hotel contacts",
  },
  {
    id: "stations",
    name: "Stations",
    icon: <Train className="h-6 w-6" />,
    description: "View all station contacts",
  },
]

export function Categories() {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedCategory = searchParams.get("category")
  const [contactsPage, setContactsPage] = useState(1)
  const [bloodGroups, setBloodGroups] = useState<string[]>([])
  const [selectedBloodGroups, setSelectedBloodGroups] = useState<string[]>([])
  const [bloodGroupsLoading, setBloodGroupsLoading] = useState(false)
  const [bloodGroupsError, setBloodGroupsError] = useState<string | null>(null)
  
  const [lobbies, setLobbies] = useState<string[]>([])
  const [selectedLobbies, setSelectedLobbies] = useState<string[]>([])
  const [lobbiesLoading, setLobbiesLoading] = useState(false)
  const [lobbiesError, setLobbiesError] = useState<string | null>(null)
  
  const [designations, setDesignations] = useState<string[]>([])
  const [selectedDesignations, setSelectedDesignations] = useState<string[]>([])
  const [designationsLoading, setDesignationsLoading] = useState(false)
  const [designationsError, setDesignationsError] = useState<string | null>(null)
  
  // Contacts state
  const [contacts, setContacts] = useState<Contact[]>([])
  const [contactsLoading, setContactsLoading] = useState(false)
  const [contactsError, setContactsError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<PaginationMeta | null>(null)
  const contactsListRef = useRef<HTMLDivElement>(null)

  // Fetch blood groups and lobbies when blood-group category is selected
  useEffect(() => {
    if (selectedCategory === "blood-group") {
      const fetchBloodGroups = async () => {
        try {
          setBloodGroupsLoading(true)
          setBloodGroupsError(null)
          const data = await contactsService.getBloodGroups()
          setBloodGroups(data)
        } catch (err) {
          setBloodGroupsError(err instanceof Error ? err.message : "Failed to fetch blood groups")
          console.error("Error fetching blood groups:", err)
        } finally {
          setBloodGroupsLoading(false)
        }
      }

      const fetchLobbies = async () => {
        try {
          setLobbiesLoading(true)
          setLobbiesError(null)
          const data = await contactsService.getLobbies()
          setLobbies(data)
        } catch (err) {
          setLobbiesError(err instanceof Error ? err.message : "Failed to fetch lobbies")
          console.error("Error fetching lobbies:", err)
        } finally {
          setLobbiesLoading(false)
        }
      }

      fetchBloodGroups()
      fetchLobbies()
    } else {
      // Reset blood groups when switching away from blood-group category
      setBloodGroups([])
      setSelectedBloodGroups([])
      // Don't reset lobbies here as they might be used by division category
    }
  }, [selectedCategory])

  // Fetch lobbies and designations when division category is selected
  useEffect(() => {
    if (selectedCategory === "division") {
      const fetchLobbies = async () => {
        try {
          setLobbiesLoading(true)
          setLobbiesError(null)
          const data = await contactsService.getLobbies()
          setLobbies(data)
        } catch (err) {
          setLobbiesError(err instanceof Error ? err.message : "Failed to fetch lobbies")
          console.error("Error fetching lobbies:", err)
        } finally {
          setLobbiesLoading(false)
        }
      }

      const fetchDesignations = async () => {
        try {
          setDesignationsLoading(true)
          setDesignationsError(null)
          const data = await contactsService.getDesignations()
          setDesignations(data)
        } catch (err) {
          setDesignationsError(err instanceof Error ? err.message : "Failed to fetch designations")
          console.error("Error fetching designations:", err)
        } finally {
          setDesignationsLoading(false)
        }
      }

      fetchLobbies()
      fetchDesignations()
    } else {
      // Reset lobbies and designations when switching away from division category
      setLobbies([])
      setSelectedLobbies([])
      setDesignations([])
      setSelectedDesignations([])
    }
  }, [selectedCategory])

  // Fetch all filter options when all-contacts category is selected
  useEffect(() => {
    if (selectedCategory === "all-contacts") {
      const fetchAllOptions = async () => {
        // Fetch blood groups
        try {
          setBloodGroupsLoading(true)
          setBloodGroupsError(null)
          const bgData = await contactsService.getBloodGroups()
          setBloodGroups(bgData)
        } catch (err) {
          setBloodGroupsError(err instanceof Error ? err.message : "Failed to fetch blood groups")
          console.error("Error fetching blood groups:", err)
        } finally {
          setBloodGroupsLoading(false)
        }

        // Fetch lobbies
        try {
          setLobbiesLoading(true)
          setLobbiesError(null)
          const lobbyData = await contactsService.getLobbies()
          setLobbies(lobbyData)
        } catch (err) {
          setLobbiesError(err instanceof Error ? err.message : "Failed to fetch lobbies")
          console.error("Error fetching lobbies:", err)
        } finally {
          setLobbiesLoading(false)
        }

        // Fetch designations
        try {
          setDesignationsLoading(true)
          setDesignationsError(null)
          const desData = await contactsService.getDesignations()
          setDesignations(desData)
        } catch (err) {
          setDesignationsError(err instanceof Error ? err.message : "Failed to fetch designations")
          console.error("Error fetching designations:", err)
        } finally {
          setDesignationsLoading(false)
        }
      }

      fetchAllOptions()
    } else if (selectedCategory !== "blood-group" && selectedCategory !== "division") {
      // Reset all filters when switching away from all-contacts
      setBloodGroups([])
      setSelectedBloodGroups([])
      setLobbies([])
      setSelectedLobbies([])
      setDesignations([])
      setSelectedDesignations([])
      setContacts([])
      setPagination(null)
      setContactsError(null)
    }
  }, [selectedCategory])

  // Fetch contacts by blood group and/or lobby when selections are made
  useEffect(() => {
    const fetchContacts = async () => {
      // Only fetch if blood-group category is selected
      if (selectedCategory !== "blood-group") {
        return
      }

      // If neither blood groups nor lobbies selected, show empty state
      if (selectedBloodGroups.length === 0 && selectedLobbies.length === 0) {
        setContacts([])
        setPagination(null)
        setContactsError(null)
        return
      }

      try {
        setContactsLoading(true)
        setContactsError(null)
        const response = await contactsService.getContactsByBloodGroup(
          selectedBloodGroups,
          selectedLobbies,
          contactsPage,
          50
        )
        setContacts(response.data)
        setPagination(response.pagination)
      } catch (err) {
        setContactsError(err instanceof Error ? err.message : "Failed to fetch contacts")
        console.error("Error fetching contacts by blood group/lobby:", err)
        setContacts([])
        setPagination(null)
      } finally {
        setContactsLoading(false)
      }
    }

    fetchContacts()
  }, [selectedBloodGroups, selectedLobbies, contactsPage, selectedCategory])

  // Fetch contacts by lobby and/or designation when selections are made
  useEffect(() => {
    const fetchContacts = async () => {
      // Only fetch if division category is selected
      if (selectedCategory !== "division") {
        return
      }

      // If neither lobbies nor designations selected, show empty state
      if (selectedLobbies.length === 0 && selectedDesignations.length === 0) {
        setContacts([])
        setPagination(null)
        setContactsError(null)
        return
      }

      try {
        setContactsLoading(true)
        setContactsError(null)
        const response = await contactsService.getContactsByLobby(
          selectedLobbies,
          selectedDesignations,
          contactsPage,
          50
        )
        setContacts(response.data)
        setPagination(response.pagination)
      } catch (err) {
        setContactsError(err instanceof Error ? err.message : "Failed to fetch contacts")
        console.error("Error fetching contacts by lobby/designation:", err)
        setContacts([])
        setPagination(null)
      } finally {
        setContactsLoading(false)
      }
    }

    fetchContacts()
  }, [selectedLobbies, selectedDesignations, contactsPage, selectedCategory])

  // Fetch contacts using unified filter when all-contacts category is selected
  useEffect(() => {
    const fetchContacts = async () => {
      // Only fetch if all-contacts category is selected
      if (selectedCategory !== "all-contacts") {
        return
      }

      // If no filters selected, show empty state
      if (
        selectedBloodGroups.length === 0 &&
        selectedLobbies.length === 0 &&
        selectedDesignations.length === 0
      ) {
        setContacts([])
        setPagination(null)
        setContactsError(null)
        return
      }

      try {
        setContactsLoading(true)
        setContactsError(null)
        const response = await contactsService.filterContacts(
          selectedBloodGroups,
          selectedLobbies,
          selectedDesignations,
          contactsPage,
          50
        )
        setContacts(response.data)
        setPagination(response.pagination)
      } catch (err) {
        setContactsError(err instanceof Error ? err.message : "Failed to fetch contacts")
        console.error("Error fetching filtered contacts:", err)
        setContacts([])
        setPagination(null)
      } finally {
        setContactsLoading(false)
      }
    }

    fetchContacts()
  }, [selectedBloodGroups, selectedLobbies, selectedDesignations, contactsPage, selectedCategory])

  // Fetch contacts for Hotels category
  useEffect(() => {
    const fetchContacts = async () => {
      if (selectedCategory !== "hotels") {
        return
      }

      try {
        setContactsLoading(true)
        setContactsError(null)
        const response = await contactsService.filterContacts(
          [],
          [],
          ["HOTEL"],
          contactsPage,
          50
        )
        setContacts(response.data)
        setPagination(response.pagination)
      } catch (err) {
        setContactsError(err instanceof Error ? err.message : "Failed to fetch hotel contacts")
        console.error("Error fetching hotel contacts:", err)
        setContacts([])
        setPagination(null)
      } finally {
        setContactsLoading(false)
      }
    }

    fetchContacts()
  }, [contactsPage, selectedCategory])

  // Fetch contacts for Stations category
  useEffect(() => {
    const fetchContacts = async () => {
      if (selectedCategory !== "stations") {
        return
      }

      try {
        setContactsLoading(true)
        setContactsError(null)
        const response = await contactsService.filterContacts(
          [],
          [],
          ["STATION"],
          contactsPage,
          50
        )
        setContacts(response.data)
        setPagination(response.pagination)
      } catch (err) {
        setContactsError(err instanceof Error ? err.message : "Failed to fetch station contacts")
        console.error("Error fetching station contacts:", err)
        setContacts([])
        setPagination(null)
      } finally {
        setContactsLoading(false)
      }
    }

    fetchContacts()
  }, [contactsPage, selectedCategory])

  // Reset to page 1 when selection changes
  useEffect(() => {
    setContactsPage(1)
  }, [selectedBloodGroups, selectedLobbies, selectedDesignations])

  // Scroll to top of contacts list when page changes and content is loaded
  useEffect(() => {
    if (contactsPage && !contactsLoading) {
      // Use setTimeout to ensure DOM is updated after content loads
      const timer = setTimeout(() => {
        if (contactsListRef.current) {
          contactsListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
          // Fallback: scroll to top of page
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }, 150)
      
      return () => clearTimeout(timer)
    }
  }, [contactsPage, contactsLoading])

  const handleCategoryClick = (categoryId: string) => {
    setSearchParams({ category: categoryId })
    setContactsPage(1)
  }

  const handleBack = () => {
    setSearchParams({})
    setContactsPage(1)
  }

  // Show category detail view
  if (selectedCategory) {
    const category = categories.find((cat) => cat.id === selectedCategory)
    const isAllContactsCategory = selectedCategory === "all-contacts"
    const isBloodGroupCategory = selectedCategory === "blood-group"
    const isDivisionCategory = selectedCategory === "division"
    const isHotelsCategory = selectedCategory === "hotels"
    const isStationsCategory = selectedCategory === "stations"
    
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight">
                {category?.name || "Category"}
              </h1>
              {selectedCategory === "emergency-contacts" && (
                <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                  Coming Soon
                </span>
              )}
            </div>
            <p className="text-muted-foreground text-sm">
              {category?.description || "View contacts in this category"}
            </p>
          </div>
        </div>

        {/* Unified Filter for All Contacts */}
        {isAllContactsCategory && (
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="mb-4">
              <h2 className="text-base font-semibold mb-1">Filters</h2>
              <p className="text-xs text-muted-foreground">
                Select filters to find contacts
              </p>
            </div>
            
            <div className="space-y-4">
              {/* Lobby Filter */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="h-4 w-4 text-blue-500" />
                  <h3 className="text-sm font-medium">Lobby</h3>
                </div>
                <DivisionSelector
                  divisions={lobbies}
                  selectedDivisions={selectedLobbies}
                  onSelectionChange={setSelectedLobbies}
                  loading={lobbiesLoading}
                  error={lobbiesError}
                />
              </div>

              {/* Designation Filter */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="h-4 w-4 text-purple-500" />
                  <h3 className="text-sm font-medium">Designation</h3>
                </div>
                <DesignationSelector
                  designations={designations}
                  selectedDesignations={selectedDesignations}
                  onSelectionChange={setSelectedDesignations}
                  loading={designationsLoading}
                  error={designationsError}
                />
              </div>

              {/* Blood Group Filter */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <HeartPulse className="h-4 w-4 text-red-500" />
                  <h3 className="text-sm font-medium">Blood Group</h3>
                </div>
                <BloodGroupSelector
                  bloodGroups={bloodGroups}
                  selectedGroups={selectedBloodGroups}
                  onSelectionChange={setSelectedBloodGroups}
                  loading={bloodGroupsLoading}
                  error={bloodGroupsError}
                />
              </div>
            </div>
          </div>
        )}

        {/* Blood Groups Selector */}
        {isBloodGroupCategory && (
          <>
            <div className="rounded-lg border bg-card p-4 shadow-sm sm:p-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold sm:text-xl mb-1">
                  Filter by Blood Group
                </h2>
                <p className="text-sm text-muted-foreground">
                  Select one or more blood groups to filter contacts
                </p>
              </div>
              <BloodGroupSelector
                bloodGroups={bloodGroups}
                selectedGroups={selectedBloodGroups}
                onSelectionChange={setSelectedBloodGroups}
                loading={bloodGroupsLoading}
                error={bloodGroupsError}
              />
            </div>

            <div className="rounded-lg border bg-card p-4 shadow-sm sm:p-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold sm:text-xl mb-1">
                  Filter by Lobby
                </h2>
                <p className="text-sm text-muted-foreground">
                  Optionally select one or more lobbies to further filter contacts
                </p>
              </div>
              <DivisionSelector
                divisions={lobbies}
                selectedDivisions={selectedLobbies}
                onSelectionChange={setSelectedLobbies}
                loading={lobbiesLoading}
                error={lobbiesError}
              />
            </div>
          </>
        )}

        {/* Lobbies & Designations Selector */}
        {isDivisionCategory && (
          <>
            <div className="rounded-lg border bg-card p-4 shadow-sm sm:p-6">
              <div className="mb-4">
                <h2 className="text-sm font-semibold sm:text-xl mb-1">
                  Filter by Lobby
                </h2>
              </div>
              <DivisionSelector
                divisions={lobbies}
                selectedDivisions={selectedLobbies}
                onSelectionChange={setSelectedLobbies}
                loading={lobbiesLoading}
                error={lobbiesError}
              />
            </div>

            <div className="rounded-lg border bg-card p-4 shadow-sm sm:p-6">
              <div className="mb-4">
                <h2 className="text-sm font-semibold sm:text-xl mb-1">
                  Filter by Designation
                </h2>
              </div>
              <DesignationSelector
                designations={designations}
                selectedDesignations={selectedDesignations}
                onSelectionChange={setSelectedDesignations}
                loading={designationsLoading}
                error={designationsError}
              />
            </div>
          </>
        )}

        {/* Contacts Table */}
        {isAllContactsCategory ? (
          selectedBloodGroups.length > 0 || selectedLobbies.length > 0 || selectedDesignations.length > 0 ? (
            <div className="" ref={contactsListRef}>
              <div className="">
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
          ) : (
            <div className="rounded-lg border bg-card p-12 text-center shadow-sm">
              <Users className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">Apply Filters</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Select one or more filters above to view contacts. You can combine blood groups, lobbies, and designations.
              </p>
            </div>
          )
        ) : isBloodGroupCategory ? (
          selectedBloodGroups.length > 0 || selectedLobbies.length > 0 ? (
            <div className="" ref={contactsListRef}>
              <div className="">
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
          ) : (
            <div className="rounded-lg border bg-card p-12 text-center shadow-sm">
              <HeartPulse className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">Select Blood Groups or Lobbies</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Choose one or more blood groups and/or lobbies above to view contacts
              </p>
            </div>
          )
        ) : isDivisionCategory ? (
          selectedLobbies.length > 0 || selectedDesignations.length > 0 ? (
            <div className="" ref={contactsListRef}>
              <div className="">
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
          ) : (
            <div className="rounded-lg border bg-card p-12 text-center shadow-sm">
              <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">Select Lobbies or Designations</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Choose one or more lobbies and/or designations above to view contacts
              </p>
            </div>
          )
        ) : isHotelsCategory || isStationsCategory ? (
          <div className="" ref={contactsListRef}>
            <div className="">
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
        ) : (
          <div className="">
            <div className="">
              <ContactsList
                contacts={contacts}
                loading={contactsLoading}
                error={contactsError}
                hasSearched={true}
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  // Show category cards
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
        <p className="text-muted-foreground">
          Select a category to view contacts.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className="group rounded-lg border bg-card p-6 text-left shadow-sm transition-all hover:shadow-md hover:border-primary/50 relative"
          >
            {category.id === "emergency-contacts" && (
              <span className="absolute top-3 right-3 inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                Coming Soon
              </span>
            )}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                {category.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {category.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

