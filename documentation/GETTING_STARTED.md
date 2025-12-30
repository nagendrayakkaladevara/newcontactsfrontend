# Getting Started

This guide will help you set up and run the Contacts Management System on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or **yarn** / **pnpm**)

You can verify your installations:

```bash
node --version
npm --version
```

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd newcontactsfrontend
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`.

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000
VITE_API_KEY=your_api_key_here

# Authentication (Optional)
VITE_API_USERNAME=your_username
VITE_API_PASSWORD=your_password
```

For detailed configuration options, see [Configuration Guide](./CONFIGURATION.md).

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at:
```
http://localhost:5173
```

### 5. Verify Installation

- Open your browser and navigate to `http://localhost:5173`
- You should see the application home page
- Check the browser console for any errors

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port. You can also specify a port:

```bash
npm run dev -- --port 3000
```

### Dependency Issues

If you encounter dependency issues:

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Environment Variables Not Loading

Ensure your `.env` file is in the root directory and variables are prefixed with `VITE_` for Vite to expose them.

## Next Steps

- Read the [Features Documentation](./FEATURES.md) to understand capabilities
- Review [Architecture Guide](./ARCHITECTURE.md) for project structure
- Check [Development Guide](./DEVELOPMENT.md) for coding standards

