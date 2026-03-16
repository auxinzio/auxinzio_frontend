export const metadata = {
    title: "Our Products | Business Solutions & Software Platforms",
    description: "Discover our suite of software products designed to improve business efficiency, including our AI-powered attendance management system.",
    keywords: ["business software", "software products", "attendance management", "HR software"],
    openGraph: {
        title: "Our Products | Business Solutions & Software Platforms",
        description: "Practical software solutions built to improve business productivity and performance.",
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
