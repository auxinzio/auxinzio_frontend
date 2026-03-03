export const metadata = {
    title: "Auxinzio | Terms & Conditions",
    description: "Review the Terms and Conditions of Auxinzio to understand the legal framework governing our digital services and your engagement with our ecosystem.",
    keywords: ["terms and conditions", "terms of service", "legal framework", "service agreement", "Auxinzio"],
    openGraph: {
        title: "Auxinzio | Terms & Conditions",
        description: "Review the Terms and Conditions of Auxinzio to understand the legal framework governing our digital services.",
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://auxinz.io/terms-and-conditions",
    },
};

export default function TermsAndConditionsLayout({ children }) {
    return <>{children}</>;
}
