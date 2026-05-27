// Store for tracking views of news and research publications
const VIEWS_KEY = "econlab:views";

// Generate a stable base view count using a hash of the slug
function getBaseViews(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Returns a stable number between 120 and 1450
  return 120 + Math.abs(hash % 1330);
}

export function getViews(slug: string): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = window.localStorage.getItem(VIEWS_KEY);
    const viewsMap = raw ? JSON.parse(raw) : {};
    const base = getBaseViews(slug);
    const dynamic = typeof viewsMap[slug] === "number" ? viewsMap[slug] : 0;
    return base + dynamic;
  } catch {
    return getBaseViews(slug);
  }
}

export function incrementViews(slug: string) {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(VIEWS_KEY);
    const viewsMap = raw ? JSON.parse(raw) : {};
    viewsMap[slug] = (viewsMap[slug] || 0) + 1;
    window.localStorage.setItem(VIEWS_KEY, JSON.stringify(viewsMap));
  } catch (e) {
    console.error("Error saving view count to localStorage", e);
  }
}
