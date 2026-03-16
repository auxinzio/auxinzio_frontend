export const metadata = {
    title: "About Us | Our Mission & Reliable IT Solutions",
    description: "Discover our mission to provide businesses with practical IT solutions and reliable software development. Learn about our team and commitment to excellence.",
    keywords: ["about Auxinzio", "IT solutions team", "software development company", "business technology partner"],
    openGraph: {
        title: "About Auxinzio | Providing Reliable IT Solutions",
        description: "Learn how we help businesses grow through secure, scalable, and practical IT solutions.",
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://auxinz.io/about",
    },
};

export default function AboutLayout({ children }) {
    return <>{children}</>;
}
