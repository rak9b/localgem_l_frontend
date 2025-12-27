'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Star, Users } from 'lucide-react';
import { StoryRail } from '@/components/home/StoryRail';
import { Hero } from '@/components/home/Hero';
import { FeaturedTours } from '@/components/home/FeaturedTours';
import { DestinationsGrid } from '@/components/home/DestinationsGrid';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 overflow-x-hidden">

      {/* 1. Hero Section - Travel Theme */}
      <Hero />

      {/* NEW: Stories Section */}
      <section className="py-8 bg-white dark:bg-slate-950 border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Live from Locals</h3>
            <span className="text-xs text-rose-600 font-medium animate-pulse">● Live Updates</span>
          </div>
          <StoryRail />
        </div>
      </section>

      {/* 2. Featured Destinations */}
      <DestinationsGrid />

      {/* 3. Top Rated Tours */}
      <FeaturedTours />

      {/* 4. Live Stats - Trust Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Happy Travelers", value: "50k+", color: "rose" },
              { label: "Verified Guides", value: "1,200+", color: "teal" },
              { label: "Global Cities", value: "450+", color: "orange" },
              { label: "Average Rating", value: "4.9/5", color: "blue" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className={`text-3xl md:text-5xl font-black text-${stat.color}-600 dark:text-${stat.color}-400 mb-2`}>{stat.value}</div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wider uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section className="py-32 bg-white dark:bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Not Your Average Tour Agency</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">We democratize travel by empowering locals to share their world.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Verified Guides", desc: "Every guide goes through a strict identity and quality check.", color: "rose" },
              { icon: Users, title: "Small Groups", desc: "Intimate experiences with max 8 people for a personal touch.", color: "orange" },
              { icon: Star, title: "Authentic", desc: "No tourist traps. Go where the locals actually go.", color: "teal" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group p-8 rounded-3xl bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 hover:border-rose-500/30 dark:hover:border-rose-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-rose-500/10"
              >
                <div className={`w-16 h-16 rounded-2xl bg-${item.color}-100 dark:bg-${item.color}-900/30 flex items-center justify-center mb-8 text-${item.color}-600 dark:text-${item.color}-400 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Become a Guide CTA */}
      <section className="py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-slate-900 dark:bg-slate-800 rounded-[3rem] p-12 md:p-24 relative overflow-hidden"
          >
            {/* Abstract Background Design */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-rose-500/20 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-teal-500/20 blur-[100px] rounded-full"></div>

            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">Turn Your Passion Into a <span className="text-rose-500">Local Business</span></h2>
                <p className="text-slate-300 text-lg mb-12 max-w-lg">Host travelers from around the globe, share your city\'s secrets, and earn more doing what you love.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-xl shadow-rose-900/20">
                    Apply to Guide
                  </button>
                  <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold text-lg transition-all border border-white/10 backdrop-blur-md">
                    Learn How It Works
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400",
                  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400",
                  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
                  "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400"
                ].map((img, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                    className={`rounded-3xl overflow-hidden aspect-square ${i % 2 !== 0 ? 'translate-y-8' : ''}`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt="Local Experience" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. Newsletter Section */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="p-12 rounded-[2.5rem] bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Travel Tips in Your Inbox</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-md mx-auto">Get exclusive local guides and special offers before everyone else.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="you@email.com"
                className="flex-1 px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 outline-none"
              />
              <button className="px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-rose-500/20">
                Join Now
              </button>
            </form>
            <p className="mt-6 text-xs text-gray-400">Join 12,000+ travelers. No spam, ever.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
