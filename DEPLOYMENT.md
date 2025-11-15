# Deploying Cookie Castle to Vercel

This guide will walk you through deploying Cookie Castle to Vercel using GitHub.

## Prerequisites

1. A GitHub account with your Cookie Castle repository
2. A Vercel account (sign up at https://vercel.com)
3. A PostgreSQL database for production (we'll use Vercel Postgres)

## Step 1: Prepare Your Database

### Option A: Vercel Postgres (Recommended)

1. Go to your Vercel dashboard
2. Click "Storage" → "Create Database" → "Postgres"
3. Choose your region and create the database
4. Copy the `DATABASE_URL` connection string (it will look like `postgresql://...`)

### Option B: Other PostgreSQL Providers

You can also use:
- **Supabase** - https://supabase.com (free tier available)
- **Railway** - https://railway.app (free tier available)
- **Neon** - https://neon.tech (free tier available)

## Step 2: Push Your Code to GitHub

Make sure all your changes are committed and pushed:

```bash
git add .
git commit -m "Ready for deployment"
git push origin claude/cookbook-upload-app-01M1PeGtKRW6T7d2tSUQjJtP
```

## Step 3: Deploy to Vercel

### Via Vercel Dashboard (Easiest):

1. Go to https://vercel.com and sign in
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Configure environment variables (see below)
6. Click "Deploy"

### Via Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

## Step 4: Configure Environment Variables

In your Vercel project settings, add these environment variables:

### Required Variables:

```env
# Database (from Step 1)
DATABASE_URL=postgresql://user:password@host:5432/database

# NextAuth Secret (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET=your-generated-secret-here

# NextAuth URL (your Vercel domain)
NEXTAUTH_URL=https://your-app-name.vercel.app
```

### Optional Variables (for full functionality):

```env
# Uploadthing - Get from https://uploadthing.com
UPLOADTHING_SECRET=sk_live_xxxx
UPLOADTHING_APP_ID=xxxx

# Resend - Get from https://resend.com
RESEND_API_KEY=re_xxxx

# Stripe - Get from https://stripe.com/dashboard
STRIPE_SECRET_KEY=sk_live_xxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxx
```

## Step 5: Run Database Migrations

After deployment, you need to initialize your database:

### Option A: Using Vercel CLI

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Link to your project
vercel link

# Pull environment variables
vercel env pull .env.production

# Run migrations
DATABASE_URL="your-production-database-url" npx prisma db push

# Seed categories
DATABASE_URL="your-production-database-url" npm run db:seed
```

### Option B: Using Vercel Console

1. Go to your Vercel project dashboard
2. Click "Settings" → "Functions"
3. Add a one-time deployment script or use the Vercel CLI

## Step 6: Verify Deployment

1. Visit your Vercel URL: `https://your-app-name.vercel.app`
2. Create a test account
3. Try uploading a recipe
4. Test all features

## Troubleshooting

### Build Fails with Prisma Error

Make sure `vercel.json` includes Prisma generation:
```json
{
  "buildCommand": "prisma generate && next build"
}
```

### Database Connection Issues

- Verify `DATABASE_URL` is correct in environment variables
- Make sure the database allows connections from Vercel's IP ranges
- Check if SSL is required (add `?sslmode=require` to connection string)

### NextAuth Errors

- Ensure `NEXTAUTH_SECRET` is set and at least 32 characters
- Verify `NEXTAUTH_URL` matches your deployment URL exactly
- Check that cookies are working (not blocked by browser)

### File Upload Issues

- Add Uploadthing API keys in environment variables
- Verify Uploadthing domain is configured for your Vercel URL
- Check browser console for CORS errors

## Updating Your Deployment

Every time you push to your GitHub branch, Vercel will automatically redeploy:

```bash
git add .
git commit -m "Update feature"
git push
```

## Custom Domain (Optional)

1. Go to your Vercel project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Update `NEXTAUTH_URL` to your custom domain

## Environment-Specific Settings

### Development
- Uses SQLite (`file:./dev.db`)
- Local uploads
- http://localhost:3000

### Production
- Uses PostgreSQL
- Uploadthing for file storage
- https://your-domain.com

## Security Checklist

Before going live:

- [ ] Change `NEXTAUTH_SECRET` to a strong random value
- [ ] Use production API keys (not test keys)
- [ ] Enable rate limiting (consider Vercel Edge Config)
- [ ] Set up monitoring (Vercel Analytics)
- [ ] Configure proper CORS settings
- [ ] Review and update environment variables
- [ ] Test authentication flow thoroughly
- [ ] Set up database backups

## Cost Considerations

**Free Tier Includes:**
- Vercel: Unlimited deployments, 100GB bandwidth/month
- Vercel Postgres: 256MB storage, 60 hours compute/month
- Uploadthing: 2GB storage, 2GB bandwidth/month

**Upgrade When:**
- You need more database storage
- Traffic exceeds free tier limits
- You need team collaboration features

## Support

- Vercel Documentation: https://vercel.com/docs
- Prisma Documentation: https://www.prisma.io/docs
- Next.js Documentation: https://nextjs.org/docs

---

**Your Cookie Castle will be live in minutes! 🏰🍪**
