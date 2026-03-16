export const metadata = {
    title: "IT Services & Solutions | Web, Mobile, Cybersecurity & More",
    description: "Explore Auxinzio's full suite of IT services — custom web & mobile apps, cybersecurity, enterprise software development, IT consulting, UI/UX design, and data-driven digital marketing.",
    keywords: ["IT services", "web and mobile app development", "custom software development", "cybersecurity services", "IT consulting", "UI UX design services", "digital marketing", "managed IT services", "cloud solutions"],
    openGraph: {
        title: "IT Services & Solutions | Auxinzio",
        description: "From web & mobile development to cybersecurity and digital marketing — explore Auxinzio's full suite of enterprise IT services.",
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://auxinz.io/what-we-do",
    },
};

export default function ServicesLayout({ children }) {
    return <>{children}</>;
}
