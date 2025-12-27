'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Database, Server, Layout, Shield, Globe, FileText, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export default function DeveloperDocs() {
    const mappings = [
        { route: '/', component: 'Home.tsx', api: 'GET /api/tours/featured', type: 'Public' },
        { route: '/explore', component: 'Explore.tsx', api: 'GET /api/tours', type: 'Public' },
        { route: '/tours/:id', component: 'TourDetails.tsx', api: 'GET /api/tours/:id', type: 'Public' },
        { route: '/dashboard', component: 'Dashboard.tsx', api: 'GET /api/users/dashboard', type: 'Protected' },
        { route: '/create-tour', component: 'CreateTour.tsx', api: 'POST /api/tours', type: 'Guide Only' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-16">
                    <Badge variant="outline" className="mb-4">v1.0.0-beta</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        System Architecture & <br />
                        <span className="text-rose-600">Developer Documentation</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
                        A comprehensive overview of the LocalGems platform structure, API mappings, and security protocols.
                    </p>
                </div>

                {/* Architecture Diagram (Visual) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg"
                    >
                        <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                            <Layout className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Frontend Client</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Next.js • TypeScript • Tailwind</p>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <li className="flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> App Router Architecture</li>
                            <li className="flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> Redux Toolkit State</li>
                            <li className="flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> JWT Storage (localStorage)</li>
                        </ul>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-green-500/10 to-transparent rounded-bl-full"></div>
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-xl flex items-center justify-center mb-6">
                            <Server className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">API Server</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Node.js • Express</p>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <li className="flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> RESTful Endpoints</li>
                            <li className="flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> Middleware Auth</li>
                            <li className="flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> Rate Limiting</li>
                        </ul>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg"
                    >
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                            <Database className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Database</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">PostgreSQL • Prisma</p>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <li className="flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> Relational Schema</li>
                            <li className="flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> ACID Transactions</li>
                            <li className="flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> Automated Backups</li>
                        </ul>
                    </motion.div>
                </div>

                {/* Route Mappings Table */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm mb-20">
                    <div className="px-8 py-6 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                            <Globe className="w-5 h-5 mr-2 text-rose-500" /> Route to Service Mapping
                        </h3>
                        <span className="text-xs text-gray-500 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded-full">Live Map</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 dark:bg-slate-950/50 text-gray-500 dark:text-gray-400">
                                <tr>
                                    <th className="px-8 py-4 font-medium">Frontend Route</th>
                                    <th className="px-8 py-4 font-medium">Component</th>
                                    <th className="px-8 py-4 font-medium">Backend Service</th>
                                    <th className="px-8 py-4 font-medium">Access</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                                {mappings.map((map, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-8 py-4 font-mono text-rose-600 dark:text-rose-400">{map.route}</td>
                                        <td className="px-8 py-4 text-gray-700 dark:text-gray-300">{map.component}</td>
                                        <td className="px-8 py-4 font-mono text-gray-600 dark:text-gray-400">{map.api}</td>
                                        <td className="px-8 py-4">
                                            <Badge variant={map.type === 'Public' ? 'success' : 'warning'}>{map.type}</Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
