import { publications as staticPublications } from "./site-data";
import { slugify } from "./news-store";

export type Publication = {
  slug: string;
  type: string;
  title: string;
  authors: string;
  date: string;
  isoDate: string;
  pdfUrl?: string;
  pdfName?: string;
};

const STORAGE_KEY = "econlab:admin-pesquisas";

// Map static publications to enrich them with slug and isoDate
const getMappedStaticPublications = (): Publication[] => {
  const datesMap: Record<string, string> = {
    "Março 2025": "2025-03-01",
    "Janeiro 2025": "2025-01-01",
    "Novembro 2024": "2024-11-01",
    "Outubro 2024": "2024-10-01",
    "Setembro 2024": "2024-09-01",
    "Julho 2024": "2024-07-01",
  };

  return staticPublications.map((p) => {
    const slug = slugify(p.title);
    return {
      slug,
      type: p.type,
      title: p.title,
      authors: p.authors,
      date: p.date,
      isoDate: datesMap[p.date] || "2024-01-01",
    };
  });
};

function readStored(): Publication[] {
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

function writeStored(items: Publication[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function getAllPesquisas(): Publication[] {
  const staticList = getMappedStaticPublications();
  const stored = readStored();
  
  // Use a Map to merge static and dynamic, keeping dynamic ones if slugs collide (enables editing static ones!)
  const map = new Map<string, Publication>();
  for (const p of staticList) {
    map.set(p.slug, p);
  }
  for (const p of stored) {
    map.set(p.slug, p);
  }
  return Array.from(map.values());
}

export function getPesquisaBySlugStore(slug: string): Publication | undefined {
  return getAllPesquisas().find((p) => p.slug === slug);
}

export function addPesquisa(publication: Publication) {
  const stored = readStored();
  // If editing an existing item (static or dynamic), filter out from dynamic store and write it
  const filtered = stored.filter((p) => p.slug !== publication.slug);
  filtered.unshift(publication);
  writeStored(filtered);
}

export function deleteAdminPesquisa(slug: string) {
  // If it's in stored, delete it
  const stored = readStored();
  writeStored(stored.filter((p) => p.slug !== slug));
  
  // To handle deleting a static one, we could add its slug to a "deleted static list" in localStorage.
  // This is a premium touch! Let's implement static deletion tracking too.
  try {
    const deletedStatic = JSON.parse(window.localStorage.getItem("econlab:deleted-static-pesquisas") || "[]");
    if (!deletedStatic.includes(slug)) {
      deletedStatic.push(slug);
      window.localStorage.setItem("econlab:deleted-static-pesquisas", JSON.stringify(deletedStatic));
    }
  } catch {}
}

export function getAllActivePesquisas(): Publication[] {
  let list = getAllPesquisas();
  try {
    const deletedStatic = JSON.parse(window.localStorage.getItem("econlab:deleted-static-pesquisas") || "[]");
    if (Array.isArray(deletedStatic) && deletedStatic.length > 0) {
      list = list.filter((p) => !deletedStatic.includes(p.slug));
    }
  } catch {}
  return list;
}
