# Contacts App Frontend

A modern, scalable React + TypeScript contacts management application with a clean architecture.

## Features

### 🔍 Search & Discovery
- **Debounced Search** - Real-time search with 500ms debounce delay (no button needed)
- **Name Search** - Search contacts by name with automatic results
- **Phone Search** - Coming soon (currently disabled with badge)
- **Clear Search** - One-click clear button to reset search
- **Race Condition Handling** - Prevents duplicate API calls and handles concurrent searches
- **Input Validation** - Zod schema validation for search queries

### 📱 Navigation & Layout
- **Responsive Sidebar** - Collapsible sidebar with keyboard shortcuts (`Ctrl/Cmd + B`)
- **Legacy App Link** - Quick access to legacy application from sidebar
- **Breadcrumb Navigation** - Clear page hierarchy and navigation
- **Mobile Responsive** - Optimized for desktop, tablet, and mobile devices

### 👥 Contact Management
- **Contact Cards** - Sleek, modern card design displaying:
  - Contact name
  - Phone number (with formatting)
  - Lobby (with building icon)
  - Designation (with briefcase icon)
  - Blood group (with heart icon)
- **Contact Actions** - Quick actions for each contact:
  - Copy phone number
  - Direct call functionality
- **Pagination** - Efficient pagination for large contact lists
- **Empty States** - User-friendly messages when no contacts found

### 🏷️ Category & Filtering
- **Category System** - Organized contact browsing:
  - All Contacts (unified filtering)
  - Blood Group filtering
  - Division/Designation filtering
  - Emergency Contacts (coming soon)
- **Multi-Filter Support** - Filter by:
  - Blood Group
  - Lobby (Division)
  - Designation
- **Filter Order** - Organized as: Lobby → Designation → Blood Group
- **Combined Filters** - Apply multiple filters simultaneously
- **Filter Badges** - Visual indicators for selected filters

### 📊 Analytics Dashboard
- **Visit Tracking** - Automatic visit count increment on app load
- **Statistics Overview** - Comprehensive analytics including:
  - Total contacts
  - Contacts with/without blood group
  - Contacts with/without lobby
  - Coverage percentages
- **Distribution Charts** - Visual representation of:
  - Blood group distribution
  - Lobby distribution
  - Designation distribution
- **Growth Analytics** - Contact growth over time (configurable days)
- **Recent Contacts** - Display of recently added contacts

### 📁 Documents Management
- **Document Cards** - Clean, horizontal card layout
- **Document Search** - Search documents by title
- **External Links** - Direct links to view documents
- **Document Icons** - Visual file indicators
- **Empty States** - Helpful messages when no documents available

### 🎨 User Interface
- **Modern Design** - Built with shadcn/ui components
- **Sleek Cards** - Minimalist card designs for contacts and documents
- **Theme Support** - Light theme as default (dark mode toggle available)
- **Loading States** - Skeleton loaders for better UX
- **Error Handling** - Retry buttons for failed API calls
- **Icons** - Lucide React icons throughout the app
- **Hover Effects** - Smooth transitions and interactions

### ⚡ Performance & Reliability
- **Debounced Search** - Prevents excessive API calls
- **Race Condition Prevention** - Handles concurrent requests properly
- **Request Cancellation** - Cancels outdated requests
- **Component Cleanup** - Proper cleanup on unmount
- **Loading States** - Visual feedback during operations
- **Error Recovery** - Retry mechanisms for failed requests

### 🔒 Type Safety & Code Quality
- **Full TypeScript** - Complete type coverage
- **Zod Validation** - Runtime validation for inputs
- **Error Handling** - Custom API error classes
- **Clean Architecture** - Layered architecture pattern
- **Reusable Components** - Modular component structure

### 📈 Tracking & Analytics
- **Visit Count API** - Automatic visit tracking on app load
- **Thread-Safe Counting** - Server-side visit increment
- **Analytics Integration** - Comprehensive analytics endpoints

## Architecture

This project follows a clean, layered architecture pattern:

```
src/
├── types/          # TypeScript type definitions
├── config/         # Configuration (API endpoints)
├── lib/            # Core utilities (API client)
├── services/       # Business logic layer
├── hooks/          # Custom React hooks
├── components/     # UI components
└── pages/          # Page components
```

See [ARCHITECTURE.md](./src/ARCHITECTURE.md) for detailed documentation.

## API Integration

### Endpoints

- `GET /api/contacts/count` - Get total contacts count
- `GET /api/contacts?page=1&limit=50` - Get paginated contacts

### Configuration

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Default: `http://localhost:3000`

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

### Core Layers

1. **Types** (`src/types/`) - TypeScript interfaces and types
2. **Config** (`src/config/`) - API configuration and endpoints
3. **API Client** (`src/lib/api-client.ts`) - HTTP client with error handling
4. **Services** (`src/services/`) - Business logic and API operations
5. **Hooks** (`src/hooks/`) - Custom React hooks for data fetching
6. **Components** (`src/components/`) - Reusable UI components
7. **Pages** (`src/pages/`) - Page-level components

### Key Files

- `src/App.tsx` - Main application with sidebar layout
- `src/pages/Home.tsx` - Home page with contacts dashboard
- `src/services/contacts.service.ts` - Contacts API service
- `src/hooks/use-contacts.ts` - Hook for fetching contacts
- `src/hooks/use-contacts-count.ts` - Hook for contacts count

## Features in Detail

### Sidebar Navigation

- Collapsible sidebar (desktop & mobile)
- Keyboard shortcut: `Ctrl/Cmd + B`
- Search functionality
- Organized navigation groups

### Contacts Dashboard

- Total contacts count
- Groups, favorites, and recent statistics
- Quick action buttons
- Paginated contacts list

### Error Handling

- Graceful error messages
- Loading states with skeletons
- Retry mechanisms
- User-friendly error display

## Technology Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons

## Development Guidelines

1. Follow the layered architecture pattern
2. Use TypeScript for all new code
3. Create reusable components and hooks
4. Handle errors gracefully
5. Show loading states
6. Document complex logic

## Current Status

### ✅ Fully Implemented Features
- **Contact Search** - Debounced name search with automatic results
- **Contact Display** - Modern card-based layout with all contact details
- **Category Filtering** - Filter by blood group, lobby, and designation
- **Analytics Dashboard** - Complete analytics with charts and statistics
- **Visit Tracking** - Automatic visit count on app load
- **Documents Management** - View and search documents
- **Error Handling** - Retry buttons for failed API calls
- **Responsive Design** - Works on all device sizes
- **Theme Support** - Light theme default with dark mode option
- **Loading States** - Skeleton loaders and loading indicators
- **Input Validation** - Zod schema validation
- **Race Condition Handling** - Prevents duplicate API calls
- **Legacy App Integration** - Quick link to legacy application
- **Indian Railways Branding** - Logo and branding on home page

### 🔜 Coming Soon
- **Phone Number Search** - Currently disabled with "Coming Soon" badge
- **Emergency Contacts** - Feature in development with "Coming Soon" badge

## Future Enhancements

- [ ] Add contact creation/edit forms
- [ ] Add contact groups management
- [ ] Add favorites functionality
- [ ] Add import/export features
- [ ] Add unit and integration tests
- [ ] Add React Query for advanced caching
- [ ] Add authentication

See [TODO.md](./TODO.md) for current development tasks and improvements.