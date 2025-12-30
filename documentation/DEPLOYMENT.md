# Deployment

Guide for building and deploying the Contacts Management System to production.

## Building for Production

### Build Command

```bash
npm run build
```

This command will:
1. Type-check the codebase using TypeScript
2. Bundle and optimize all assets
3. Generate production-ready files in the `dist/` directory
4. Create optimized JavaScript bundles
5. Minify CSS
6. Generate source maps (for debugging)

### Build Output

After building, you'll find:

```
dist/
├── index.html          # Entry HTML file
├── assets/
│   ├── index-*.js      # Optimized JavaScript bundles
│   ├── index-*.css     # Minified CSS
│   └── *.png           # Optimized images
└── vite.svg            # Static assets
```

### Build Optimization

The production build includes:
- **Code Splitting**: Automatic code splitting for optimal loading
- **Tree Shaking**: Unused code elimination
- **Minification**: JavaScript and CSS minification
- **Asset Optimization**: Image and font optimization
- **Source Maps**: Optional source maps for debugging

## Environment Configuration

### Production Environment Variables

Create a production `.env` file:

```env
VITE_API_BASE_URL=https://api.production.com
VITE_API_KEY=production_api_key
VITE_API_USERNAME=production_username
VITE_API_PASSWORD=production_password
```

**Important**: Never commit production credentials to version control.

### Environment-Specific Builds

You can create different `.env` files:
- `.env.development` - Development environment
- `.env.production` - Production environment
- `.env.staging` - Staging environment

Vite automatically loads the appropriate file based on the mode.

## Deployment Options

### Netlify

The project includes `netlify.toml` configuration.

**Deployment Steps:**

1. **Build Command:**
   ```bash
   npm run build
   ```

2. **Publish Directory:**
   ```
   dist
   ```

3. **Environment Variables:**
   Add all `VITE_*` variables in Netlify dashboard:
   - Settings → Environment Variables

**Automatic Deployment:**
- Connect your Git repository
- Netlify will auto-deploy on push to main branch
- Preview deployments for pull requests

### Vercel

**Deployment Steps:**

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Configure:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

**Environment Variables:**
Add in Vercel dashboard:
- Project Settings → Environment Variables

### Static Hosting (Any Provider)

For any static hosting service (AWS S3, GitHub Pages, etc.):

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload `dist/` folder:**
   Upload the entire `dist/` directory to your hosting provider

3. **Configure:**
   - Set index file to `index.html`
   - Enable SPA routing (redirect all routes to `index.html`)

## Pre-Deployment Checklist

- [ ] All environment variables are configured
- [ ] API endpoints are correct for production
- [ ] Build completes without errors
- [ ] Production build is tested locally (`npm run preview`)
- [ ] All features work in production build
- [ ] Error handling is tested
- [ ] Performance is acceptable
- [ ] Security headers are configured (if applicable)
- [ ] Analytics tracking is configured (if applicable)

## Post-Deployment

### Verification

1. **Test all features:**
   - Search functionality
   - Filtering
   - Analytics dashboard
   - Document access

2. **Check console:**
   - No JavaScript errors
   - No failed API calls
   - No console warnings

3. **Performance:**
   - Page load time
   - API response times
   - Bundle sizes

### Monitoring

- Monitor error rates
- Track API response times
- Monitor user analytics
- Check visit tracking

## Troubleshooting

### Build Fails

**TypeScript Errors:**
```bash
# Fix type errors
npm run lint
```

**Dependency Issues:**
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Deployment Issues

**404 Errors on Routes:**
- Ensure SPA routing is configured
- All routes should redirect to `index.html`

**API Errors:**
- Verify environment variables are set
- Check API base URL is correct
- Verify CORS settings on API server

**Asset Loading Issues:**
- Check base path configuration
- Verify asset paths are relative
- Check CDN configuration (if using)

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --dir=dist --prod
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## Performance Optimization

### Bundle Analysis

```bash
# Analyze bundle size
npm run build -- --analyze
```

### Optimization Tips

1. **Code Splitting**: Already implemented via Vite
2. **Lazy Loading**: Use React.lazy for route components
3. **Image Optimization**: Use optimized image formats
4. **Caching**: Configure proper cache headers
5. **CDN**: Use CDN for static assets

## Security Considerations

- **Environment Variables**: Never expose in client code
- **API Keys**: Use secure storage
- **HTTPS**: Always use HTTPS in production
- **CORS**: Configure CORS properly on API server
- **Content Security Policy**: Implement CSP headers

## Rollback Procedure

If deployment fails:

1. **Netlify:**
   - Go to Deploys → Previous deploy → Publish deploy

2. **Vercel:**
   - Go to Deployments → Previous deployment → Promote to Production

3. **Manual:**
   - Revert to previous build
   - Re-upload previous `dist/` folder

