export const metadata = {
    title: "About Us | Trusted IT Solutions Partner for Digital Transformation",
    description: "Learn how Auxinzio has been helping businesses grow through secure, scalable IT solutions, expert consulting, and innovative software development. Discover our vision, mission, and values.",
    keywords: ["about Auxinzio", "IT solutions company", "digital transformation company", "software development partner", "trusted IT consulting firm", "technology partner for business growth"],
    openGraph: {
        title: "About Auxinzio | Trusted IT Solutions & Digital Transformation Partner",
        description: "Discover how Auxinzio powers business growth through secure, scalable IT solutions, expert consulting, and innovative software development.",
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://auxinz.io/about-us",
    },
};

export default function AboutLayout({ children }) {
    return <>{children}</>;
}
