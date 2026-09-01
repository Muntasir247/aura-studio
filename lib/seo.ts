import type { Metadata } from "next";
import { SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION, SITE_URL } from "./constants";

interface GenerateMetadataParams {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
}

export function generateMetadata({
  title,
  description,
  path = "",
  image = "/og-default.jpg",
  type = "website",
}: GenerateMetadataParams = {}): Metadata {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} | ${SITE_TAGLINE}`;
  const fullUrl = `${SITE_URL}${path}`;
  const fullImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return {
    title: fullTitle,
    description: description || SITE_DESCRIPTION,
    openGraph: {
      title: fullTitle,
      description: description || SITE_DESCRIPTION,
      url: fullUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title || SITE_NAME,
        },
      ],
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description || SITE_DESCRIPTION,
      images: [fullImage],
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}

export function generateProductMetadata(product: {
  name: string;
  description: string;
  price: number;
  image: string;
  slug: string;
}): Metadata {
  return generateMetadata({
    title: product.name,
    description: product.description,
    path: `/product/${product.slug}`,
    image: product.image,
    type: "website",
  });
}

export function generateCollectionMetadata(collection: {
  name: string;
  description: string;
  slug: string;
}): Metadata {
  return generateMetadata({
    title: collection.name,
    description: collection.description,
    path: `/collections/${collection.slug}`,
  });
}

export function generatePageMetadata(page: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return generateMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
  });
}

/* JSON-LD structured data helpers */

export function productJsonLd(product: {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  slug: string;
  rating: number;
  reviewCount: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    url: `${SITE_URL}/product/${product.slug}`,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: ["https://instagram.com/thevault", "https://youtube.com/thevault"],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
