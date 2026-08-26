import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Nothing useful to index, and the success page can carry an order number.
      disallow: ["/cart", "/checkout", "/api/"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
