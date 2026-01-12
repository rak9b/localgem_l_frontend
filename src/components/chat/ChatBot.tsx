'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Sparkles, Bot, User, HelpCircle, Trash2, Loader2, Minus, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    isError?: boolean;
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
    const [isMinimized, setIsMinimized] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [useVoice, setUseVoice] = useState(false);
    const isRecognitionRunning = useRef(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recognitionRef = useRef<any>(null);

    // Initialize with welcome message only on client side
    useEffect(() => {
        const savedMessages = localStorage.getItem('chat_history');
        if (savedMessages) {
            try {
                const parsed = JSON.parse(savedMessages);
                setMessages(parsed.map((msg: Message) => ({ ...msg, timestamp: new Date(msg.timestamp) })));
            } catch (e) {
                console.error("Failed to parse chat history", e);
                setMessages([{
                    id: '1',
                    text: "Hello! 👋 I&apos;m your LocalGems assistant. How can I help you today?",
                    sender: 'bot',
                    timestamp: new Date()
                }]);
            }
        } else {
            setMessages([{
                id: '1',
                text: "Hello! 👋 I&apos;m your LocalGems assistant. I can help you find tours, become a guide, or answer questions about bookings. How can I help you today?",
                sender: 'bot',
                timestamp: new Date()
            }]);
        }
    }, []);

    // Save to local storage
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem('chat_history', JSON.stringify(messages));
        }
    }, [messages]);

    const speak = useCallback((text: string) => {
        if (!useVoice || typeof window === 'undefined') return;

        // Stop any current speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        // Find a premium-sounding voice if possible
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Premium') || v.name.includes('Female'));
        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.pitch = 1.1;
        utterance.rate = 1.0;

        window.speechSynthesis.speak(utterance);
    }, [useVoice]);

    const processMessage = useCallback(async (text: string) => {
        if (isSpeaking) window.speechSynthesis.cancel();

        const userMsg: Message = {
            id: Date.now().toString(),
            text: text,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        try {
            const response = await axios.post('/api/chat', { message: text });
            const botText = response.data.result;

            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: botText,
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);

            // Speak the response if voice is enabled
            if (useVoice) speak(botText);

        } catch (error) {
            console.error("Chat Error:", error);
            let errorMessage = "I&apos;m having trouble connecting right now. Please try again later.";
            if (axios.isAxiosError(error) && error.response?.data?.error) {
                errorMessage = error.response.data.error;
            }
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: errorMessage,
                sender: 'bot',
                timestamp: new Date(),
                isError: true
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    }, [isSpeaking, speak, useVoice]);

    // Initialize Speech Recognition
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (SpeechRecognition) {
                recognitionRef.current = new SpeechRecognition();
                recognitionRef.current.continuous = false;
                recognitionRef.current.interimResults = false;
                recognitionRef.current.lang = 'en-US';

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                recognitionRef.current.onresult = (event: any) => {
                    const transcript = event.results[0][0].transcript;
                    setInputValue(transcript);
                    setIsListening(false);
                    // Automatically send if voice is confident
                    if (event.results[0].isFinal) {
                        processMessage(transcript);
                        setInputValue('');
                    }
                };

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                recognitionRef.current.onerror = (event: any) => {
                    setIsListening(false);

                    if (event.error === 'not-allowed') {
                        toast.error('Microphone access denied. Please enable it in your browser settings to use voice features.');
                    } else if (event.error === 'audio-capture') {
                        toast.error('No microphone found. Please ensure your microphone is plugged in and working.');
                    } else if (event.error === 'network') {
                        toast.error('Speech recognition network error. Please check your internet connection.');
                    } else if (event.error === 'no-speech') {
                        // Just stop listening silently
                    } else {
                        console.error('Speech recognition error:', event.error);
                        toast.error(`Speech recognition error: ${event.error}`);
                    }
                };

                recognitionRef.current.onstart = () => {
                    isRecognitionRunning.current = true;
                    setIsListening(true);
                };

                recognitionRef.current.onend = () => {
                    isRecognitionRunning.current = false;
                    setIsListening(false);
                };
            }
        }
    }, [processMessage]);

    const toggleListening = () => {
        if (!recognitionRef.current) return;

        try {
            if (isRecognitionRunning.current || isListening) {
                recognitionRef.current.stop();
            } else {
                setInputValue('');
                recognitionRef.current.start();
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.name === 'InvalidStateError') {
                // If already started, just sync the state
                isRecognitionRunning.current = true;
                setIsListening(true);
            } else {
                console.error('Speech recognition toggle error:', error);
                setIsListening(false);
                isRecognitionRunning.current = false;
                toast.error('Failed to start speech recognition.');
            }
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, isOpen, isMinimized]);

    useEffect(() => {
        if (isOpen && !isMinimized && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen, isMinimized]);

    const handleSend = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim() || isTyping) return;
        processMessage(inputValue);
        setInputValue('');
    };

    const handleQuickReply = (question: string) => {
        if (isTyping) return;
        processMessage(question);
    };

    const clearChat = () => {
        const initialMsg: Message = {
            id: '1',
            text: "Chat cleared. How else can I help you? 😊",
            sender: 'bot',
            timestamp: new Date()
        };
        setMessages([initialMsg]);
        localStorage.removeItem('chat_history');
    };

    return (
        <div className="fixed bottom-8 right-8 z-[9999]">
            {/* Floating Action Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0, rotate: -45 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            rotate: 0,
                        }}
                        exit={{ scale: 0, opacity: 0, rotate: 45 }}
                        whileHover={{ scale: 1.1, y: -8 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => { setIsOpen(true); setIsMinimized(false); }}
                        className="w-20 h-20 rounded-[2rem] shadow-[0_20px_50px_rgba(225,29,72,0.3)] bg-gradient-to-br from-rose-500 via-rose-600 to-orange-500 text-white flex items-center justify-center relative overflow-hidden group border-2 border-white/30"
                    >
                        {/* Animated Background Pulse */}
                        <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 bg-white rounded-full pointer-events-none"
                        />

                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <MessageCircle className="w-10 h-10 relative z-10" />

                        {isSpeaking && (
                            <motion.div
                                animate={{ height: [4, 12, 4] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                                className="absolute bottom-4 flex gap-1 items-end h-4"
                            >
                                {[1, 2, 3].map(i => <div key={i} className="w-1 bg-white rounded-full h-full" />)}
                            </motion.div>
                        )}

                        <span className="absolute top-4 right-4 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40, transformOrigin: 'bottom right' }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            height: isMinimized ? '80px' : '750px',
                            width: isMinimized ? '300px' : '500px'
                        }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                        className={cn(
                            "bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.25)] border border-white/40 dark:border-slate-800/40 flex flex-col overflow-hidden",
                            isMinimized ? "rounded-full" : "w-[95vw] md:w-[500px]"
                        )}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-orange-500 p-6 flex items-center justify-between text-white shadow-2xl relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center shrink-0 border border-white/40 rotate-6 shadow-inner relative">
                                    {isSpeaking ? (
                                        <Volume2 className="w-8 h-8 text-white animate-pulse" />
                                    ) : (
                                        <Bot className="w-8 h-8 text-white" />
                                    )}
                                    {isListening && (
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                                            <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-extrabold text-xl tracking-tight leading-none">AI Assistant</h3>
                                    {!isMinimized && (
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_12px_rgba(74,222,128,0.8)]"></div>
                                            <span className="text-[11px] font-black text-rose-50 uppercase tracking-[0.2em]">Voice {useVoice ? 'ON' : 'OFF'}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setUseVoice(!useVoice)}
                                    className={cn(
                                        "p-3 rounded-2xl transition-all duration-300",
                                        useVoice ? "bg-white/30 text-white" : "hover:bg-white/25 text-rose-100"
                                    )}
                                    title={useVoice ? "Disable Voice" : "Enable Voice"}
                                >
                                    {useVoice ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                                </button>
                                <button
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className="p-3 hover:bg-white/25 rounded-2xl transition-all duration-300"
                                    title={isMinimized ? "Expand" : "Minimize"}
                                >
                                    {isMinimized ? <Sparkles className="w-6 h-6" /> : <Minus className="w-6 h-6" />}
                                </button>
                                {!isMinimized && (
                                    <button
                                        onClick={clearChat}
                                        className="p-3 hover:bg-white/25 rounded-2xl transition-all duration-300"
                                        title="Clear history"
                                    >
                                        <Trash2 className="w-6 h-6" />
                                    </button>
                                )}
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-3 hover:bg-white/25 rounded-2xl transition-all duration-300"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {!isMinimized && (
                            <>
                                {/* Messages Area */}
                                <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-gradient-to-b from-gray-50/30 to-white dark:from-slate-900/30 dark:to-slate-950 scroll-smooth custom-scrollbar">
                                    {messages.map((msg, index) => (
                                        <motion.div
                                            key={msg.id}
                                            initial={{ opacity: 0, x: msg.sender === 'user' ? 40 : -40, y: 20 }}
                                            animate={{ opacity: 1, x: 0, y: 0 }}
                                            transition={{
                                                delay: index * 0.03,
                                                type: 'spring',
                                                damping: 25,
                                                stiffness: 150
                                            }}
                                            className={cn(
                                                "flex gap-4",
                                                msg.sender === 'user' ? "flex-row-reverse" : "flex-row"
                                            )}
                                        >
                                            <motion.div
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                className={cn(
                                                    "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border-2 shadow-sm transition-all relative",
                                                    msg.sender === 'user'
                                                        ? "bg-white dark:bg-slate-800 border-rose-100 dark:border-slate-700"
                                                        : "bg-gradient-to-br from-rose-50 to-white dark:from-rose-950/20 dark:to-slate-900 border-rose-200 dark:border-rose-900/40"
                                                )}>
                                                {msg.sender === 'user' ? (
                                                    <User className="w-5 h-5 text-rose-500" />
                                                ) : (
                                                    <Bot className="w-5 h-5 text-rose-600" />
                                                )}
                                                {msg.sender === 'bot' && isSpeaking && index === messages.length - 1 && (
                                                    <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-rose-500 rounded-full animate-ping" />
                                                )}
                                            </motion.div>

                                            <div className={cn(
                                                "max-w-[85%] flex flex-col gap-2",
                                                msg.sender === 'user' ? "items-end" : "items-start"
                                            )}>
                                                <div className={cn(
                                                    "px-6 py-4 rounded-[2rem] text-lg leading-relaxed shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all",
                                                    msg.sender === 'user'
                                                        ? "bg-gradient-to-br from-rose-600 to-rose-700 text-white rounded-tr-none font-medium"
                                                        : msg.isError
                                                            ? "bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 border-2 border-red-100 dark:border-red-900/30 font-bold"
                                                            : "bg-white/90 dark:bg-slate-800/90 dark:text-gray-100 text-gray-800 rounded-tl-none border border-white dark:border-slate-700/50 backdrop-blur-md"
                                                )}>
                                                    {msg.text}
                                                </div>
                                                <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-2">
                                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {isTyping && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex gap-4"
                                        >
                                            <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center shrink-0 border-2 border-rose-100 dark:border-rose-900/40 shadow-sm">
                                                <Sparkles className="w-5 h-5 text-rose-500 animate-pulse" />
                                            </div>
                                            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-6 py-5 rounded-[2rem] rounded-tl-none border border-white dark:border-slate-700/50 shadow-lg flex gap-2.5 items-center">
                                                <div className="w-2.5 h-2.5 bg-rose-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                                <div className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                                <div className="w-2.5 h-2.5 bg-rose-600 rounded-full animate-bounce"></div>
                                            </div>
                                        </motion.div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input Area */}
                                <div className="p-8 bg-white/60 dark:bg-slate-900/60 border-t border-white/20 dark:border-slate-800/50 backdrop-blur-3xl">
                                    {/* Suggested Questions */}
                                    {messages.length < 5 && !isTyping && !isListening && (
                                        <div className="pb-6 overflow-x-auto whitespace-nowrap scrollbar-none no-scrollbar">
                                            <div className="flex gap-3">
                                                {SUGGESTED_QUESTIONS.map((q, idx) => (
                                                    <motion.button
                                                        key={idx}
                                                        whileHover={{ scale: 1.05, y: -2 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => handleQuickReply(q)}
                                                        className="px-5 py-2.5 rounded-2xl text-[13px] font-black bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 transition-all duration-300 border-2 border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-rose-300/30"
                                                    >
                                                        {q}
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <form onSubmit={handleSend} className="relative flex items-center gap-4">
                                        <div className="relative flex-1 group">
                                            <input
                                                ref={inputRef}
                                                type="text"
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                placeholder={isListening ? "Listening..." : "Ask anything..."}
                                                className={cn(
                                                    "w-full bg-white dark:bg-slate-800 border-2 rounded-3xl pl-6 pr-14 py-5 text-lg focus:outline-none focus:ring-4 transition-all dark:text-white placeholder:text-gray-400 font-medium shadow-inner",
                                                    isListening
                                                        ? "border-rose-500 ring-rose-500/20 animate-pulse"
                                                        : "border-gray-100 dark:border-slate-700 focus:ring-rose-500/20 focus:border-rose-500"
                                                )}
                                            />
                                            <div className="absolute right-5 top-1/2 -translate-y-1/2">
                                                {isTyping ? (
                                                    <Loader2 className="w-6 h-6 text-rose-500 animate-spin" />
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={toggleListening}
                                                        className={cn(
                                                            "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                                                            isListening
                                                                ? "bg-rose-600 text-white shadow-lg shadow-rose-200 animate-bounce"
                                                                : "bg-rose-50 dark:bg-rose-900/40 text-rose-400 hover:bg-rose-100"
                                                        )}
                                                    >
                                                        {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <motion.button
                                            type="submit"
                                            whileHover={{ scale: 1.1, rotate: -2 }}
                                            whileTap={{ scale: 0.9 }}
                                            disabled={!inputValue.trim() || isTyping || isListening}
                                            className="w-[70px] h-[70px] rounded-[2rem] bg-gradient-to-br from-rose-500 via-rose-600 to-orange-500 disabled:opacity-50 disabled:grayscale text-white flex items-center justify-center shadow-[0_15px_35px_rgba(225,29,72,0.4)] transition-all"
                                        >
                                            <Send className="w-8 h-8" />
                                        </motion.button>
                                    </form>
                                    <div className="flex justify-center items-center gap-2 mt-6">
                                        <div className="h-[1px] w-8 bg-gray-200 dark:bg-slate-800"></div>
                                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em]">
                                            AI Puru Voice Signature
                                        </p>
                                        <div className="h-[1px] w-8 bg-gray-200 dark:bg-slate-800"></div>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(225, 29, 72, 0.1);
                    border-radius: 20px;
                }
                .dark .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(225, 29, 72, 0.2);
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};
