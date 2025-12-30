# Configuration

Complete guide to configuring the Contacts Management System.

## Environment Variables

Create a `.env` file in the root directory of the project.

### Required Variables

```env
# API Base URL
VITE_API_BASE_URL=http://localhost:3000
```

### Optional Variables

```env
# API Key Authentication
VITE_API_KEY=your_api_key_here

# Basic Authentication
VITE_API_USERNAME=your_username
VITE_API_PASSWORD=your_password
```

## Variable Reference

### VITE_API_BASE_URL

**Type**: String  
**Required**: Yes  
**Default**: `http://localhost:3000`  
**Description**: Base URL for the REST API

**Example:**
```env
VITE_API_BASE_URL=https://api.example.com
```

### VITE_API_KEY

**Type**: String  
**Required**: No  
**Description**: API key for authentication. Sent in `X-API-Key` header.

**Example:**
```env
VITE_API_KEY=abc123xyz789
```

### VITE_API_USERNAME

**Type**: String  
**Required**: No  
**Description**: Username for Basic Authentication. Used with `VITE_API_PASSWORD`.

**Example:**
```env
VITE_API_USERNAME=admin
```

### VITE_API_PASSWORD

**Type**: String  
**Required**: No  
**Description**: Password for Basic Authentication. Used with `VITE_API_USERNAME`.

**Example:**
```env
VITE_API_PASSWORD=secure_password
```

## Environment-Specific Configuration

### Development

Create `.env.development`:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_API_KEY=dev_api_key
```

### Production

Create `.env.production`:

```env
VITE_API_BASE_URL=https://api.production.com
VITE_API_KEY=production_api_key
```

### Staging

Create `.env.staging`:

```env
VITE_API_BASE_URL=https://api.staging.com
VITE_API_KEY=staging_api_key
```

## Accessing Environment Variables

In your code, access variables using `import.meta.env`:

```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL
const apiKey = import.meta.env.VITE_API_KEY
```

**Important**: Only variables prefixed with `VITE_` are exposed to the client.

## Security Best Practices

### 1. Never Commit .env Files

Add to `.gitignore`:
```
.env
.env.local
.env.*.local
```

### 2. Use Different Keys for Different Environments

- Development: Use test/development API keys
- Staging: Use staging API keys
- Production: Use production API keys

### 3. Rotate Credentials Regularly

- Change API keys periodically
- Update passwords regularly
- Revoke unused credentials

### 4. Use Secret Management

For production:
- Use secret management services
- Use CI/CD secret variables
- Never hardcode credentials

## API Configuration

### Base URL Configuration

The base URL is configured in `src/config/api.ts`:

```typescript
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
```

### Authentication Configuration

Authentication is configured in `src/config/api.ts`:

```typescript
export const API_KEY = import.meta.env.VITE_API_KEY || ""
export const API_USERNAME = import.meta.env.VITE_API_USERNAME || ""
export const API_PASSWORD = import.meta.env.VITE_API_PASSWORD || ""
```

## API Client Configuration

### Timeout Settings

Default timeout is 30 seconds. Can be modified in `src/lib/api-client.ts`:

```typescript
this.timeout = config.timeout || 30000 // 30 seconds
```

### Headers Configuration

Default headers are configured in `src/lib/api-client.ts`:

```typescript
const headers: Record<string, string> = {
  "Content-Type": "application/json",
}
```

## Feature Flags

You can use environment variables as feature flags:

```env
VITE_ENABLE_FEATURE_X=true
VITE_ENABLE_FEATURE_Y=false
```

Access in code:
```typescript
const featureXEnabled = import.meta.env.VITE_ENABLE_FEATURE_X === "true"
```

## Validation

Environment variables are validated at runtime. Missing required variables will:
- Use default values where available
- Log warnings in development
- May cause runtime errors if critical

## Troubleshooting

### Variables Not Loading

1. **Check prefix**: Variables must start with `VITE_`
2. **Restart dev server**: Changes require server restart
3. **Check file location**: `.env` must be in root directory
4. **Check syntax**: No spaces around `=`

### Wrong Values

1. **Check environment**: Ensure correct `.env` file is loaded
2. **Check build**: Production builds use `.env.production`
3. **Clear cache**: Clear browser cache and rebuild

### Security Warnings

- Never log environment variables
- Never expose in client-side code (except `VITE_*`)
- Use server-side variables for sensitive data

