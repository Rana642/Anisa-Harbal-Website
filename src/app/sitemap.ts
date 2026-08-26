import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

const ROUTES = [
  { path: "/", priority: 1 },
  { path: "/products/miracle-hair-oil", priority: 0.9 },
  { path: "/collections/all", priority: 0.7 },
  { path: "/about", priority: 0.6 },
  { path: "/contact", priority: 0.5 },
  { path: "/policies/shipping-policy", priority: 0.3 },
  { path: "/policies/refund-policy", priority: 0.3 },
  { path: "/policies/privacy-policy", priority: 0.3 },
  { path: "/policies/terms-of-service", priority: 0.3 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((route) => ({
    url: `${SITE.url}${route.path}`,
    lastModified,
    priority: route.priority,
  }));
}
