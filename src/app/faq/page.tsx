'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';

export default function FAQ() {
    const [openIndex, setOpenIndex] = React.useState<number | null>(0);

    const faqs = [
        {
            question: "How do I book a tour?",
            answer: "Browse our Explore page, select a tour you like, choose a date and number of guests, and click 'Request to Book'. You'll be prompted to enter payment details, but you won't be charged until the guide confirms."
        },
        {
            question: "What is the cancellation policy?",
            answer: "Most tours offer a full refund if cancelled at least 24 hours before the scheduled start time. Check the specific tour details for any exceptions."
        },
        {
            question: "Are the guides verified?",
            answer: "Yes! Every guide on LocalGems undergoes a strict identity verification process and quality check before they can list tours."
        },
        {
            question: "Is my payment secure?",
            answer: "Absolutely. We use industry-standard encryption and process payments via Stripe. We do not store your credit card details on our servers."
        },
        {
            question: "Can I customize a tour?",
            answer: "Many guides are happy to customize their itinerary. You can message a guide directly from their tour page to discuss specific requests."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-24 pb-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-12">
                    <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mx-auto mb-6">
                        <HelpCircle className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h1>
                    <p className="text-gray-600 dark:text-gray-400">Everything you need to know about LocalGems.</p>
                </div>

                <div className="mb-12">
                    <Input placeholder="Search for answers..." className="h-12" />
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                            >
                                <span className="font-bold text-gray-900 dark:text-white">{faq.question}</span>
                                {openIndex === idx ? (
                                    <Minus className="w-5 h-5 text-rose-600" />
                                ) : (
                                    <Plus className="w-5 h-5 text-gray-400" />
                                )}
                            </button>
                            <motion.div
                                initial={false}
                                animate={{ height: openIndex === idx ? 'auto' : 0 }}
                                className="overflow-hidden"
                            >
                                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {faq.answer}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
