"use client";

import { motion } from "framer-motion";

const ServiceSkeleton = () => {
    return (
        <div className="space-y-4 lg:space-y-10">
            {[1, 2].map((idx) => (
                <div
                    key={idx}
                    className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-32 animate-pulse`}
                >
                    {/* Visual Block Skeleton */}
                    <div className="lg:w-1/2 w-full relative">
                        <div className="relative rounded-[3rem] overflow-hidden bg-gray-100 aspect-[5/3] shadow-sm">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                        </div>
                        {/* Architectural Dot Skeleton */}
                        <div className={`absolute top-1/2 ${idx % 2 !== 0 ? '-right-[84px]' : '-left-[84px]'} w-4 h-4 rounded-full bg-gray-100 border-2 border-gray-200 z-10 hidden lg:block`} />
                    </div>

                    {/* Content Block Skeleton */}
                    <div className="lg:w-1/2 w-full py-8 text-left">
                        <div className="h-16 lg:h-24 w-24 bg-gray-100 rounded-xl mb-8" />
                        <div className="h-12 lg:h-16 w-3/4 bg-gray-100 rounded-lg mb-8" />
                        <div className="space-y-3 mb-12">
                            <div className="h-4 w-full bg-gray-50 rounded" />
                            <div className="h-4 w-5/6 bg-gray-50 rounded" />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6 mb-12">
                            {[1, 2, 3].map((f) => (
                                <div key={f} className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                                    <div className="h-4 w-24 bg-gray-100 rounded" />
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="h-6 w-32 bg-gray-100 rounded" />
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex-shrink-0" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ServiceSkeleton;
