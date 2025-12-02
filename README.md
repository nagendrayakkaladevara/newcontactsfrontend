# Contacts App Frontend

A modern, scalable React + TypeScript contacts management application with a clean architecture.

## Features

- 📱 **Responsive Sidebar Navigation** - Collapsible sidebar with keyboard shortcuts and legacy app link
- 🔍 **Contact Search** - Search contacts by name (phone search coming soon)
- 📊 **Analytics Dashboard** - Comprehensive analytics with visit tracking, blood group distribution, lobby distribution, and growth charts
- 📄 **Pagination** - Efficient pagination for large contact lists
- 🎨 **Modern UI** - Built with shadcn/ui components, sleek card designs
- 🔒 **Type Safety** - Full TypeScript coverage
- ⚡ **Performance** - Optimized API calls and loading states
- 🏷️ **Category Filtering** - Filter contacts by blood group, lobby, and designation
- 📁 **Documents Management** - View and manage contact documents
- 📈 **Visit Tracking** - Automatic visit count tracking on app load

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

### Implemented Features
- ✅ Contact search by name
- ✅ Contact filtering by blood group, lobby, and designation
- ✅ Analytics dashboard with comprehensive statistics
- ✅ Visit count tracking
- ✅ Documents management
- ✅ Responsive card-based contact display
- ✅ Category-based contact organization

### Coming Soon
- 🔜 Search by phone number (currently disabled)
- 🔜 Emergency contacts feature

## Future Enhancements

- [ ] Add contact creation/edit forms
- [ ] Add contact groups management
- [ ] Add favorites functionality
- [ ] Add import/export features
- [ ] Add unit and integration tests
- [ ] Add React Query for advanced caching
- [ ] Add authentication

See [TODO.md](./TODO.md) for current development tasks and improvements.