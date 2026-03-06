"use client";

import React, { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";

const LoaderContent = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Only run on initial mount
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Disable loader on admin panel
    if (pathname?.startsWith("/admin")) {
        return null;
    }

    return (
        <div className={`loader-overlay ${!loading ? "loader-hidden" : ""}`}>
            <div className="loader-wrapper">
                <div className="loader-ring"></div>
                <div className="loader-img-container">
                    <Image
                        src="/loader.png"
                        alt="Loading..."
                        width={80}
                        height={80}
                        className="loader-img"
                        priority
                    />
                </div>
            </div>
        </div>
    );
};

const Loader = () => {
    return (
        <Suspense fallback={null}>
            <LoaderContent />
        </Suspense>
    );
};

export default Loader;
