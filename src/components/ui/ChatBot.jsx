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

    const [messages, setMessages] = useState([
        { id: 1, type: "bot", text: "Hello! I'm Auxinzio's AI Assistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState("");
    const scrollRef = useRef(null);
    const chatRef = useRef(null);

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

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), type: "user", text: input };
        setMessages([...messages, userMsg]);
        setInput("");

        if (!settings?.backend_api_url) {
            const botMsg = { id: Date.now() + 1, type: "bot", text: "I'm sorry, I'm currently disconnected from the server." };
            setMessages(prev => [...prev, botMsg]);
            return;
        }

        fetch(`${settings.backend_api_url}/api/chatbot/query`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: input }),
        })
            .then((response) => response.json())
            .then((data) => {
                const botMsg = {
                    id: Date.now() + 1,
                    type: "bot",
                    text: data.answer
                };
                setMessages(prev => [...prev, botMsg]);
            });
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
                                <div className="w-10 h-10 rounded-full p-2 bg-[#14b8a6]/10 flex items-center justify-center border border-[#14b8a6]/20 overflow-hidden">
                                    {/* <Sparkles className="w-5 h-5 text-[#14b8a6]" /> */}
                                    <Image src="/favicon.png" alt="Logo" width={24} height={24} className="object-contain" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm tracking-tight">Auxinzio AI</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#14b8a6] animate-pulse" />
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Neural Active</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors"
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
                                        ? "bg-[#14b8a6] text-white rounded-tr-none"
                                        : "bg-gray-50 text-gray-600 rounded-tl-none border border-gray-100"
                                        }`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Type your message..."
                                    className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-6 pr-14 text-sm focus:outline-none focus:border-[#14b8a6]/30 focus:ring-4 focus:ring-[#14b8a6]/5 transition-all outline-none"
                                />
                                <button
                                    onClick={handleSend}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#14b8a6] text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#14b8a6]/20"
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
                className={`group absolute bottom-4 right-4 w-16 h-16 p-3 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 bg-white ${isOpen ? "translate-x-[120%] opacity-0 pointer-events-none" : "translate-x-0 opacity-100"
                    }`}
            >
                <div className="relative w-10 h-10">
                    <Image src="/favicon.png" alt="Logo" fill className="object-contain" />
                </div>

                {/* Decorative Ring */}
                {!isOpen && (
                    <div className="absolute inset-0 rounded-full border-4 border-[#14b8a6] animate-ping opacity-20" />
                )}
            </motion.button>
        </div>
    );
};
