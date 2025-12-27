'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, MessageSquare, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import toast from 'react-hot-toast';

const contactSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(5, "Subject is required"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactForm>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactForm) => {
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log(data);
        toast.success("Message sent successfully! We'll get back to you soon.");
        reset();
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Get in Touch</h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Have a question about a booking? Want to partner with us? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">Email Us</p>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">support@localgems.com</p>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">partners@localgems.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">Call Us</p>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">+1 (555) 123-4567</p>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">Mon-Fri, 9am-6pm EST</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">Visit Us</p>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">123 Market Street, Suite 400</p>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">San Francisco, CA 94105</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Teaser */}
                        <div className="bg-gradient-to-br from-rose-600 to-orange-600 p-8 rounded-3xl shadow-lg text-white">
                            <HelpCircle className="w-8 h-8 mb-4 opacity-80" />
                            <h3 className="text-xl font-bold mb-2">Need quick answers?</h3>
                            <p className="text-rose-100 mb-6 text-sm">Check out our Help Center for frequently asked questions about bookings, refunds, and more.</p>
                            <Button variant="secondary" size="sm" className="bg-white text-rose-600 hover:bg-rose-50 border-none w-full">
                                Visit Help Center
                            </Button>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800"
                        >
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                <MessageSquare className="w-5 h-5 mr-2 text-rose-500" /> Send us a message
                            </h3>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="name">Your Name</Label>
                                        <Input id="name" placeholder="John Doe" {...register('name')} />
                                        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input id="email" type="email" placeholder="john@example.com" {...register('email')} />
                                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input id="subject" placeholder="How can we help?" {...register('subject')} />
                                    {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea id="message" placeholder="Tell us more about your inquiry..." className="h-40" {...register('message')} />
                                    {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
                                </div>

                                <div className="flex justify-end">
                                    <Button type="submit" size="lg" isLoading={isSubmitting} className="bg-rose-600 hover:bg-rose-700 min-w-[150px]">
                                        <Send className="w-4 h-4 mr-2" /> Send Message
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
}
