# VibeShelf Deployment Guide

## Overview

This guide covers the deployment process for VibeShelf across different environments including local development, staging, and production.

## Environment Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account and project
- Git for version control
- Hosting provider accounts (Netlify, Railway/Render)

### Environment Variables

#### Client (.env)
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### API (.env)
```env
NODE_ENV=production
PORT=3001
CLIENT_URL=https://your-domain.com
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=your_jwt_secret_key
```

## Local Development

### Database Setup
1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Note project URL and anon key

2. **Run Database Migrations**
   ```bash
   cd supabase
   # Apply all migration files in order
   supabase db push
   ```

3. **Seed Sample Data**
   ```bash
   # Run seed files for initial data
   supabase db seed
   ```

### API Server
```bash
cd api
cp .env.example .env
# Edit .env with your Supabase credentials
npm install
npm run dev
```

### Client Application
```bash
cd client
npm install
npm run dev
```

## Production Deployment

### Frontend (Netlify)

#### Build Process
```bash
cd client
npm run build
```

#### Deploy to Netlify
1. **Connect Repository**
   - Go to Netlify dashboard
   - Add new site from Git
   - Connect your GitHub repository

2. **Configure Build Settings**
   - Build command: `cd client && npm run build`
   - Publish directory: `client/dist`
   - Node version: 18

3. **Environment Variables**
   - Add all client environment variables
   - Ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set

4. **Deploy**
   - Automatic deployment on push to main branch
   - Manual deploy available from dashboard

### API (Railway/Render)

#### Railway Deployment
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Deploy API
cd api
railway up
```

#### Render Deployment
1. **Connect Repository**
   - Go to Render dashboard
   - New Web Service
   - Connect GitHub repository

2. **Configure Service**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Instance Type: Free tier (minimum)

3. **Environment Variables**
   - Add all API environment variables
   - Ensure database connection details are secure

### Database (Supabase)

#### Production Database
1. **Create Production Project**
   - Separate from development project
   - Enable Row Level Security (RLS)
   - Configure authentication providers

2. **Migrate Schema**
   ```bash
   # Use Supabase CLI for production
   supabase link --project-ref your-prod-ref
   supabase db push
   ```

3. **Backup Strategy**
   - Enable daily backups in Supabase dashboard
   - Test restore process regularly
   - Document backup retention policy

## CI/CD Pipeline

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy VibeShelf

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: |
          cd client && npm install
          cd ../api && npm install
      - name: Run tests
        run: |
          cd client && npm test
          cd ../api && npm test

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=client/dist
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}

  deploy-api:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Railway
        uses: railway-app/railway-action@v1
        with:
          api-token: ${{ secrets.RAILWAY_TOKEN }}
          service: vibeshelf-api
```

## Monitoring and Maintenance

### Application Monitoring

#### Frontend
- **Netlify Analytics**: Built-in performance monitoring
- **Google Analytics**: User behavior tracking
- **Sentry**: Error tracking and reporting

#### API
- **Railway Logs**: Server error monitoring
- **Supabase Logs**: Database performance tracking
- **Uptime Monitoring**: Service availability alerts

### Security Considerations

#### Frontend
- **HTTPS Enforcement**: All requests over HTTPS
- **CSP Headers**: Content Security Policy configuration
- **Dependency Updates**: Regular security patching
- **Environment Variables**: Secure storage of secrets

#### API
- **Rate Limiting**: Prevent abuse and DoS attacks
- **Input Validation**: Sanitize all user inputs
- **CORS Configuration**: Restrict to trusted domains
- **JWT Security**: Secure token handling

### Performance Optimization

#### Frontend
- **Bundle Analysis**: Regular size monitoring
- **Image Optimization**: WebP format and lazy loading
- **Caching Strategy**: Service worker implementation
- **CDN Usage**: Global content delivery

#### API
- **Database Indexing**: Optimize query performance
- **Response Caching**: Reduce database load
- **Connection Pooling**: Efficient resource usage
- **Load Balancing**: Scale horizontally as needed

## Troubleshooting

### Common Issues

#### Build Failures
- **Node Version**: Ensure Node.js 18+ is used
- **Dependencies**: Clear node_modules and reinstall
- **Environment Variables**: Verify all required variables are set

#### Database Connection
- **URL Format**: Check Supabase URL syntax
- **Authentication**: Verify API keys are correct
- **Network Rules**: Check firewall and CORS settings

#### Deployment Errors
- **Build Commands**: Verify paths and commands
- **Permissions**: Check file and directory permissions
- **Service Logs**: Review deployment platform logs

## Rollback Procedures

### Emergency Rollback
1. **Frontend**: Deploy previous working build from Netlify
2. **API**: Switch to previous Railway deployment
3. **Database**: Restore from recent Supabase backup

### Maintenance Windows
- **Schedule**: During low-traffic periods (2-4 AM UTC)
- **Notification**: Inform users in advance
- **Duration**: Maximum 30 minutes for planned maintenance

## Support and Documentation

- **API Documentation**: `/docs/api.md`
- **Product Requirements**: `/docs/PRD.md`
- **Issue Tracking**: GitHub repository issues
- **Community Support**: Discord/Slack channels

---

**Last Updated**: Current Date  
**Version**: 1.0  
**Next Review**: After first production deployment
