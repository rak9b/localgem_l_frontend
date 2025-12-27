'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Sparkles, Zap, Shield, Gift, Percent, Star, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function MembershipPage() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

    const tiers = [
        {
            name: 'Free',
            icon: Star,
            price: { monthly: 0, annual: 0 },
            color: 'gray',
            features: [
                'Browse all tours',
                'Basic search filters',
                'Read reviews',
                'Save up to 5 favorites',
                'Standard support',
                '5% booking fee'
            ],
            limits: [
                'Limited wishlist (5 tours)',
                'No priority booking',
                'Standard cancellation'
            ]
        },
        {
            name: 'Pro',
            icon: Sparkles,
            price: { monthly: 9.99, annual: 99 },
            popular: true,
            color: 'rose',
            features: [
                'Everything in Free',
                'Unlimited wishlist',
                'Advanced filters & sorting',
                'Early booking access (24h)',
                'Price drop alerts',
                'Priority support',
                '2% booking fee (save 3%)',
                'Exclusive Pro-only tours',
                'Share wishlists with friends',
                '1 free tour upgrade/year'
            ],
            limits: []
        },
        {
            name: 'VIP',
            icon: Crown,
            price: { monthly: 29.99, annual: 299 },
            color: 'purple',
            features: [
                'Everything in Pro',
                'White-glove concierge',
                'Custom tour requests',
                'VIP guide matching',
                'Flexible cancellation (48h)',
                'Dedicated support (24/7)',
                '0% booking fee',
                'Exclusive VIP events',
                'Airport lounge access',
                'Travel insurance included',
                '3 free upgrades/year',
                'Priority refunds',
                'Personalized itineraries'
            ],
            limits: []
        }
    ];

    const perks = [
        {
            icon: Percent,
            title: 'Save on Every Booking',
            description: 'Pro members save 3%, VIP members save 5% on booking fees'
        },
        {
            icon: Zap,
            title: 'Early Access',
            description: 'Book popular tours 24-48 hours before the public'
        },
        {
            icon: Shield,
            title: 'Flexible Cancellation',
            description: 'Cancel up to 48 hours before for full refund (VIP)'
        },
        {
            icon: Gift,
            title: 'Exclusive Perks',
            description: 'Members-only tours, events, and surprise upgrades'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Hero */}
                <div className="text-center mb-16">
                    <Badge className="mb-4 bg-rose-100 text-rose-600 border-none text-sm">
                        <Crown className="w-3 h-3 mr-1" /> Membership Plans
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Unlock the Full Experience
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                        Save on every booking, get early access to tours, and enjoy exclusive perks tailored for frequent travelers.
                    </p>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center gap-4 bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-6 py-2 rounded-xl font-medium transition ${billingCycle === 'monthly'
                                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                                    : 'text-gray-600 dark:text-gray-400'
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle('annual')}
                            className={`px-6 py-2 rounded-xl font-medium transition relative ${billingCycle === 'annual'
                                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                                    : 'text-gray-600 dark:text-gray-400'
                                }`}
                        >
                            Annual
                            <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded-full">
                                SAVE 17%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {tiers.map((tier, idx) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`relative bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-lg border ${tier.popular
                                    ? 'border-rose-500 ring-4 ring-rose-500/20'
                                    : 'border-gray-100 dark:border-slate-800'
                                } ${tier.popular ? 'transform scale-105' : ''}`}
                        >
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <Badge className="bg-rose-600 text-white border-none px-4 py-1">
                                        Most Popular
                                    </Badge>
                                </div>
                            )}

                            <div className="text-center mb-6">
                                <div className={`w-16 h-16 mx-auto mb-4 bg-${tier.color}-100 dark:bg-${tier.color}-900/20 rounded-2xl flex items-center justify-center`}>
                                    <tier.icon className={`w-8 h-8 text-${tier.color}-600`} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{tier.name}</h3>
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                                        ${billingCycle === 'monthly' ? tier.price.monthly : Math.round(tier.price.annual / 12)}
                                    </span>
                                    <span className="text-gray-500">/month</span>
                                </div>
                                {billingCycle === 'annual' && tier.price.annual > 0 && (
                                    <p className="text-sm text-gray-500 mt-1">
                                        Billed ${tier.price.annual} annually
                                    </p>
                                )}
                            </div>

                            <ul className="space-y-3 mb-8">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-600 dark:text-gray-300 text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                className={`w-full h-12 ${tier.popular
                                        ? 'bg-rose-600 hover:bg-rose-700'
                                        : tier.name === 'VIP'
                                            ? 'bg-purple-600 hover:bg-purple-700'
                                            : 'bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800'
                                    }`}
                            >
                                {tier.name === 'Free' ? 'Current Plan' : 'Upgrade Now'}
                            </Button>
                        </motion.div>
                    ))}
                </div>

                {/* Perks Section */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
                        Member Exclusive Perks
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {perks.map((perk, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 text-center"
                            >
                                <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <perk.icon className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                                </div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">{perk.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{perk.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA Banner */}
                <div className="bg-gradient-to-r from-rose-600 to-purple-600 rounded-3xl p-12 text-center text-white">
                    <Crown className="w-16 h-16 mx-auto mb-6 opacity-90" />
                    <h3 className="text-3xl font-bold mb-4">Ready to Elevate Your Travels?</h3>
                    <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
                        Join thousands of savvy travelers saving money and discovering exclusive experiences.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button variant="secondary" size="lg" className="bg-white text-rose-600 hover:bg-gray-50">
                            <CreditCard className="w-5 h-5 mr-2" /> Start Free Trial
                        </Button>
                        <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                            Compare Plans
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
