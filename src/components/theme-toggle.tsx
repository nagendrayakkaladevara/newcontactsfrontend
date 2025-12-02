import * as React from "react"
import { Moon, Sun } from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type Theme = "light" | "dark"

// Initialize theme on page load to prevent flash
function getInitialTheme(): Theme {
  // Check localStorage first - prioritize user's saved preference
  const savedTheme = localStorage.getItem("theme") as Theme | null
  if (savedTheme) {
    return savedTheme
  }
  // Default to light theme if no saved preference
  return "light"
}

// Apply theme immediately (before React renders)
const initialTheme = getInitialTheme()
if (initialTheme === "dark") {
  document.documentElement.classList.add("dark")
} else {
  document.documentElement.classList.remove("dark")
}

export function ThemeToggle() {
  // Initialize from localStorage only, ignore system preference changes
  const [theme, setTheme] = React.useState<Theme>(() => {
    const saved = localStorage.getItem("theme") as Theme | null
    return saved || initialTheme
  })
  const isUserInitiatedRef = React.useRef(false)
  const clickTimestampRef = React.useRef(0)

  // Apply theme changes
  React.useEffect(() => {
    const root = document.documentElement
    
    // Always apply the current theme state to DOM
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    
    // Only update localStorage if this was a user-initiated change
    if (isUserInitiatedRef.current) {
      localStorage.setItem("theme", theme)
      isUserInitiatedRef.current = false
    }
  }, [theme])

  const handleClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    // Verify this is a real click event
    if (event.type !== "click") {
      return
    }
    
    // Prevent rapid clicks (debounce)
    const now = Date.now()
    if (now - clickTimestampRef.current < 100) {
      return
    }
    clickTimestampRef.current = now
    
    // Verify the event originated from the button itself
    const buttonElement = event.currentTarget
    const clickedElement = event.target as HTMLElement
    
    // Only proceed if click is directly on button or its direct children
    if (!buttonElement.contains(clickedElement)) {
      return
    }
    
    // Verify this is a genuine user click (not programmatic)
    if (event.detail === 0) {
      return // Programmatic click
    }
    
    // Mark as user-initiated
    isUserInitiatedRef.current = true
    
    // Stop event propagation to prevent any side effects
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
    
    // Toggle theme
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }, [])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton 
          onClick={handleClick}
          type="button"
          onKeyDown={(e) => {
            // Only allow Enter or Space to trigger toggle
            if (e.key === "Enter" || e.key === " ") {
              isUserInitiatedRef.current = true
            } else {
              e.preventDefault()
            }
          }}
        >
          {theme === "light" ? (
            <>
              <Moon className="size-4" />
              <span>Dark Mode</span>
            </>
          ) : (
            <>
              <Sun className="size-4" />
              <span>Light Mode</span>
            </>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

