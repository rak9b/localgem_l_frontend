'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/redux/features/auth/authSlice';
import { RootState } from '@/redux/store';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X, User as UserIcon, LogOut, PlusCircle, LayoutDashboard, Compass, Settings, Globe, Gift, Tag, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export const Navbar: React.FC = () => {
    const { user, token } = useSelector((state: RootState) => state.auth);
    const isAuthenticated = !!token;
    const dispatch = useDispatch();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        router.push('/');
    };

    const navLinks = [
        { name: 'Explore', path: '/explore' },
        { name: 'Offers', path: '/offers' },
        { name: 'Membership', path: '/membership' },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 z-50 w-full transition-all duration-300 border-b",
                scrolled
                    ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-gray-200 dark:border-slate-800 py-2 shadow-sm"
                    : "bg-transparent border-transparent py-4"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-rose-500/30 transition-all duration-300">
                            <Compass className="text-white w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                            Local<span className="text-rose-500">Gems</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={cn(
                                    "text-sm font-medium transition-colors relative group",
                                    pathname === link.path
                                        ? "text-rose-600 dark:text-rose-400"
                                        : "text-gray-600 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400"
                                )}
                            >
                                {link.name}
                                {link.name === 'Offers' && (
                                    <span className="absolute -top-2 -right-2 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
                                )}
                            </Link>
                        ))}

                        <div className="h-6 w-px bg-gray-200 dark:bg-slate-700 mx-2"></div>

                        <ThemeToggle />

                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4 ml-4">
                                {user?.role === 'GUIDE' && (
                                    <Link href="/create-tour">
                                        <Button variant="secondary" size="sm" className="gap-2 shadow-lg shadow-teal-500/20 bg-teal-600 hover:bg-teal-700 text-white">
                                            <PlusCircle className="w-4 h-4" /> List a Tour
                                        </Button>
                                    </Link>
                                )}

                                <div className="relative group">
                                    <button className="flex items-center space-x-2 focus:outline-none">
                                        <div className="relative">
                                            <img
                                                src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                                                alt={user?.name}
                                                className="w-10 h-10 rounded-full border-2 border-rose-100 dark:border-slate-700 object-cover"
                                            />
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                                        </div>
                                    </button>

                                    {/* Dropdown */}
                                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-gray-100 dark:border-slate-800 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                                        <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-800">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user?.name}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate capitalize flex items-center gap-1">
                                                {user?.role?.toLowerCase() || 'user'}
                                                {user?.isPro && <span className="bg-rose-100 text-rose-600 text-[10px] px-1.5 py-0.5 rounded-full font-bold">PRO</span>}
                                            </p>
                                        </div>
                                        <Link href="/dashboard" className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-2 transition-colors">
                                            <LayoutDashboard className="w-4 h-4" /> Dashboard
                                        </Link>
                                        <Link href="/profile" className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-2 transition-colors">
                                            <UserIcon className="w-4 h-4" /> Profile
                                        </Link>
                                        <Link href="/settings" className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-2 transition-colors">
                                            <Settings className="w-4 h-4" /> Settings
                                        </Link>
                                        <div className="border-t border-gray-100 dark:border-slate-800 my-1"></div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" /> Sign out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3 ml-4">
                                <Link href="/login">
                                    <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800">Log in</Button>
                                </Link>
                                <Link href="/register">
                                    <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-500/20">Sign up</Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center gap-4">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-slate-950 border-b border-gray-100 dark:border-slate-800 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-gray-50 dark:hover:bg-slate-900"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {isAuthenticated ? (
                                <>
                                    <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-gray-50 dark:hover:bg-slate-900">Dashboard</Link>
                                    <Link href="/settings" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-gray-50 dark:hover:bg-slate-900">Settings</Link>
                                    <div className="border-t border-gray-100 dark:border-slate-800 my-2"></div>
                                    <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="w-full text-left px-3 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">Sign out</button>
                                </>
                            ) : (
                                <div className="pt-4 flex flex-col space-y-3">
                                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                                        <Button variant="outline" className="w-full justify-center dark:border-slate-700 dark:text-gray-200">Log in</Button>
                                    </Link>
                                    <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                                        <Button className="w-full justify-center bg-rose-600 hover:bg-rose-700">Sign up</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
