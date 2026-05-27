import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { news } from "@/lib/news-data";

// TODO: replace with your project URL once a project name or custom domain is set.
const BASE_URL = "";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/sobre", changefreq: "monthly", priority: "0.8" },
          { path: "/servicos", changefreq: "monthly", priority: "0.8" },
          { path: "/pesquisas", changefreq: "weekly", priority: "0.8" },
          { path: "/noticias", changefreq: "daily", priority: "0.9" },
          { path: "/equipa", changefreq: "monthly", priority: "0.6" },
          { path: "/contactos", changefreq: "monthly", priority: "0.6" },
        ];
        const departmentSlugs = ["pesquisa", "consultoria", "treinamento", "comunicacao-e-imagem", "administracao-e-financas"];
        const departmentPaths: SitemapEntry[] = departmentSlugs.map((s) => ({
          path: `/departamento/${s}`,
          changefreq: "monthly",
          priority: "0.6",
        }));
        const newsPaths: SitemapEntry[] = news.map((n) => ({
          path: `/noticias/${n.slug}`,
          lastmod: n.isoDate,
          changefreq: "monthly",
          priority: "0.7",
        }));

        const entries = [...staticPaths, ...departmentPaths, ...newsPaths];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
