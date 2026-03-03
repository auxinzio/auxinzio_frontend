export const metadata = {
    title: "Auxinzio | Digital Solutions & Engineered Platforms",
    description: "Explore our suite of digital products designed for enterprise intelligence. From AI-driven analytics to robust cloud infrastructure, we build for performance and security.",
    keywords: ["digital solutions", "enterprise intelligence", "AI analytics", "cloud infrastructure", "engineered platforms", "Auxinzio products"],
    openGraph: {
        title: "Auxinzio | Digital Solutions & Engineered Platforms",
        description: "Powering the next generation of enterprise intelligence with our suite of digital products.",
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://auxinz.io/products",
    },
};

export default function ProductsLayout({ children }) {
    return <>{children}</>;
}
