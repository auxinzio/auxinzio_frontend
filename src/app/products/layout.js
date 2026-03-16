export const metadata = {
    title: "Enterprise IT Products | AttendX HRMS & Workforce Management",
    description: "Discover Auxinzio's enterprise product suite — including AttendX, an AI-powered attendance and workforce management platform built for modern organizations of all sizes.",
    keywords: ["enterprise IT products", "AttendX HRMS", "attendance management system", "workforce management software", "AI HR platform", "employee tracking system", "Auxinzio products"],
    openGraph: {
        title: "Enterprise IT Products | Auxinzio",
        description: "Discover Auxinzio's enterprise product suite — including AttendX, an AI-powered attendance and workforce management platform.",
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
