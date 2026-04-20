import type { MetadataRoute } from "next";

const BASE_URL = "https://auction-calc.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/auction-return",
    "/acquisition-tax",
    "/loan-interest",
    "/rental-yield",
    "/eviction-cost",
    "/guide/auction-return",
    "/guide/acquisition-tax",
    "/guide/loan-interest",
    "/guide/rental-yield",
  ];

  return pages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path.startsWith("/guide") ? 0.7 : 0.9,
  }));
}
