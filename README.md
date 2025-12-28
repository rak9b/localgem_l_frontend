# 🎨 LocalGems Frontend - Elite Experience

<div align="center">

![Frontend Banner](https://img.shields.io/badge/LocalGems-Frontend%20Elite-6366f1?style=for-the-badge&logo=next.js&logoColor=white)

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge&logo=vercel)](https://localgem-l-frontend-bx4r.vercel.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**Production-grade, high-performance UI/UX for the ultimate tour discovery marketplace.**

[Live Demo](https://localgem-l-frontend-bx4r.vercel.app/) • [Features](#-key-features) • [Tech Stack](#-technology-stack) • [Structure](#-project-structure)

</div>

---

## 📖 **Overview**

LocalGems Frontend is a state-of-the-art **Next.js 14 application** featuring premium glassmorphism design, advanced Framer Motion animations, and robust state management via RTK Query. Designed for speed, accessibility, and visual excellence.

### **🌟 Highlights**

- ✨ **Elite UI/UX** with 3D scale and shimmer hover effects
- 🌙 **Seamless Dark Mode** with zero-flicker transitions
- ⚡ **Optimized Performance** with Next.js App Router & Image optimization
- 🔐 **Secure RBAC** with Protected Routes and JWT session handling
- 🧱 **Atomic Architecture** with reusable premium UI components
- 📱 **Mobile First** responsive layout for all form factors

---

## 🎯 **Key Features**

### 🏠 **Public Experience**
- **Hero Section**: Immersive visuals with 3D depth.
- **Curated Experiences**: Premium tour cards with shimmering hover effects.
- **Explore Page**: Real-time search, filtering by city/category, and sorting.
- **Membership Area**: Multi-tier subscription roadmap display.

### 👤 **User Dashboards**
- **Tourist**: My Trips, Wishlist, Virtual Passport, and Review system.
- **Guide**: Earnings charts, Tour Management, and Booking requests.
- **Admin**: Platform-wide stats, User management, and Moderation tools.

### ⚙️ **Core Tech**
- **Inter-service Auth**: JWT verification with custom payload handling.
- **Payments**: Integrated Stripe Checkout for secure tour bookings.
- **Real-time**: Socket.io integration for instant communication.

---

## 🛠️ **Technology Stack**

<table>
<tr>
<td>

**Core**
- ⚛️ React 19 / Next.js 14
- ⚡ Vite 6.0
- 📘 TypeScript 5.8

</td>
<td>

**State Management**
- 🔄 Redux Toolkit
- 🌐 RTK Query
- 💾 Redux Persist

</td>
<td>

**Styling**
- 🎨 Tailwind CSS v4
- 🎭 Framer Motion
- ✨ Glassmorphism

</td>
</tr>
</table>

---

## 📂 **Project Structure**

```bash
src/
├── app/                  # Next.js App Router
│   ├── (auth)/           # Login/Register routes
│   ├── dashboard/        # Role-based pages
│   ├── explore/          # Search & Filtering
│   ├── tours/            # Detail pages [id]
│   └── messages/         # Socket chat
├── components/           # UI Library
│   ├── layout/           # Navbar, Sidebar, Footer
│   ├── home/             # Homepage sections
│   ├── tours/            # Cards & Filters
│   └── ui/               # Base primitives
├── redux/                # State Logic
│   ├── api/              # RTK Query slices
│   └── features/         # Local slices
├── lib/                  # Utils & Config
└── styles/               # Design Tokens
```

---

## 🚀 **Quick Start**

```bash
# Install dependencies
npm install

# Setup .env
# NEXT_PUBLIC_API_URL=https://your-api.com/api/v1

# Run development
npm run dev
```

---

<div align="center">

**Built with ❤️ by rakib Team**

</div>