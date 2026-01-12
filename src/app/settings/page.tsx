'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';
import {
    User, Mail, Bell, Shield, CreditCard,
    Lock, Smartphone, Key, Plus, Trash2,
    Download, CheckCircle, AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

import { useGetMeQuery, useUpdateProfileMutation } from '@/redux/api/userApi';
import { useDispatch } from 'react-redux';
import { setUser, updateUser } from '@/redux/features/auth/authSlice';

export default function Settings() {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);
    const { data: meData } = useGetMeQuery();
    const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
    const [activeTab, setActiveTab] = useState('profile');
    const [isSecurityLoading, setIsSecurityLoading] = useState(false);

    // Profile Form
    interface ProfileFormData {
        name: string;
        email: string;
        bio: string;
        location: string;
    }

    const { register: registerProfile, handleSubmit: handleSubmitProfile } = useForm<ProfileFormData>({
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
            bio: user?.bio || '',
            location: user?.location || '',
        }
    });

    // Security Form
    const { register: registerSecurity, handleSubmit: handleSubmitSecurity, reset: resetSecurity } = useForm();

    const onProfileSubmit = async (data: ProfileFormData) => {
        try {
            const res = await updateProfile(data).unwrap();
            if (res.success) {
                dispatch(updateUser(res.data));
                toast.success('Profile updated successfully!');
            }
        } catch (error) {
            const err = error as { data?: { message?: string } };
            toast.error(err?.data?.message || 'Failed to update profile');
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSecuritySubmit = async (data: any) => { // Keep any for now as it mock
        setIsSecurityLoading(true);
        setTimeout(() => {
            setIsSecurityLoading(false);
            resetSecurity();
            toast.success('Password updated successfully!');
        }, 1500);
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'billing', label: 'Billing', icon: CreditCard },
    ];

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-24 pb-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Account Settings</h1>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 space-y-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === tab.id
                                    ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm border border-gray-100 dark:border-slate-800'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-slate-900/50'
                                    }`}
                            >
                                <tab.icon className="w-5 h-5" />
                                <span className="font-medium">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 p-8"
                        >
                            {/* --- PROFILE TAB --- */}
                            {activeTab === 'profile' && (
                                <form onSubmit={handleSubmitProfile(onProfileSubmit)} className="space-y-6">
                                    <div className="flex items-center gap-6 mb-8">
                                        <img
                                            src={user?.avatar}
                                            alt="Profile"
                                            className="w-24 h-24 rounded-full object-cover border-4 border-gray-50 dark:border-slate-800"
                                        />
                                        <div>
                                            <Button type="button" variant="outline" size="sm">Change Avatar</Button>
                                            <p className="text-xs text-gray-500 mt-2">JPG, GIF or PNG. Max size of 800K</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input id="name" {...registerProfile('name')} />
                                        </div>
                                        <div>
                                            <Label htmlFor="email">Email Address</Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <Input id="email" className="pl-10" {...registerProfile('email')} />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="location">Location</Label>
                                        <Input id="location" {...registerProfile('location')} />
                                    </div>

                                    <div>
                                        <Label htmlFor="bio">Bio</Label>
                                        <Textarea id="bio" className="h-32" {...registerProfile('bio')} />
                                        <p className="text-xs text-gray-500 mt-1">Brief description for your profile.</p>
                                    </div>

                                    <div className="pt-4 flex justify-end">
                                        <Button type="submit" isLoading={isUpdating} className="bg-rose-600 hover:bg-rose-700">
                                            Save Changes
                                        </Button>
                                    </div>
                                </form>
                            )}

                            {/* --- NOTIFICATIONS TAB --- */}
                            {activeTab === 'notifications' && (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Email Notifications</h3>
                                    {[
                                        "New booking requests",
                                        "Booking confirmations",
                                        "Review notifications",
                                        "Marketing and special offers"
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-slate-800 last:border-0">
                                            <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 dark:peer-focus:ring-rose-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-rose-600"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* --- SECURITY TAB --- */}
                            {activeTab === 'security' && (
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                                            <Lock className="w-5 h-5 mr-2 text-rose-500" /> Change Password
                                        </h3>
                                        <form onSubmit={handleSubmitSecurity(onSecuritySubmit)} className="space-y-4 max-w-md">
                                            <div>
                                                <Label htmlFor="currentPassword">Current Password</Label>
                                                <Input type="password" id="currentPassword" {...registerSecurity('currentPassword')} />
                                            </div>
                                            <div>
                                                <Label htmlFor="newPassword">New Password</Label>
                                                <Input type="password" id="newPassword" {...registerSecurity('newPassword')} />
                                            </div>
                                            <div>
                                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                                <Input type="password" id="confirmPassword" {...registerSecurity('confirmPassword')} />
                                            </div>
                                            <Button type="submit" isLoading={isSecurityLoading} variant="secondary">Update Password</Button>
                                        </form>
                                    </div>

                                    <div className="pt-8 border-t border-gray-100 dark:border-slate-800">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                                            <Smartphone className="w-5 h-5 mr-2 text-rose-500" /> Two-Factor Authentication
                                        </h3>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-gray-600 dark:text-gray-300 mb-2">
                                                    Add an extra layer of security to your account by requiring a code when logging in.
                                                </p>
                                                <Badge variant="warning" className="mt-1">Disabled</Badge>
                                            </div>
                                            <Button variant="outline">Enable 2FA</Button>
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-gray-100 dark:border-slate-800">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                                            <Key className="w-5 h-5 mr-2 text-rose-500" /> Active Sessions
                                        </h3>
                                        <div className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center border border-gray-200 dark:border-slate-700">
                                                    <Smartphone className="w-5 h-5 text-gray-500" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">Chrome on macOS</p>
                                                    <p className="text-xs text-gray-500">San Francisco, USA • Active now</p>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                                                Revoke
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* --- BILLING TAB --- */}
                            {activeTab === 'billing' && (
                                <div className="space-y-8">
                                    <div>
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                                                <CreditCard className="w-5 h-5 mr-2 text-rose-500" /> Payment Methods
                                            </h3>
                                            <Button size="sm" variant="outline" className="gap-2">
                                                <Plus className="w-4 h-4" /> Add New
                                            </Button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Card 1 */}
                                            <div className="border border-gray-200 dark:border-slate-700 rounded-2xl p-5 flex items-start justify-between bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden group">
                                                <div className="relative z-10">
                                                    <p className="text-xs text-gray-400 mb-1">Primary Method</p>
                                                    <p className="font-mono text-lg tracking-wider mb-4">•••• •••• •••• 4242</p>
                                                    <div className="flex gap-4 text-xs text-gray-300">
                                                        <div>
                                                            <span className="block text-[10px] text-gray-500 uppercase">Expires</span>
                                                            12/26
                                                        </div>
                                                        <div>
                                                            <span className="block text-[10px] text-gray-500 uppercase">CVC</span>
                                                            •••
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="relative z-10">
                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 bg-white rounded px-1" />
                                                </div>
                                                {/* Decorative circles */}
                                                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                                            </div>

                                            {/* Card 2 */}
                                            <div className="border border-gray-200 dark:border-slate-700 rounded-2xl p-5 flex items-start justify-between bg-white dark:bg-slate-800">
                                                <div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Secondary</p>
                                                    <p className="font-mono text-lg tracking-wider text-gray-900 dark:text-white mb-4">•••• •••• •••• 8899</p>
                                                    <p className="text-xs text-gray-500">Expires 09/25</p>
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                                                    <button className="text-gray-400 hover:text-red-500 transition-colors p-1">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-gray-100 dark:border-slate-800">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Billing History</h3>
                                        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-slate-800">
                                            <table className="w-full text-sm text-left">
                                                <thead className="bg-gray-50 dark:bg-slate-800/50 text-gray-500 dark:text-gray-400 font-medium">
                                                    <tr>
                                                        <th className="px-6 py-3">Invoice</th>
                                                        <th className="px-6 py-3">Date</th>
                                                        <th className="px-6 py-3">Amount</th>
                                                        <th className="px-6 py-3">Status</th>
                                                        <th className="px-6 py-3 text-right">Download</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                                                    {[
                                                        { id: 'INV-001', date: 'Oct 24, 2023', amount: '$45.00', status: 'Paid' },
                                                        { id: 'INV-002', date: 'Sep 12, 2023', amount: '$120.00', status: 'Paid' },
                                                        { id: 'INV-003', date: 'Aug 05, 2023', amount: '$85.00', status: 'Paid' },
                                                    ].map((invoice) => (
                                                        <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/30 transition-colors">
                                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{invoice.id}</td>
                                                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{invoice.date}</td>
                                                            <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{invoice.amount}</td>
                                                            <td className="px-6 py-4">
                                                                <Badge variant="success" className="gap-1">
                                                                    <CheckCircle className="w-3 h-3" /> {invoice.status}
                                                                </Badge>
                                                            </td>
                                                            <td className="px-6 py-4 text-right">
                                                                <button className="text-gray-400 hover:text-rose-600 transition-colors">
                                                                    <Download className="w-4 h-4 ml-auto" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
