import { site } from "@/lib/content";

export const siteUrl = "https://razstitching.com";

/** Primary keywords for Raz Stitching (Karachi) */
export const seoKeywords = [
  "Raz Stitching",
  "best stitching in Karachi",
  "shalwar kameez",
  "shalwar kameez stitching Karachi",
  "stitching",
  "silai",
  "silai Karachi",
  "stitch",
  "every type of stitching",
  "pant coat",
  "pant coat stitching",
  "waist coat",
  "waistcoat stitching",
  "suit",
  "suit stitching Karachi",
  "ghum silai",
  "kurta pajama stitching",
  "tailor Karachi",
  "Golden Tower stitching",
] as const;

export const defaultTitle =
  "Raz Stitching | Best Stitching in Karachi — Shalwar Kameez, Suit & Silai";

export const defaultDescription =
  "Raz Stitching — best stitching in Karachi for shalwar kameez, suit, pant coat, waist coat, and every type of silai. Visit our Golden Tower shop or book on WhatsApp.";

export const organizationId = `${siteUrl}/#organization`;
export const websiteId = `${siteUrl}/#website`;
export const localBusinessId = `${siteUrl}/#localbusiness`;

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Tailor", "LocalBusiness"],
    "@id": localBusinessId,
    name: site.name,
    alternateName: [
      "Raz Stitching Karachi",
      "Raz Silai",
      "Raz Stitching Golden Tower",
    ],
    url: siteUrl,
    image: absoluteUrl("/logo2-mark.png"),
    logo: absoluteUrl("/logo2-icon.webp"),
    description: defaultDescription,
    email: site.email,
    telephone: [`+${site.whatsapp}`, ...site.phones.map((p) => `+92${p.tel.replace(/^0/, "")}`)],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.shopAddress,
      addressLocality: "Karachi",
      addressRegion: "Sindh",
      addressCountry: "PK",
    },
    areaServed: {
      "@type": "City",
      name: "Karachi",
    },
    geo: {
      "@type": "GeoCoordinates",
      // Golden Tower / Karachi approx — refine when exact pins are available
      latitude: 24.8607,
      longitude: 67.0011,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "11:00",
      closes: "21:00",
    },
    priceRange: "$$",
    sameAs: [
      site.social.instagram,
      site.social.facebook,
      site.social.linkedin,
    ],
    founder: {
      "@type": "Person",
      name: site.owner.name,
      jobTitle: site.owner.role,
    },
    knowsAbout: [...seoKeywords],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Raz Stitching services",
      itemListElement: [
        "Shalwar kameez stitching",
        "Suit stitching",
        "Pant coat stitching",
        "Waist coat stitching",
        "Kurta pajama",
        "Jubba / thobe",
        "Sherwani",
        "Ghum silai",
        "Every type of stitching & silai",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name,
          areaServed: "Karachi",
          provider: { "@id": localBusinessId },
        },
      })),
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    name: site.name,
    alternateName: ["Raz Stitching Karachi", "Raz Silai Karachi"],
    description: defaultDescription,
    publisher: { "@id": localBusinessId },
    inLanguage: "en-PK",
    keywords: seoKeywords.join(", "),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
