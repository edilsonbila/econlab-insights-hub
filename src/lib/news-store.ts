import { news as staticNews, type NewsArticle } from "./news-data";

const STORAGE_KEY = "econlab:admin-news";

function readStored(): NewsArticle[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStored(items: NewsArticle[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function getAllNews(): NewsArticle[] {
  const stored = readStored();
  const map = new Map<string, NewsArticle>();
  for (const n of staticNews) map.set(n.slug, n);
  for (const n of stored) map.set(n.slug, n);
  return Array.from(map.values());
}

export function getNewsBySlugStore(slug: string): NewsArticle | undefined {
  return getAllNews().find((n) => n.slug === slug);
}

export function getLatestNewsStore(limit = 3): NewsArticle[] {
  return [...getAllNews()]
    .sort((a, b) => (a.isoDate < b.isoDate ? 1 : -1))
    .slice(0, limit);
}

export function addNewsArticle(article: NewsArticle) {
  const stored = readStored();
  const filtered = stored.filter((n) => n.slug !== article.slug);
  filtered.unshift(article);
  writeStored(filtered);
}

export function deleteAdminNews(slug: string) {
  writeStored(readStored().filter((n) => n.slug !== slug));
}

export function getAdminNews(): NewsArticle[] {
  return readStored();
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
