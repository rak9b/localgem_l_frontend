'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Send, Image, Smile, Paperclip, Phone, Video, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { motion } from 'framer-motion';
import io, { Socket } from 'socket.io-client';

interface Message {
    chatId: number;
    senderId: string;
    text: string;
    timestamp: string;
    isMine?: boolean;
}

export default function MessagesPage() {
    const { user } = useSelector((state: RootState) => state.auth);
    const [socket, setSocket] = useState<Socket | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [messages, setMessages] = useState<any[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedChat, setSelectedChat] = useState<any>(null);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Mock chats
    const chats = [
        {
            id: 1,
            name: 'Maria Rodriguez',
            role: 'Guide',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
            lastMessage: "I'll meet you at the plaza at 2pm!",
            time: '10:30 AM',
            unread: 2,
            tour: 'Tapas & Wine Tour',
            status: 'online'
        },
        {
            id: 2,
            name: 'John Smith',
            role: 'Tourist',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
            lastMessage: 'Can we reschedule for tomorrow?',
            time: 'Yesterday',
            unread: 0,
            tour: 'Hidden Gems Walk',
            status: 'offline'
        }
    ];

    // Socket.io connection
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000';
        const newSocket = io(socketUrl, {
            transports: ['websocket', 'polling']
        });

        newSocket.on('connect', () => {
            console.log('Connected to chat server');
            setSocket(newSocket);
            if (user?.id) {
                newSocket.emit('join', { userId: user.id });
            }
        });

        newSocket.on('message', (message: Message) => {
            setMessages(prev => [...prev, message]);
            // Use a timeout to ensure DOM update before scrolling
            setTimeout(scrollToBottom, 0);
        });

        newSocket.on('typing', (data: { chatId: number; userId: string }) => {
            // Use a functional update for selectedChat to get the latest value
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setSelectedChat((currentSelectedChat: any) => {
                if (currentSelectedChat && data.chatId === currentSelectedChat.id && data.userId !== user?.id) {
                    setIsTyping(true);
                    setTimeout(() => setIsTyping(false), 3000);
                }
                return currentSelectedChat; // Return the current state
            });
        });

        // setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, [user, scrollToBottom]); // Reconnect only if user changes

    // Effect to scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputMessage.trim() || !socket || !selectedChat) return;

        const message = {
            chatId: selectedChat.id,
            senderId: user?.id,
            text: inputMessage,
            timestamp: new Date().toISOString()
        };

        socket.emit('sendMessage', message);
        setMessages(prev => [...prev, { ...message, isMine: true }]);
        setInputMessage('');
        scrollToBottom();
    };

    const handleTyping = () => {
        if (socket && selectedChat) {
            socket.emit('typing', { chatId: selectedChat.id, userId: user?.id });
        }
    };

    // Mock messages for selected chat
    const chatMessages = selectedChat ? [
        { id: 1, text: "Hi! Looking forward to the tour!", isMine: true, time: '9:00 AM' },
        { id: 2, text: "Hello! Me too! I have some great spots to show you.", isMine: false, time: '9:05 AM' },
        { id: 3, text: "Do you have any dietary restrictions?", isMine: false, time: '9:06 AM' },
        { id: 4, text: "I'm vegetarian, but otherwise all good!", isMine: true, time: '9:10 AM' },
        ...messages.filter(m => m.chatId === selectedChat.id)
    ] : [];

    return (
        <div className="h-screen bg-gray-50 dark:bg-slate-950 pt-20 pb-4">
            <div className="max-w-7xl mx-auto px-4 h-full">
                <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden h-full flex border border-gray-100 dark:border-slate-800 shadow-xl">

                    {/* Sidebar - Chat List */}
                    <div className="w-80 border-r border-gray-100 dark:border-slate-800 flex flex-col">
                        <div className="p-6 border-b border-gray-100 dark:border-slate-800">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h2>
                            <p className="text-sm text-gray-500">Chat with guides and travelers</p>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            {chats.map((chat) => (
                                <button
                                    key={chat.id}
                                    onClick={() => setSelectedChat(chat)}
                                    className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-slate-800 transition border-b border-gray-50 dark:border-slate-800 ${selectedChat?.id === chat.id ? 'bg-rose-50 dark:bg-rose-900/10' : ''
                                        }`}
                                >
                                    <div className="relative">
                                        <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full" />
                                        {chat.status === 'online' && (
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full" />
                                        )}
                                    </div>
                                    <div className="flex-1 text-left overflow-hidden">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-semibold text-gray-900 dark:text-white">{chat.name}</span>
                                            <span className="text-xs text-gray-500">{chat.time}</span>
                                        </div>
                                        <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                                        <p className="text-xs text-rose-600 mt-0.5">{chat.tour}</p>
                                    </div>
                                    {chat.unread > 0 && (
                                        <div className="w-5 h-5 bg-rose-600 text-white text-xs rounded-full flex items-center justify-center">
                                            {chat.unread}
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main Chat Area */}
                    {selectedChat ? (
                        <div className="flex-1 flex flex-col">
                            {/* Chat Header */}
                            <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img src={selectedChat.avatar} alt={selectedChat.name} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white">{selectedChat.name}</h3>
                                        <p className="text-xs text-gray-500">
                                            {selectedChat.status === 'online' ? '🟢 Online' : '🔴 Offline'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" className="rounded-full">
                                        <Phone className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="rounded-full">
                                        <Video className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="rounded-full">
                                        <MoreVertical className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {chatMessages.map((msg, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-md ${msg.isMine ? 'bg-rose-600 text-white' : 'bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white'} rounded-2xl px-4 py-3`}>
                                            <p className="text-sm">{msg.text}</p>
                                            <span className={`text-xs ${msg.isMine ? 'text-rose-100' : 'text-gray-500'} mt-1 block`}>
                                                {msg.time}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="bg-gray-100 dark:bg-slate-800 rounded-2xl px-4 py-3">
                                            <div className="flex gap-1">
                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <form onSubmit={sendMessage} className="p-4 border-t border-gray-100 dark:border-slate-800">
                                <div className="flex items-center gap-2">
                                    <Button type="button" variant="ghost" size="sm" className="rounded-full">
                                        <Paperclip className="w-4 h-4" />
                                    </Button>
                                    <Button type="button" variant="ghost" size="sm" className="rounded-full">
                                        <Image className="w-4 h-4" />
                                    </Button>
                                    <Input
                                        value={inputMessage}
                                        onChange={(e) => {
                                            setInputMessage(e.target.value);
                                            handleTyping();
                                        }}
                                        placeholder="Type a message..."
                                        className="flex-1"
                                    />
                                    <Button type="button" variant="ghost" size="sm" className="rounded-full">
                                        <Smile className="w-4 h-4" />
                                    </Button>
                                    <Button type="submit" className="rounded-full bg-rose-600 hover:bg-rose-700">
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-400">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Send className="w-10 h-10" />
                                </div>
                                <p className="text-lg font-medium">Select a chat to start messaging</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
