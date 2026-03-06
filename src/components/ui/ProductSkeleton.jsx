"use client";

import { motion } from "framer-motion";

const ProductSkeleton = () => {
    return (
        <div className="animate-pulse">
            {/* Tabs Skeleton */}
            <div className="flex flex-wrap gap-4 border-b border-gray-100 pb-2 mb-20 justify-end">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-4 w-24 bg-gray-100 rounded" />
                ))}
            </div>

            <div className="grid lg:grid-cols-12 gap-16 items-center">
                {/* Left side Content Skeleton */}
                <div className="lg:col-span-5 space-y-10">
                    <div className="space-y-6">
                        <div className="h-px w-12 bg-gray-100" />
                        <div className="h-10 w-3/4 bg-gray-100 rounded-lg" />
                        <div className="h-6 w-full bg-gray-50 rounded" />
                    </div>

                    <div className="grid gap-6">
                        <div className="flex items-start gap-4">
                            <div className="w-5 h-5 bg-gray-100 rounded-full mt-1" />
                            <div className="h-5 w-2/3 bg-gray-100 rounded" />
                        </div>
                    </div>

                    <div className="pt-6">
                        <div className="h-6 w-40 bg-gray-100 rounded" />
                    </div>
                </div>

                {/* Right side Mockup Skeleton */}
                <div className="lg:col-span-7 relative">
                    <div className="relative bg-white border border-gray-100 p-2 shadow-sm">
                        <div className="bg-gray-50 flex items-center justify-between px-4 py-2 border-b border-gray-100">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                                <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                                <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                            </div>
                            <div className="h-2 w-20 bg-gray-200 rounded" />
                        </div>
                        <div className="relative aspect-square overflow-hidden bg-gray-50">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductSkeleton;
