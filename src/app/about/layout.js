export const metadata = {
    title: "Auxinzio | Engineering Excellence & Visionary Design",
    description: "Learn about the mission, values, and the expert team behind Auxinzio's high-end digital solutions. We synthesize technology with human-centric design.",
    keywords: ["about Auxinzio", "digital transformation mission", "software engineering excellence", "experience design values", "expert digital team"],
    openGraph: {
        title: "Auxinzio | Engineering Excellence & Visionary Design",
        description: "Synthesizing technology with strategic vision and human-centric design.",
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
