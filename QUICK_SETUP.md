# Quick Database Setup Guide

## Option 1: Docker (Easiest - Recommended)

```bash
# Install Docker Desktop first if you don't have it
# Then run this single command:
docker run --name localgems-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=localgems -p 5432:5432 -d postgres:15

# Verify it's running:
docker ps
```

## Option 2: Install PostgreSQL Locally

1. Download PostgreSQL 15: https://www.postgresql.org/download/windows/
2. Install with default settings
3. Remember the password you set for `postgres` user
4. Open Command Prompt and create database:

```bash
psql -U postgres
CREATE DATABASE localgems;
\q
```

## After Database is Running

```bash
# Navigate to backend folder
cd backend

# 1. Run migrations (creates tables)
npm run prisma:migrate

# 2. Seed database with 37 amazing tours
npm run seed

# 3. Start backend (if not already running)
npm run dev
```

## Expected Output After Seeding

```
✅ Created 6 demo users (4 guides, 1 tourist, 1 admin)
✅ Created 37 comprehensive tours across multiple cities!
✅ Created sample bookings
✅ Created sample reviews

📊 Summary:
   - 6 Users (4 Guides, 1 Tourist, 1 Admin)
   - 37 Tours across 11 global cities
   - Cities: Tokyo, Rome, Paris, Barcelona, New York, London, Amsterdam, Dubai, Sydney, Singapore, Bangkok
   - 2 Bookings
   - 3 Reviews

🔐 Login Credentials:
   Tourist: sarah@tourist.com / tourist123
   Guide (Rome): elena@guide.com / guide456
   Guide (Tokyo): kenji@guide.com / guide456
   Guide (Paris): sophie@guide.com / guide456
   Guide (Barcelona): carlos@guide.com / guide456
   Admin: admin@localgems.com / admin789
```

## Troubleshooting

**"Can't reach database server at localhost:5432"**
- PostgreSQL is not running
- Windows: Check Services → PostgreSQL → Start
- Docker: `docker start localgems-db`

**"Database does not exist"**
```bash
# Recreate database
psql -U postgres
DROP DATABASE IF EXISTS localgems;
CREATE DATABASE localgems;
\q
```

**Reset Everything**
```bash
cd backend
npx prisma migrate reset
# This drops, recreates, migrates, and seeds automatically
```
