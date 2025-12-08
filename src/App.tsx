import { BrowserRouter, Routes, Route, useLocation, useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home } from "@/pages/Home"
import { Analytics } from "@/pages/Analytics"
import { Categories } from "@/pages/Categories"
import { Documents } from "@/pages/Documents"
import { BloodGroups } from "@/pages/BloodGroups"
import { About } from "@/pages/About"
import { Link } from "react-router-dom"
import { analyticsService } from "@/services/analytics.service"

function AppHeader() {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const category = searchParams.get("category")

  const getBreadcrumbs = () => {
    const path = location.pathname
    const breadcrumbs = [
      {
        label: "Home",
        path: "/",
        isActive: path === "/",
      },
    ]

    if (path === "/categories") {
      breadcrumbs.push({
        label: "Categories",
        path: "/categories",
        isActive: !category,
      })

      if (category) {
        const categoryName = category
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
        breadcrumbs.push({
          label: categoryName,
          path: `/categories?category=${category}`,
          isActive: true,
        })
      }
    } else if (path === "/documents") {
      breadcrumbs.push({
        label: "Documents",
        path: "/documents",
        isActive: true,
      })
    } else if (path === "/analytics") {
      breadcrumbs.push({
        label: "Analytics",
        path: "/analytics",
        isActive: true,
      })
    } else if (path === "/blood-groups") {
      breadcrumbs.push({
        label: "Blood Groups",
        path: "/blood-groups",
        isActive: true,
      })
    } else if (path === "/about") {
      breadcrumbs.push({
        label: "About App",
        path: "/about",
        isActive: true,
      })
    }

    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs()

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.path} className="flex items-center">
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {crumb.isActive ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={crumb.path}>{crumb.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  )
}

function App() {
  // Increment visit count when app loads
  useEffect(() => {
    const trackVisit = async () => {
      try {
        await analyticsService.incrementVisitCount()
      } catch (error) {
        // Silently fail - don't interrupt app loading if visit tracking fails
        console.error("Failed to track visit:", error)
      }
    }
    trackVisit()
  }, [])

  return (
    <BrowserRouter>
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
          <AppHeader />
          <div className="flex flex-1 flex-col gap-4 p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/blood-groups" element={<BloodGroups />} />
              <Route path="/about" element={<About />} />
            </Routes>
        </div>
      </SidebarInset>
    </SidebarProvider>
    </BrowserRouter>
  )
}

export default App
