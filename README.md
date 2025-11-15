# Cookie Castle - Sweet Recipe Adventures

A whimsical, Candy Land-themed web application for sharing and discovering delicious cookie recipes. Connect with fellow bakers, build your community, and explore a magical world of sweet treats!

## Features

### Core Features
- **Recipe Upload & Sharing**: Upload cookie recipes with ingredients, instructions, images, videos, and YouTube links
- **Smart Categories**: Filter recipes by dietary needs (gluten-free, dairy-free, nut-free, no-bake, easy-bake)
- **Social Feed**: Follow friends, comment on recipes, and build your baking community
- **Ratings & Reviews**: Share your baking experiences and help others find the best recipes
- **Marketplace**: Buy, sell, or trade homemade cookies with fellow bakers
- **Pop-up Locations**: Discover and share local cookie pop-up shops and baking events

### Technical Stack
- **Framework**: Next.js 16 (App Router) with TypeScript
- **Styling**: Tailwind CSS v4 with custom Candy Land color scheme
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js (planned)
- **File Uploads**: Uploadthing for images/videos
- **Icons**: Lucide React

## Candy Land Theme

The app features a vibrant, whimsical Candy Land-inspired design with:
- **Primary Colors**: Candy Red, Purple, Yellow, Blue, Orange, Green, Pink, and Mint
- **Pastel Accents**: Soft pink, blue, purple, yellow, and green
- **Gradient Backgrounds**: Sweet, colorful gradients throughout
- **Playful Animations**: Floating elements and smooth transitions

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd cookie
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/cookie_app"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
UPLOADTHING_SECRET=""
UPLOADTHING_APP_ID=""
```

4. Run database migrations
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app!

## Project Structure

```
cookie/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── layout.tsx    # Root layout with Header/Footer
│   │   ├── page.tsx      # Landing page
│   │   └── globals.css   # Candy Land theme styles
│   ├── components/       # React components
│   │   ├── Header.tsx    # Navigation header
│   │   └── Footer.tsx    # Footer component
│   └── lib/
│       └── prisma.ts     # Prisma client
├── prisma/
│   └── schema.prisma     # Database schema
└── public/               # Static assets
```

## Database Schema

The app includes comprehensive models for:
- **Users**: Authentication and profiles
- **Recipes**: Cookie recipes with ingredients, instructions, images, and videos
- **Categories**: Dietary filters and recipe categorization
- **Social Features**: Follows, comments, ratings, and reviews
- **Marketplace**: Items for buying, selling, and trading
- **Pop-up Locations**: Event locations with geolocation

## Upcoming Features

- [ ] User authentication (sign up/sign in)
- [ ] User profile pages
- [ ] Recipe upload form
- [ ] Recipe listing and search
- [ ] Social feed implementation
- [ ] Email/SMS sharing
- [ ] Social media integration
- [ ] Payment processing for marketplace
- [ ] Map integration for pop-up locations

## Development

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own sweet adventures!
