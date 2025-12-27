'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Bot, User, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
    "How do I book a tour?",
    "Can I become a guide?",
    "What is the cancellation policy?",
    "Is my payment secure?",
    "Show me popular destinations"
];

export const ChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello! 👋 I'm your LocalGems assistant. I can help you find tours, become a guide, or answer questions about bookings. How can I help you today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, isOpen]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    const generateResponse = (query: string): string => {
        const lowerQuery = query.toLowerCase();

        if (lowerQuery.match(/(hi|hello|hey|greetings)/)) {
            return "Hi there! Ready to explore some hidden gems? Ask me about 'booking' or 'popular destinations'.";
        }
        if (lowerQuery.match(/(book|join|reserve|buy)/)) {
            return "Booking is easy! Go to the 'Explore' page, click on a tour you like, and hit 'Request to Book'. You won't be charged until the guide confirms.";
        }
        if (lowerQuery.match(/(guide|host|earn|work)/)) {
            return "We'd love to have you! Click 'Become a Guide' in the footer or sign up as a Guide to start listing your own tours and earning money.";
        }
        if (lowerQuery.match(/(price|cost|expensive|cheap)/)) {
            return "Prices are set by our local guides and vary by experience. You can filter tours by price range on the Explore page.";
        }
        if (lowerQuery.match(/(cancel|refund|policy)/)) {
            return "Plans change! You can cancel for a full refund up to 24 hours before the tour starts. Check the specific tour details for more info.";
        }
        if (lowerQuery.match(/(secure|safe|payment)/)) {
            return "Yes, absolutely. We use Stripe for secure payment processing. Your funds are held safely until the tour is completed.";
        }
        if (lowerQuery.match(/(contact|support|help)/)) {
            return "You can reach our human support team at support@localgems.com or call us at +1 (555) 123-4567.";
        }
        if (lowerQuery.match(/(tokyo|rome|japan|italy|destination|popular)/)) {
            return "Our top destinations currently include Tokyo, Rome, and New York! Try searching for a city name in the Explore page to see what's available.";
        }

        return "I'm still learning! I can help with Booking, Becoming a Guide, Payments, or Cancellations. Could you rephrase that?";
    };

    const processMessage = (text: string) => {
        const userMsg: Message = {
            id: Date.now().toString(),
            text: text,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        // Simulate AI delay
        setTimeout(() => {
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: generateResponse(text),
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1200);
    };

    const handleSend = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;
        processMessage(inputValue);
        setInputValue('');
    };

    const handleQuickReply = (question: string) => {
        if (isTyping) return;
        processMessage(question);
    };

    return (
        <>
            {/* Floating Action Button */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className={cn(
                    "fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300",
                    isOpen ? "scale-0 opacity-0 pointer-events-none" : "bg-gradient-to-r from-rose-600 to-orange-500 text-white"
                )}
            >
                <MessageCircle className="w-7 h-7" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-800 flex flex-col overflow-hidden font-sans"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-rose-600 to-orange-500 p-4 flex items-center justify-between text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Gem AI</h3>
                                    <p className="text-xs text-rose-100 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                        Online
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-950/50 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-slate-700">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={cn(
                                        "flex gap-3 max-w-[85%]",
                                        msg.sender === 'user' ? "ml-auto flex-row-reverse" : ""
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                        msg.sender === 'user' ? "bg-gray-200 dark:bg-slate-700" : "bg-rose-100 dark:bg-rose-900/30"
                                    )}>
                                        {msg.sender === 'user' ? (
                                            <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                        ) : (
                                            <Bot className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                                        )}
                                    </div>

                                    <div className={cn(
                                        "p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                                        msg.sender === 'user'
                                            ? "bg-rose-600 text-white rounded-tr-none"
                                            : "bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-100 dark:border-slate-700"
                                    )}>
                                        {msg.text}
                                        <div className={cn(
                                            "text-[10px] mt-1 opacity-70",
                                            msg.sender === 'user' ? "text-rose-100" : "text-gray-400"
                                        )}>
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex gap-3 max-w-[85%]"
                                >
                                    <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center shrink-0">
                                        <Bot className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                                    </div>
                                    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-gray-100 dark:border-slate-700 flex gap-1">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Replies & Input Area */}
                        <div className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">

                            {/* Suggested Questions */}
                            <div className="px-4 pt-3 pb-1 overflow-x-auto whitespace-nowrap scrollbar-none">
                                <div className="flex gap-2">
                                    {SUGGESTED_QUESTIONS.map((q, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleQuickReply(q)}
                                            disabled={isTyping}
                                            className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-900/30 dark:hover:text-rose-400 transition-colors border border-transparent hover:border-rose-200 dark:hover:border-rose-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <HelpCircle className="w-3 h-3 mr-1.5" />
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Input Form */}
                            <form onSubmit={handleSend} className="p-4">
                                <div className="flex gap-2">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="Ask me anything..."
                                        className="flex-1 bg-gray-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-rose-500 dark:text-white placeholder-gray-400"
                                    />
                                    <Button
                                        type="submit"
                                        disabled={!inputValue.trim() || isTyping}
                                        className="w-12 h-12 rounded-xl bg-rose-600 hover:bg-rose-700 p-0 flex items-center justify-center"
                                    >
                                        <Send className="w-5 h-5" />
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
