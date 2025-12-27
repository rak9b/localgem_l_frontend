'use client';

import React from 'react';
import { MOCK_ADMIN_STATS } from '@/data/mockData';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Users, CreditCard, ShieldCheck, Activity, Search, Filter, MoreHorizontal } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Overview</h1>
                    <p className="text-gray-600 dark:text-gray-400">System status and platform metrics</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{MOCK_ADMIN_STATS.totalUsers}</h3>
                                <p className="text-sm text-gray-500">Total Users</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl text-green-600">
                                <CreditCard className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">${MOCK_ADMIN_STATS.totalRevenue.toLocaleString()}</h3>
                                <p className="text-sm text-gray-500">Total Revenue</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-purple-600">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{MOCK_ADMIN_STATS.activeGuides}</h3>
                                <p className="text-sm text-gray-500">Active Guides</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-amber-600">
                                <Activity className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">99.9%</h3>
                                <p className="text-sm text-gray-500">System Uptime</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Activity Feed */}
                    <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
                            <Button variant="ghost" size="sm">Export Log</Button>
                        </div>
                        <div className="p-6">
                            <div className="space-y-6">
                                {MOCK_ADMIN_STATS.recentActivity.map((activity) => (
                                    <div key={activity.id} className="flex items-start gap-4">
                                        <div className="mt-1">
                                            <div className="w-2 h-2 rounded-full bg-rose-500" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-gray-900 dark:text-white font-medium">{activity.details}</p>
                                            <p className="text-sm text-gray-500 mt-1">{activity.time} • {activity.type}</p>
                                        </div>
                                        <Button size="sm" variant="outline" className="h-8 text-xs">Details</Button>
                                    </div>
                                ))}
                                <div className="flex items-start gap-4 opacity-50">
                                    <div className="mt-1">
                                        <div className="w-2 h-2 rounded-full bg-gray-300" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-900 dark:text-white font-medium">System backup completed</p>
                                        <p className="text-sm text-gray-500 mt-1">3 hours ago • SYSTEM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 h-fit">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Management</h2>
                        <div className="space-y-3">
                            <Button variant="outline" className="w-full justify-start h-12">
                                <Users className="w-4 h-4 mr-3" /> Manage Users
                            </Button>
                            <Button variant="outline" className="w-full justify-start h-12">
                                <ShieldCheck className="w-4 h-4 mr-3" /> Verify Guide Applications
                                <Badge className="ml-auto bg-rose-100 text-rose-600 border-none">3</Badge>
                            </Button>
                            <Button variant="outline" className="w-full justify-start h-12">
                                <CreditCard className="w-4 h-4 mr-3" /> Payment Settings
                            </Button>
                            <Button variant="outline" className="w-full justify-start h-12 text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                                <Activity className="w-4 h-4 mr-3" /> View System Logs
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
