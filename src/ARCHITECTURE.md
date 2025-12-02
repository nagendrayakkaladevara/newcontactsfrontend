# Architecture Documentation

## Overview

This project follows a clean, scalable architecture pattern with clear separation of concerns. The architecture is designed to be maintainable, testable, and easily extensible.

## Project Structure

```
src/
├── types/              # TypeScript type definitions
│   └── contact.ts     # Contact and API response types
├── config/            # Configuration files
│   └── api.ts         # API endpoints and base configuration
├── lib/               # Core utilities and shared code
│   ├── api-client.ts  # HTTP client with error handling
│   └── utils.ts       # Utility functions
├── services/          # Business logic layer
│   └── contacts.service.ts  # Contacts API service
├── hooks/             # Custom React hooks
│   ├── use-contacts.ts       # Hook for fetching contacts
│   └── use-contacts-count.ts # Hook for fetching contacts count
├── components/        # React components
│   ├── contacts/      # Contact-related components
│   │   ├── contacts-list.tsx      # Contacts list display
│   │   └── pagination-controls.tsx # Pagination UI
│   └── ui/            # Reusable UI components
├── pages/             # Page components
│   └── Home.tsx       # Home page
└── App.tsx            # Main application component
```

## Architecture Layers

### 1. Types Layer (`src/types/`)
- **Purpose**: Centralized type definitions
- **Files**: `contact.ts`
- **Responsibilities**:
  - Define TypeScript interfaces for entities
  - Define API request/response types
  - Ensure type safety across the application

### 2. Configuration Layer (`src/config/`)
- **Purpose**: Application configuration
- **Files**: `api.ts`
- **Responsibilities**:
  - API base URL configuration
  - Endpoint definitions
  - Default values and constants

### 3. API Client Layer (`src/lib/`)
- **Purpose**: HTTP communication abstraction
- **Files**: `api-client.ts`
- **Responsibilities**:
  - Centralized HTTP client
  - Request/response interceptors
  - Error handling
  - Timeout management
  - JSON parsing

### 4. Service Layer (`src/services/`)
- **Purpose**: Business logic and API operations
- **Files**: `contacts.service.ts`
- **Responsibilities**:
  - Encapsulate API calls
  - Transform data if needed
  - Provide clean interface for data operations
  - Handle service-specific logic

### 5. Hooks Layer (`src/hooks/`)
- **Purpose**: React data fetching and state management
- **Files**: `use-contacts.ts`, `use-contacts-count.ts`
- **Responsibilities**:
  - Manage loading states
  - Handle errors
  - Provide data to components
  - Implement caching/refetching logic

### 6. Components Layer (`src/components/`)
- **Purpose**: Reusable UI components
- **Structure**:
  - `contacts/`: Feature-specific components
  - `ui/`: Generic UI components (shadcn/ui)
- **Responsibilities**:
  - Present data to users
  - Handle user interactions
  - Maintain component-level state

### 7. Pages Layer (`src/pages/`)
- **Purpose**: Page-level components
- **Files**: `Home.tsx`
- **Responsibilities**:
  - Compose components
  - Handle page-level logic
  - Manage page state

## Data Flow

```
User Action
    ↓
Component (UI Layer)
    ↓
Custom Hook (Hooks Layer)
    ↓
Service (Service Layer)
    ↓
API Client (API Client Layer)
    ↓
Backend API
    ↓
Response flows back up
```

## API Integration

### Endpoints Used

1. **GET /api/contacts/count**
   - Returns total number of contacts
   - Used by: `useContactsCount` hook

2. **GET /api/contacts?page=1&limit=50**
   - Returns paginated list of contacts
   - Query parameters:
     - `page`: Page number (default: 1)
     - `limit`: Items per page (default: 50)
   - Used by: `useContacts` hook

### API Client Features

- **Error Handling**: Custom `ApiError` class with status codes
- **Timeout**: 10-second default timeout
- **Type Safety**: Full TypeScript support
- **JSON Parsing**: Automatic JSON parsing
- **Headers**: Configurable default headers

## Environment Configuration

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000
```

If not set, defaults to `http://localhost:3000`.

## Error Handling

### API Errors
- Custom `ApiError` class extends `Error`
- Includes HTTP status code
- Includes error response data
- Caught and handled in hooks

### Component Error States
- Error messages displayed to users
- Graceful degradation
- Retry mechanisms available

## Loading States

- Components show loading skeletons
- Hooks manage loading state
- Prevents UI flickering
- Better user experience

## Type Safety

- Full TypeScript coverage
- Type definitions for all entities
- Compile-time error checking
- IntelliSense support

## Extensibility

### Adding New Features

1. **Add Types**: Define in `src/types/`
2. **Add Endpoints**: Update `src/config/api.ts`
3. **Add Service Methods**: Extend service in `src/services/`
4. **Add Hooks**: Create custom hook in `src/hooks/`
5. **Add Components**: Create in `src/components/`
6. **Add Pages**: Create in `src/pages/`

### Example: Adding a New Entity

```typescript
// 1. Define types
// src/types/user.ts
export interface User { ... }

// 2. Add endpoints
// src/config/api.ts
export const API_ENDPOINTS = {
  users: { ... }
}

// 3. Create service
// src/services/users.service.ts
export class UsersService { ... }

// 4. Create hook
// src/hooks/use-users.ts
export function useUsers() { ... }

// 5. Create components
// src/components/users/user-list.tsx
```

## Best Practices

1. **Separation of Concerns**: Each layer has a single responsibility
2. **Type Safety**: Always use TypeScript types
3. **Error Handling**: Always handle errors gracefully
4. **Loading States**: Always show loading indicators
5. **Reusability**: Create reusable components and hooks
6. **Documentation**: Document complex logic
7. **Testing**: Write tests for services and hooks (future)

## Future Enhancements

- [ ] Add React Query for advanced caching
- [ ] Add unit tests for services
- [ ] Add integration tests for hooks
- [ ] Add error boundary components
- [ ] Add request/response interceptors for auth
- [ ] Add retry logic for failed requests
- [ ] Add request cancellation
- [ ] Add optimistic updates

