export const metadata = {
    title: "Our Services | Software Development & IT Consulting",
    description: "Explore our range of IT services including custom web development, mobile app development, and strategic IT consulting for your business.",
    keywords: ["IT services", "software development", "web development", "mobile app development", "IT consulting"],
    openGraph: {
        title: "Our Services | Software Development & IT Solutions",
        description: "View our full range of software development and IT consulting services designed for business growth.",
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://auxinz.io/services",
    },
};

export default function ServicesLayout({ children }) {
    return <>{children}</>;
}
