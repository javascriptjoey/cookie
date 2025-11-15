# Cookie Castle - Setup Guide

## Quick Start (Local Development)

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

The app is configured to use SQLite for development (easy setup) but can use PostgreSQL for production.

**For SQLite (Development - Recommended):**

The `.env` file is already configured for SQLite. Just run:

```bash
# Generate Prisma Client
npx prisma generate

# Create database and tables
npx prisma db push

# (Optional) Seed initial categories
npx prisma db seed
```

**For PostgreSQL (Production):**

1. Install PostgreSQL on your machine
2. Create a database:
   ```bash
   createdb cookie_app
   ```
3. Update `.env`:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/cookie_app"
   ```
4. Update `prisma/schema.prisma` - change provider to `postgresql`
5. Run migrations:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

### 3. Configure Environment Variables

Update `.env` with your secrets:

```env
# Required
NEXTAUTH_SECRET="generate-a-random-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Optional (for image uploads)
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"

# Optional (for email sharing)
RESEND_API_KEY="your-resend-api-key"

# Optional (for marketplace payments)
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
```

To generate a secure NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 5. Create Your First Account

1. Go to [http://localhost:3000/signup](http://localhost:3000/signup)
2. Create an account with email and password
3. You'll be automatically logged in!

## Database Schema

The app includes a comprehensive database schema with:

- **Users** - Authentication and profiles
- **Recipes** - Cookie recipes with ingredients, instructions, images, videos
- **Categories** - Dietary filters (nut-free, dairy-free, gluten-free, etc.)
- **Ratings & Reviews** - User feedback on recipes
- **Comments** - Recipe discussions
- **Social Features** - Follows, posts, feed
- **Marketplace** - Buy/sell/trade cookies
- **Pop-up Locations** - Event locations with map coordinates

## Seeding Categories

Run this to add the default recipe categories:

```bash
npx prisma db seed
```

This will create:
- Nut-Free
- Dairy-Free
- Gluten-Free
- No-Bake
- Easy-Bake
- Vegan

## Optional Services

### Image/Video Uploads (Uploadthing)

1. Create account at [uploadthing.com](https://uploadthing.com)
2. Create a new app
3. Copy API keys to `.env`
4. Image uploads will work in the recipe upload form

### Email Sharing (Resend)

1. Create account at [resend.com](https://resend.com)
2. Get API key
3. Add to `.env`
4. Email sharing will be enabled

### Marketplace Payments (Stripe)

1. Create account at [stripe.com](https://stripe.com)
2. Get API keys (test mode for development)
3. Add to `.env`
4. Payment processing will be enabled

## Testing the App

### Test Recipe Creation

1. Sign up / Sign in
2. Click "Add Recipe" in header
3. Fill in recipe details:
   - Title: "Classic Chocolate Chip Cookies"
   - Add ingredients (flour, sugar, chocolate chips, etc.)
   - Add instructions
   - Select categories (e.g., "Easy-Bake")
   - Optionally add YouTube video
4. Click "Publish Recipe"
5. View your recipe in the recipes list

### Test Social Features

1. View community feed at `/feed`
2. Browse other recipes and rate them
3. Follow other users from their profiles
4. Comment on recipes

### Test Marketplace

1. Go to `/marketplace`
2. Click "List Item"
3. Add cookies for sale/trade
4. Browse marketplace listings

### Test Pop-up Locations

1. Go to `/popups`
2. Click "Add Pop-up"
3. Add location details
4. View on map (coordinates saved in database)

## Troubleshooting

### Prisma Client Not Generated

If you see errors about `@prisma/client`, run:
```bash
npx prisma generate
```

### Database Connection Issues

SQLite:
- Make sure `DATABASE_URL="file:./dev.db"` in `.env`
- Check that `prisma/schema.prisma` has `provider = "sqlite"`

PostgreSQL:
- Verify PostgreSQL is running
- Check connection string in `.env`
- Ensure database exists

### Build Errors

```bash
# Clean and rebuild
rm -rf .next
npm run build
```

### Port Already in Use

If port 3000 is taken:
```bash
npm run dev -- -p 3001
```

## Production Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables in Vercel dashboard
4. Use PostgreSQL database (Vercel Postgres or external)
5. Deploy!

### Environment Variables for Production

Make sure to set all required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Strong random secret
- `NEXTAUTH_URL` - Your production URL
- Optional: Upload, email, payment service keys

## Features Overview

✅ **Authentication** - Secure sign up/sign in with NextAuth.js
✅ **Recipe Management** - Create, browse, search recipes
✅ **Categories** - Filter by dietary needs
✅ **Ratings & Reviews** - Rate and review recipes
✅ **Social Feed** - Share updates and follow bakers
✅ **Marketplace** - Buy, sell, trade cookies
✅ **Pop-up Events** - Share and discover local cookie events
✅ **Sharing** - Email, SMS, social media sharing
✅ **Candy Land Theme** - Beautiful, whimsical design

## Support

For issues or questions:
- Check the troubleshooting section above
- Review the code comments
- Check Next.js and Prisma documentation

Enjoy building your cookie community! 🍪✨
