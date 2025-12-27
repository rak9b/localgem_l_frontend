# LocalGems Frontend

> **Premium Tour Booking Platform** - Built with Next.js 14, TypeScript, Redux Toolkit, and Tailwind CSS v4

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)](https://tailwindcss.com/)

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit: **http://localhost:3000**

---

## 📍 Complete URL Reference

### 🏠 Public Pages
- **Home**: `http://localhost:3000/`
- **Explore Tours**: `http://localhost:3000/explore`
- **Tour Details**: `http://localhost:3000/tours/1` (IDs: 1-6 for demo)
- **About Us**: `http://localhost:3000/about`
- **Contact**: `http://localhost:3000/contact`
- **FAQ**: `http://localhost:3000/faq`
- **How It Works**: `http://localhost:3000/how-it-works`
- **Blog**: `http://localhost:3000/blog`
- **Documentation**: `http://localhost:3000/docs`

### 🔐 Authentication
- **Login**: `http://localhost:3000/login`
- **Register**: `http://localhost:3000/register`

> **Demo Login**: Click "Tourist Demo", "Guide Demo", or "Admin Demo" buttons on the login page to bypass authentication!

### 👤 User Pages (Requires Login)
- **Profile**: `http://localhost:3000/profile`
- **Settings**: `http://localhost:3000/settings`
- **Dashboard Hub**: `http://localhost:3000/dashboard`

### 🎯 Role-Based Dashboards
- **Tourist Dashboard**: `http://localhost:3000/dashboard/tourist`
  - My Trips (Upcoming & Past)
  - Wishlist Preview
  - Travel Stats
  - Passport Stamps
  
- **Guide Dashboard**: `http://localhost:3000/dashboard/guide`
  - Earnings Overview
  - Upcoming Tours
  - Recent Reviews
  - Performance Stats

- **Admin Dashboard**: `http://localhost:3000/dashboard/admin`
  - Platform Metrics
  - User Management
  - Activity Feed
  - System Health

### 🎁 Special Features
- **Membership**: `http://localhost:3000/membership`
- **Rewards**: `http://localhost:3000/rewards`
- **Offers**: `http://localhost:3000/offers`
- **Passport**: `http://localhost:3000/passport`
- **Booking Success**: `http://localhost:3000/booking-success`
- **Create Tour**: `http://localhost:3000/create-tour` (Guide only)

---

## 🎨 Features

### ✅ Implemented
- ✅ **Premium UI/UX**: Glassmorphism, animations, dark mode
- ✅ **Mock Data Fallback**: Works without backend
- ✅ **Demo Authentication**: Instant login for testing
- ✅ **Advanced Filtering**: Search, price, category, location
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Role-Based Access**: 3 distinct dashboard types
- ✅ **Multi-Step Booking**: Date → Guest Info → Payment
- ✅ **Wishlist System**: Save favorite tours
- ✅ **Skeleton Loading**: Premium loading states
- ✅ **Interactive Maps**: Tour locations
- ✅ **Review System**: Ratings and comments display

### 🚧 In Progress
- Payment Integration (Stripe)
- Real-time Messaging
- Social Features
- Mobile App (PWA)

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| State Management | Redux Toolkit + RTK Query |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Notifications | React Hot Toast |

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js pages (App Router)
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── dashboard/
│   │   │   ├── tourist/        # Tourist Dashboard
│   │   │   ├── guide/          # Guide Dashboard
│   │   │   ├── admin/          # Admin Dashboard
│   │   │   └── page.tsx        # Dashboard Hub
│   │   ├── explore/            # Tour Browsing
│   │   ├── tours/[id]/         # Tour Details
│   │   ├── profile/            # User Profile
│   │   └── ...
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   ├── tours/              # Tour-specific components
│   │   ├── home/               # Homepage sections
│   │   └── booking/            # Booking flow
│   ├── redux/
│   │   ├── api/                # RTK Query APIs
│   │   ├── features/           # Slices (auth, wishlist, currency)
│   │   └── store.ts
│   ├── data/
│   │   └── mockData.ts         # Demo data for offline mode
│   ├── types/
│   │   └── index.ts            # TypeScript types
│   └── lib/
│       └── utils.ts            # Utility functions
├── public/
└── package.json
```

---

## 🎯 Key Features Explained

### Demo Mode (Offline-First)
The app works **without a backend** using mock data:
- **Explore Page**: Shows 6 sample tours
- **Tour Details**: Full tour information with reviews
- **Dashboards**: Populated with realistic data
- **Demo Login**: One-click access to any role

### Role-Based Dashboards
Different experiences for each user type:

**Tourist**:
- View bookings and trip history
- Manage wishlist
- Track travel statistics
- Collect passport stamps

**Guide**:
- Monitor earnings and payouts
- Manage tour schedule
- Respond to reviews
- View performance analytics

**Admin**:
- Platform-wide statistics
- User and guide management
- Activity monitoring
- System configuration

### Smart Filtering
Advanced tour search with:
- Text search (title, description, city)
- Price range slider
- Category selection
- City filtering
- Sort by: Rating, Price, Newest

---

## 🔧 Configuration

### Environment Variables
Create `.env.local`:

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Feature Flags
NEXT_PUBLIC_ENABLE_DEMO_MODE=true

# App Info
NEXT_PUBLIC_APP_NAME=LocalGems
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Mock Data
Located in `src/data/mockData.ts`:
- 6 Tours across 4 cities
- 4 User profiles (Tourist, Guide, Admin)
- Blog posts
- Stories
- Passport stamps
- Offers

---

## 🧪 Testing

```bash
# Run development server
npm run dev

# Build production
npm run build

# Test production build locally
npm start
```

### Manual Testing Checklist
- [ ] Homepage loads correctly
- [ ] Explore page shows tours
- [ ] Tour details page displays properly
- [ ] Demo login works for all roles
- [ ] Dashboards render with correct data
- [ ] Filters work on explore page
- [ ] Dark mode toggles correctly
- [ ] Mobile responsive on all pages

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Manual Deployment
```bash
# Build
npm run build

# Output in .next/ folder
# Deploy to your hosting platform
```

### Environment Setup
Set these on your hosting platform:
- `NEXT_PUBLIC_API_URL`: Your production API URL
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe key
- Other env variables from`.env.example`

---

## 📚 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | TypeScript checking |

---

## 🎨 Design System

### Colors
- **Primary**: Rose (rose-500 to rose-700)
- **Secondary**: Blue, Green, Purple (role-specific)
- **Neutral**: Gray and Slate
- **Dark Mode**: Full support

### Typography
- **Headings**: Bold (font-bold)
- **Body**: Regular, 16px base
- **Small**: 14px, 12px variants

### Components
All components in `src/components/ui/`:
- Button
- Input
- Badge
- Skeleton (loading states)
- And more...

---

## 🐛 Troubleshooting

### "Cannot connect to backend"
✅ **Solution**: The app works without backend using mock data. See the "Demo Mode Active" alert.

### "Blank page after login"
✅ **Solution**: Use the Demo Login buttons instead of email/password (requires backend).

### "Tours not loading"
✅ **Solution**: The app will automatically fallback to mock tours if backend is unavailable.

---

## 📖 Documentation

- **Setup Guide**: See `QUICK_SETUP.md` (if available)
- **API Reference**: Check backend README
- **Component Library**: `src/components/ui/`

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is part of the LocalGems platform.

---

## 🎯 Next Steps

1. **Connect Backend**: Update `NEXT_PUBLIC_API_URL` in `.env.local`
2. **Configure Stripe**: Add your publishable key
3. **Customize Branding**: Update colors, logo, content
4. **Deploy**: Push to Vercel or your platform

---

## 📞 Support

For issues or questions, refer to the implementation plan and walkthrough documents in the project artifacts.

---

**Built with ❤️ for travelers and local guides worldwide**
#   l o c a l g e m _ l _ f r o n t e n d  
 