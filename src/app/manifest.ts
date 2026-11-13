import type { MetadataRoute } from "next";
import { defaultDescription, siteUrl } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Raz Stitching — Best Stitching in Karachi",
    short_name: "Raz Stitching",
    description: defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#0e1218",
    theme_color: "#c9a24a",
    lang: "en-PK",
    icons: [
      {
        src: "/logo2-mark.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo2-icon.webp",
        sizes: "128x128",
        type: "image/webp",
      },
    ],
    id: siteUrl,
  };
}
