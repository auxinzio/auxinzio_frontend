export const metadata = {
    title: "Auxinzio | Privacy Policy",
    description: "Read the Auxinzio Privacy Policy to understand how we protect your digital sovereignty and manage your data with transparency and security.",
    keywords: ["privacy policy", "data protection", "digital sovereignty", "data security", "GDPR compliance", "Auxinzio"],
    openGraph: {
        title: "Auxinzio | Privacy Policy",
        description: "Read the Auxinzio Privacy Policy to understand how we protect your digital sovereignty and manage your data with transparency and security.",
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://auxinz.io/privacy-policy",
    },
};

export default function PrivacyPolicyLayout({ children }) {
    return <>{children}</>;
}
