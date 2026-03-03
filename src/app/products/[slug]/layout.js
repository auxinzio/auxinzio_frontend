import { API_URL } from "@/lib/constants";

export async function generateMetadata({ params }) {
    const { slug } = await params;

    try {
        const response = await fetch(`${API_URL}/api/products/productsShow`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ slug: slug }),
        });

        if (!response.ok) {
            return {
                title: "Product Not Found | Auxinzio",
            };
        }

        const result = await response.json();
        const product = result.data.product;

        const descriptionParts = product.description?.split('~').map(part => part.trim()) || [];
        const metaDescription = descriptionParts[0] || product.description || "Enterprise-grade digital solution by Auxinzio.";

        return {
            title: `Auxinzio | ${product.product_name}`,
            description: metaDescription,
            openGraph: {
                title: `Auxinzio | ${product.product_name}`,
                description: metaDescription,
                images: product.image ? [`${API_URL}/${product.image}`] : [],
            },
            alternates: {
                canonical: `https://auxinz.io/products/${slug}`,
            },
        };
    } catch (error) {
        return {
            title: "Product | Auxinzio",
        };
    }
}

export default function ProductDetailLayout({ children }) {
    return <>{children}</>;
}
