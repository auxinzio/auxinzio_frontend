import { API_URL } from "@/lib/constants";

export async function generateMetadata({ params }) {
    const { slug } = await params;

    try {
        const response = await fetch(`${API_URL}/api/careers/jobShow`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ slug: slug }),
        });

        if (!response.ok) {
            return {
                title: "Opening Not Found | Auxinzio",
            };
        }

        const result = await response.json();
        const career = result.data?.careers;

        if (!career) {
            return {
                title: "Opening Not Found | Auxinzio",
            };
        }

        return {
            title: `Auxinzio | ${career.title}`,
            description: career.description || `Apply for the ${career.title} position in ${career.location} at Auxinzio. Join our world-class team and build your legacy.`,
            openGraph: {
                title: `Auxinzio Careers | ${career.title}`,
                description: career.description,
                type: "website",
            },
            alternates: {
                canonical: `https://auxinz.io/careers/${slug}`,
            },
        };
    } catch (error) {
        return {
            title: "Career Opening | Auxinzio",
        };
    }
}

export default function CareerDetailLayout({ children }) {
    return <>{children}</>;
}
