# Architecture

This document describes the architecture, project structure, and design patterns used in the Contacts Management System.

## Project Structure

```
newcontactsfrontend/
├── public/                 # Static assets
│   └── vite.svg           # Public assets
├── src/
│   ├── assets/            # Images and media files
│   │   └── indian-railways-logo-*.png
│   ├── components/       # React components
│   │   ├── analytics/     # Analytics-specific components
│   │   │   └── visits-history-chart.tsx
│   │   ├── contacts/      # Contact-related components
│   │   │   ├── contact-actions.tsx
│   │   │   ├── contacts-list.tsx
│   │   │   ├── contacts-search.tsx
│   │   │   └── pagination-controls.tsx
│   │   ├── documents/     # Document components
│   │   │   └── documents-list.tsx
│   │   └── ui/           # Reusable UI components (shadcn)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── chart.tsx
│   │       └── ...
│   ├── config/           # Configuration files
│   │   └── api.ts        # API endpoints configuration
│   ├── hooks/            # Custom React hooks
│   │   ├── use-contacts.ts
│   │   ├── use-contacts-search.ts
│   │   ├── use-contacts-count.ts
│   │   ├── use-visit-count.ts
│   │   └── use-mobile.ts
│   ├── lib/              # Utility libraries
│   │   ├── api-client.ts # HTTP client with error handling
│   │   ├── phone-formatter.ts # Phone number formatting
│   │   └── utils.ts      # General utilities
│   ├── pages/            # Page components
│   │   ├── Home.tsx      # Main search page
│   │   ├── Analytics.tsx  # Analytics dashboard
│   │   ├── Categories.tsx # Category filtering
│   │   ├── Documents.tsx  # Documents page
│   │   ├── BloodGroups.tsx # Blood group page
│   │   └── About.tsx     # About page
│   ├── services/         # API service layer
│   │   ├── contacts.service.ts
│   │   ├── analytics.service.ts
│   │   └── documents.service.ts
│   ├── types/            # TypeScript type definitions
│   │   ├── contact.ts
│   │   ├── analytics.ts
│   │   └── document.ts
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── .env                  # Environment variables (not in repo)
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── README.md             # Main documentation
```

## Architecture Pattern

The project follows a **layered architecture** pattern with clear separation of concerns:

### 1. Presentation Layer
**Location**: `components/`, `pages/`

- React components for UI rendering
- Handles user interactions
- Displays data from hooks/services
- Manages local component state

### 2. Business Logic Layer
**Location**: `hooks/`, `services/`

- Custom hooks for state management
- Service classes for API interactions
- Business logic and data transformations
- Error handling and validation

### 3. Data Access Layer
**Location**: `lib/api-client.ts`

- HTTP client abstraction
- Request/response handling
- Error transformation
- Authentication management

### 4. Configuration Layer
**Location**: `config/`

- API endpoint definitions
- Environment variable management
- Application-wide settings

## Design Patterns

### Service Layer Pattern
Services encapsulate API calls and provide a clean interface:

```typescript
// Example: contacts.service.ts
class ContactsService {
  async searchByName(query: string): Promise<PaginatedContactsResponse>
  async searchByPhone(phone: string): Promise<PaginatedContactsResponse>
}
```

### Custom Hooks Pattern
Hooks encapsulate state management and side effects:

```typescript
// Example: use-contacts-search.ts
function useContactsSearch() {
  // State management
  // API calls
  // Error handling
  return { contacts, loading, error, searchByName, searchByPhone }
}
```

### Component Composition
Reusable UI components in `components/ui/` can be composed:

```typescript
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

## Data Flow

1. **User Interaction** → Component event handler
2. **Component** → Calls custom hook or service
3. **Hook/Service** → Makes API call via api-client
4. **API Client** → Sends HTTP request
5. **Response** → Flows back through layers
6. **State Update** → Component re-renders with new data

## State Management

- **Local State**: `useState` for component-specific state
- **Custom Hooks**: Encapsulate complex state logic
- **Service Layer**: Stateless service classes
- **No Global State**: No Redux/Zustand (not needed for current scope)

## Type Safety

- **Full TypeScript**: All code is typed
- **Type Definitions**: Centralized in `types/` folder
- **Zod Validation**: Runtime type validation
- **Strict Mode**: TypeScript strict mode enabled

## Component Organization

### Atomic Design Principles
- **UI Components** (`components/ui/`): Basic building blocks
- **Feature Components** (`components/contacts/`, etc.): Domain-specific
- **Pages** (`pages/`): Full page compositions

## Best Practices

1. **Separation of Concerns**: Each layer has a specific responsibility
2. **Reusability**: Components and hooks are designed for reuse
3. **Type Safety**: TypeScript ensures compile-time safety
4. **Error Handling**: Comprehensive error handling at each layer
5. **Performance**: Memoization and optimization where needed

