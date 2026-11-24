import { site } from "@/lib/content";

export const siteUrl = "https://razstitching.com";

/** Primary keywords for Raz Stitching (Karachi) */
export const seoKeywords = [
  "Raz Stitching",
  "Raz Stitching Karachi",
  "Raz Stitching official website",
  "Raz Stitching Golden Tower",
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
  "men's tailor Karachi",
  "Golden Tower stitching",
] as const;

/** Brand-first title — wins “Raz Stitching” queries over generic keyword titles */
export const defaultTitle =
  "Raz Stitching | Official Website — Best Stitching in Karachi";

export const defaultDescription =
  "Official website of Raz Stitching, Karachi. Special shalwar kameez, suit, pant coat, waist coat & every type of silai at Golden Tower (Shop 23–30). Book on WhatsApp.";

export const organizationId = `${siteUrl}/#organization`;
export const websiteId = `${siteUrl}/#website`;
export const localBusinessId = `${siteUrl}/#localbusiness`;

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: "Raz Stitching",
    legalName: "Raz Stitching",
    alternateName: [
      "Raz Stitching Karachi",
      "Raz Stitching Golden Tower",
      "Raz Silai",
    ],
    url: siteUrl,
    logo: absoluteUrl("/logo2-icon.webp"),
    image: absoluteUrl("/logo2-mark.png"),
    description: defaultDescription,
    email: site.email,
    telephone: `+${site.whatsapp}`,
    foundingLocation: {
      "@type": "Place",
      name: "Karachi, Pakistan",
    },
    sameAs: [
      site.social.instagram,
      site.social.facebook,
      site.social.linkedin,
      siteUrl,
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: `+${site.whatsapp}`,
        email: site.email,
        areaServed: "PK",
        availableLanguage: ["en", "ur"],
      },
    ],
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Tailor", "LocalBusiness", "MensClothingStore"],
    "@id": localBusinessId,
    name: "Raz Stitching",
    alternateName: [
      "Raz Stitching Karachi",
      "Raz Silai",
      "Raz Stitching Golden Tower",
    ],
    url: siteUrl,
    mainEntityOfPage: siteUrl,
    image: [
      absoluteUrl("/logo2-mark.png"),
      absoluteUrl("/images/signature-hero.jpg"),
      absoluteUrl("/images/suits/suit-shalwar-cream.jpg"),
    ],
    logo: absoluteUrl("/logo2-icon.webp"),
    description: defaultDescription,
    email: site.email,
    telephone: [
      `+${site.whatsapp}`,
      ...site.phones.map((p) => `+92${p.tel.replace(/^0/, "")}`),
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "First Floor, Golden Tower, Shop no 23 to 30",
      addressLocality: "Karachi",
      addressRegion: "Sindh",
      postalCode: "74900",
      addressCountry: "PK",
    },
    areaServed: {
      "@type": "City",
      name: "Karachi",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 24.8607,
      longitude: 67.0011,
    },
    hasMap: "https://www.google.com/maps/search/?api=1&query=Raz+Stitching+Golden+Tower+Karachi",
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
      closes: "22:00",
    },
    priceRange: "$$",
    currenciesAccepted: "PKR",
    paymentAccepted: "Cash, Bank Transfer, JazzCash, EasyPaisa",
    sameAs: [
      site.social.instagram,
      site.social.facebook,
      site.social.linkedin,
    ],
    parentOrganization: { "@id": organizationId },
    founder: {
      "@type": "Person",
      name: site.owner.name,
      jobTitle: site.owner.role,
    },
    knowsAbout: [...seoKeywords],
    slogan: site.tagline,
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
    name: "Raz Stitching",
    alternateName: [
      "Raz Stitching Official Website",
      "Raz Stitching Karachi",
      "Raz Silai Karachi",
    ],
    description: defaultDescription,
    publisher: { "@id": organizationId },
    about: { "@id": localBusinessId },
    inLanguage: "en-PK",
    keywords: seoKeywords.join(", "),
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/track-suit?id={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Raz Stitching?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Raz Stitching is a men's tailor in Karachi specializing in shalwar kameez, suits, pant coats, waist coats, and every type of silai. The official shop is at Golden Tower (First Floor, Shop 23–30). Website: https://razstitching.com",
        },
      },
      {
        "@type": "Question",
        name: "Where is Raz Stitching located in Karachi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Raz Stitching's customer shop is on the First Floor of Golden Tower, Shop no 23 to 30, Karachi. Orders are finished at the Raz factory in Korangi.",
        },
      },
      {
        "@type": "Question",
        name: "How do I book stitching at Raz Stitching?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Book on WhatsApp at ${site.phoneDisplay} or visit the Golden Tower shop. You can also use https://razstitching.com/contact`,
        },
      },
      {
        "@type": "Question",
        name: "Is razstitching.com the official Raz Stitching website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. https://razstitching.com is the official website of Raz Stitching Karachi for bookings, order tracking, size calculator, and shop information.",
        },
      },
    ],
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
