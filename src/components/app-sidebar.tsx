import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { ExternalLink } from "lucide-react"

import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"

// Navigation data for Contacts App
const data = {
  versions: ["1.0.0", "1.1.0-beta", "2.0.0-alpha"],
  navMain: [
    {
      title: "Menu",
      url: "#",
      items: [
        {
          title: "Home",
          url: "/",
        },
        {
          title: "Categories",
          url: "/categories",
        },
        {
          title: "Documents",
          url: "/documents",
        },
        {
          title: "Analytics",
          url: "/analytics",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation()
  const { setOpenMobile, isMobile } = useSidebar()

  const handleLinkClick = () => {
    // Close mobile sidebar when a link is clicked
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((navItem) => (
                  <SidebarMenuItem key={navItem.title}>
                    <SidebarMenuButton asChild isActive={location.pathname === navItem.url}>
                      <Link to={navItem.url} onClick={handleLinkClick}>
                        {navItem.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => {
                  window.open("https://crewcontactsrailway.netlify.app/", "_blank")
                  if (isMobile) {
                    setOpenMobile(false)
                  }
                }}
              >
                <ExternalLink className="h-4 w-4" />
                <span>Open Legacy App</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <ThemeToggle />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
