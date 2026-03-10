"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSettings } from "@/app/Context/SettingsContext";
import Image from "next/image";

export const ChatBot = () => {
    const pathname = usePathname();
    const { settings } = useSettings();
    const [isOpen, setIsOpen] = useState(false);

    const [suggestedQuestions, setSuggestedQuestions] = useState([]);

    const [messages, setMessages] = useState([
        { id: 1, type: "bot", text: "Hello! I'm Auxinzio's AI Assistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef(null);
    const chatRef = useRef(null);

    useEffect(() => {
        if (!settings?.backend_api_url) return;
        if (pathname?.startsWith("/admin")) return;

        fetch(`${settings.backend_api_url}/api/chatbot/initial`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.statuscode === 200 || data.greeting) {
                    setSuggestedQuestions(data.suggestions || []);
                    // Update the first message only if user hasn't started talking
                    setMessages(prev => {
                        if (prev.length <= 1) {
                            return [{ id: 'initial', type: "bot", text: data.greeting }];
                        }
                        return prev;
                    });
                }
            })
            .catch(err => console.error("Chatbot initialization failed:", err));
    }, [settings.backend_api_url, pathname]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (chatRef.current && !chatRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // Do not show on admin panel
    if (pathname?.startsWith("/admin")) return null;

    const handleSend = (text = input) => {
        const messageText = typeof text === 'string' ? text : input;
        if (!messageText.trim()) return;

        setMessages(prev => {
            const userMsg = { 
                id: `user-${prev.length}`, 
                type: "user", 
                text: messageText 
            };
            return [...prev, userMsg];
        });
        
        setInput("");
        setIsLoading(true);

        if (!settings?.backend_api_url) {
            console.error("Chatbot query failed: backend_api_url is not defined.");
            return;
        }

        fetch(`${settings.backend_api_url}/api/chatbot/query`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: messageText }),
        })
            .then((response) => response.json())
            .then((data) => {
                setMessages(prev => {
                    const botMsg = {
                        id: `bot-${prev.length}`,
                        type: "bot",
                        text: data.answer || "I apologize, I'm having trouble retrieving a response right now."
                    };
                    return [...prev, botMsg];
                });
            })
            .catch(err => {
                console.error("Chatbot query failed:", err);
                setMessages(prev => {
                    const errorMsg = {
                        id: `err-${prev.length}`,
                        type: "bot",
                        text: "Connection interrupted. Please verify your sync status."
                    };
                    return [...prev, errorMsg];
                });
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <div className="fixed bottom-2 right-4 z-[100] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={chatRef}
                        initial={{ opacity: 0, x: 40, scale: 0.85 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 40, scale: 0.95 }}
                        className="mb-4 w-[380px] max-w-[calc(100vw-2rem)] h-[550px] max-h-[calc(100vh-8rem)] bg-white/80 backdrop-blur-2xl rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 bg-gray-900 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full p-2 bg-[#14b88f]/10 flex items-center justify-center border border-[#14b88f]/20 overflow-hidden">
                                    {/* <Sparkles className="w-5 h-5 text-[#14b88f]" /> */}
                                    <Image src="/favicon.png" alt="Logo" width={24} height={24} className="object-contain" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm tracking-tight">Auxinzio AI</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#14b88f] animate-pulse" />
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Neural Active</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label="Close Chat"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div
                            ref={scrollRef}
                            className="flex-1 p-6 overflow-y-auto space-y-4 scrollbar-hide"
                        >
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, x: msg.type === "user" ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${msg.type === "user"
                                        ? "bg-[#14b88f] text-white rounded-tr-none"
                                        : "bg-gray-50 text-gray-600 rounded-tl-none border border-gray-100"
                                        }`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-gray-50 p-4 rounded-2xl rounded-tl-none border border-gray-100 flex gap-1 items-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Suggestions */}
                        {suggestedQuestions.length > 0 && messages.length <= 1 && (
                            <div className="px-6 pb-4 flex flex-wrap gap-2">
                                {suggestedQuestions.slice(0, 5).map((q, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSend(q)}
                                        className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-white border border-gray-100 rounded-full text-gray-400 hover:border-primary/30 hover:text-primary transition-all active:scale-95"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Type your message..."
                                    className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-6 pr-14 text-sm focus:outline-none focus:border-[#14b88f]/30 focus:ring-4 focus:ring-[#14b88f]/5 transition-all outline-none"
                                />
                                <button
                                    onClick={handleSend}
                                    aria-label="Send Message"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#14b88f] text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#14b88f]/20"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Trigger Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Chat"
                className={`group absolute bottom-4 right-4 w-16 h-16 p-3 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 bg-white ${
                    isOpen ? "translate-x-[120%] opacity-0 pointer-events-none" : "translate-x-0 opacity-100"
                }`}
            >
                <div className="relative w-10 h-10">
                    <Image src="/favicon.png" alt="Logo" fill className="object-contain" />
                </div>

                {/* Decorative Ring */}
                {!isOpen && (
                    <div className="absolute inset-0 rounded-full border-4 border-[#14b88f] animate-ping opacity-20" />
                )}
            </motion.button>
        </div>
    );
};
