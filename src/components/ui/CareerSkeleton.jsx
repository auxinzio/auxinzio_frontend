"use client";

import { motion } from "framer-motion";

const CareerSkeleton = () => {
    return (
        <div className="grid lg:grid-cols-12 gap-16 animate-pulse">
            {/* Left side: Filter Sidebar Skeleton */}
            <div className="lg:col-span-3">
                <div className="space-y-10">
                    <div className="h-4 w-24 bg-gray-100 rounded" />
                    <div className="h-12 w-3/4 bg-gray-100 rounded-lg" />
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-12 bg-gray-50 rounded-xl" />
                        ))}
                    </div>
                </div>
            </div>

            {/* Right side: Jobs Feed Skeleton */}
            <div className="lg:col-span-9">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="bg-white border border-gray-100 rounded-3xl p-8 lg:p-10 space-y-6"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-6 w-24 bg-gray-100 rounded-full" />
                                <div className="w-1 h-1 rounded-full bg-gray-200" />
                                <div className="h-4 w-20 bg-gray-50 rounded" />
                            </div>
                            <div className="h-8 w-3/4 bg-gray-100 rounded-md" />
                            <div className="flex items-center justify-between pt-4">
                                <div className="space-y-2">
                                    <div className="h-2 w-12 bg-gray-50 rounded" />
                                    <div className="h-4 w-16 bg-gray-100 rounded" />
                                </div>
                                <div className="w-14 h-14 rounded-full bg-gray-50" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CareerSkeleton;
