import { API_URL } from "@/lib/constants";

export async function generateMetadata({ params }) {
    const { slug } = await params;

    try {
        const response = await fetch(`${API_URL}/api/services/servicesShow`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ slug: slug }),
        });

        if (!response.ok) {
            return {
                title: "Service Not Found | Auxinzio",
            };
        }

        const result = await response.json();
        const service = result.data.service;

        return {
            title: `Auxinzio | ${service.title}`,
            description: service.description?.short_description || "High-end digital service by Auxinzio.",
            openGraph: {
                title: `Auxinzio | ${service.title}`,
                description: service.description?.short_description,
                images: service.main_logo ? [`${API_URL}/${service.main_logo}`] : [],
            },
            alternates: {
                canonical: `https://auxinz.io/services/${slug}`,
            },
        };
    } catch (error) {
        return {
            title: "Service | Auxinzio",
        };
    }
}

export default function ServiceDetailLayout({ children }) {
    return <>{children}</>;
}
