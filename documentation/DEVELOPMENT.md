# Development Guide

Guidelines and best practices for developing the Contacts Management System.

## Development Setup

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher
- Code editor (VS Code recommended)
- Git

### Initial Setup

```bash
# Clone repository
git clone <repository-url>
cd newcontactsfrontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

## Code Style

### TypeScript

- **Strict Mode**: Enabled in `tsconfig.json`
- **Type Coverage**: Aim for 100% type coverage
- **No `any` Types**: Avoid using `any`, use proper types or `unknown`

### Naming Conventions

- **Components**: PascalCase (e.g., `ContactsList.tsx`)
- **Functions/Variables**: camelCase (e.g., `handleSearch`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **Types/Interfaces**: PascalCase (e.g., `Contact`, `ApiResponse`)

### File Organization

```
src/
├── components/     # React components
├── pages/         # Page components
├── hooks/         # Custom hooks
├── services/      # API services
├── types/         # TypeScript types
├── lib/           # Utilities
└── config/        # Configuration
```

## Component Guidelines

### 1. Component Structure

```typescript
// 1. Imports
import { useState } from "react"
import { Button } from "@/components/ui/button"

// 2. Types/Interfaces
interface ComponentProps {
  title: string
}

// 3. Component
export function Component({ title }: ComponentProps) {
  // 4. State
  const [state, setState] = useState()
  
  // 5. Effects
  useEffect(() => {}, [])
  
  // 6. Handlers
  const handleClick = () => {}
  
  // 7. Render
  return <div>{title}</div>
}
```

### 2. Component Best Practices

- **Single Responsibility**: Each component should have one clear purpose
- **Reusability**: Create reusable components in `components/ui/`
- **Props Validation**: Use TypeScript interfaces for props
- **Error Boundaries**: Handle errors gracefully
- **Loading States**: Always show loading indicators
- **Empty States**: Provide helpful empty state messages

### 3. Custom Hooks

Create custom hooks for:
- Data fetching logic
- Complex state management
- Reusable business logic

Example:
```typescript
// hooks/use-contacts-search.ts
export function useContactsSearch() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(false)
  
  const searchByName = async (query: string) => {
    // Implementation
  }
  
  return { contacts, loading, searchByName }
}
```

## Service Layer

### Service Class Pattern

```typescript
// services/contacts.service.ts
export class ContactsService {
  async searchByName(query: string): Promise<PaginatedContactsResponse> {
    const endpoint = API_ENDPOINTS.contacts.searchByName(query)
    return apiClient.get<PaginatedContactsResponse>(endpoint)
  }
}

export const contactsService = new ContactsService()
```

### Best Practices

- **Stateless Services**: Services should not maintain state
- **Error Handling**: Let errors bubble up to components
- **Type Safety**: Use TypeScript for all service methods
- **Singleton Pattern**: Export singleton instances

## State Management

### Local State
Use `useState` for component-specific state:

```typescript
const [query, setQuery] = useState("")
```

### Derived State
Use `useMemo` for expensive computations:

```typescript
const filteredContacts = useMemo(() => {
  return contacts.filter(/* ... */)
}, [contacts, filter])
```

### Side Effects
Use `useEffect` for side effects:

```typescript
useEffect(() => {
  // Side effect
  return () => {
    // Cleanup
  }
}, [dependencies])
```

## Error Handling

### API Errors

```typescript
try {
  const data = await service.getData()
} catch (err) {
  if (err instanceof ApiError) {
    // Handle API error
    setError(err.message)
  } else {
    // Handle unexpected error
    setError("An unexpected error occurred")
  }
}
```

### User-Friendly Messages

Always provide clear, actionable error messages:

```typescript
if (err.status === 404) {
  setError("Contact not found")
} else if (err.status === 500) {
  setError("Server error. Please try again later.")
} else {
  setError("Failed to load data. Please try again.")
}
```

## Performance Optimization

### Memoization

```typescript
// Memoize expensive computations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data)
}, [data])

// Memoize callbacks
const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies])
```

### Code Splitting

```typescript
// Lazy load components
const Analytics = lazy(() => import("@/pages/Analytics"))
```

### Debouncing

```typescript
// Debounce search input
useEffect(() => {
  const timer = setTimeout(() => {
    performSearch(query)
  }, 500)
  return () => clearTimeout(timer)
}, [query])
```

## Testing Considerations

### Component Testing
- Test user interactions
- Test loading states
- Test error states
- Test empty states

### Integration Testing
- Test API integration
- Test data flow
- Test error handling

## Adding New Features

### Step-by-Step Process

1. **Define Types** (`src/types/`)
   ```typescript
   export interface NewFeature {
     id: string
     name: string
   }
   ```

2. **Add API Endpoint** (`src/config/api.ts`)
   ```typescript
   newFeature: (id: string) => `/api/feature/${id}`
   ```

3. **Create Service Method** (`src/services/`)
   ```typescript
   async getNewFeature(id: string): Promise<NewFeature> {
     const endpoint = API_ENDPOINTS.newFeature(id)
     return apiClient.get<NewFeature>(endpoint)
   }
   ```

4. **Create Custom Hook** (`src/hooks/`)
   ```typescript
   export function useNewFeature() {
     // State and logic
   }
   ```

5. **Build UI Component** (`src/components/`)
   ```typescript
   export function NewFeatureComponent() {
     // Component implementation
   }
   ```

6. **Add Page/Route** (`src/pages/`, `src/App.tsx`)
   ```typescript
   <Route path="/new-feature" element={<NewFeaturePage />} />
   ```

## Code Review Checklist

- [ ] TypeScript types are properly defined
- [ ] Error handling is implemented
- [ ] Loading states are shown
- [ ] Empty states are handled
- [ ] Code follows naming conventions
- [ ] Components are reusable where possible
- [ ] Performance optimizations are applied
- [ ] Accessibility is considered
- [ ] Documentation is updated

## Common Patterns

### Data Fetching Pattern

```typescript
const [data, setData] = useState<Data | null>(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await service.getData()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch")
    } finally {
      setLoading(false)
    }
  }
  fetchData()
}, [])
```

### Form Handling Pattern

```typescript
const [formData, setFormData] = useState({ name: "" })

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  try {
    await service.createItem(formData)
    // Success handling
  } catch (err) {
    // Error handling
  }
}
```

## Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)

