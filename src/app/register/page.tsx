'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/features/auth/authSlice';
import { useRegisterMutation } from '@/redux/api/authApi';
import { Button } from '@/components/ui/Button';
import { AlertCircle, ArrowLeft, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [registerUser, { isLoading: isRegisterLoading }] = useRegisterMutation();

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterForm) => {
        setError(null);
        try {
            const result = await registerUser(data).unwrap();
            dispatch(setUser({ user: result.data.user, token: result.data.accessToken }));
            router.push('/dashboard');
        } catch (err: any) {
            setError(err?.data?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex bg-white dark:bg-slate-950">
            {/* Left Side - Image */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-900">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-50"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 to-transparent"></div>
                <div className="relative z-10 p-16 flex flex-col justify-between h-full text-white">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                            <Compass className="text-white w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">LocalGems</span>
                    </Link>
                    <div>
                        <h2 className="text-4xl font-bold mb-6">"To travel is to live."</h2>
                        <p className="text-orange-100 text-lg">Start your journey as a local explorer today.</p>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md w-full space-y-8"
                >
                    <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-rose-600 transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                    </Link>

                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Create an account</h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Already have an account?{' '}
                            <Link href="/login" className="font-medium text-rose-600 dark:text-rose-400 hover:text-rose-500">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    {...register('name')}
                                    className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                                    placeholder="John Doe"
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
                                <input
                                    id="email"
                                    type="email"
                                    {...register('email')}
                                    className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                                    placeholder="you@example.com"
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    {...register('password')}
                                    className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                />
                                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                            </div>
                        </div>

                        {error && (
                            <div className="rounded-xl bg-red-50 dark:bg-red-900/20 p-4 flex items-center border border-red-100 dark:border-red-900/50">
                                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
                                <div className="text-sm text-red-700 dark:text-red-300">{error}</div>
                            </div>
                        )}

                        <Button type="submit" className="w-full h-12 text-base rounded-xl bg-rose-600 hover:bg-rose-700" isLoading={isRegisterLoading}>
                            Create Account
                        </Button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
