import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, ArrowRight } from "lucide-react";
import { SiteShell, PageHero } from "@/components/site/SiteShell";
import { news, newsCategories, type NewsArticle, type NewsCategory } from "@/lib/news-data";
import { getAllNews } from "@/lib/news-store";

export const Route = createFileRoute("/noticias")({
  head: () => ({
    meta: [
      { title: "Notícias — EconLab Research & Training" },
      { name: "description", content: "Últimas notícias institucionais, eventos e avisos da EconLab Research & Training em Moçambique." },
      { property: "og:title", content: "Notícias EconLab" },
      { property: "og:description", content: "Acompanhe as actualizações institucionais, eventos e avisos da EconLab." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/noticias" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NoticiasPage,
});

function NoticiasPage() {
  const [filter, setFilter] = useState<"Todas" | NewsCategory>("Todas");
  const [allNews, setAllNews] = useState<NewsArticle[]>(news);

  useEffect(() => {
    setAllNews(getAllNews());
  }, []);

  const filtered = filter === "Todas" ? allNews : allNews.filter((n) => n.category === filter);
  const sorted = [...filtered].sort((a, b) => (a.isoDate < b.isoDate ? 1 : -1));

  return (
    <SiteShell>
      <PageHero
        eyebrow="Sala de Imprensa"
        title="Notícias e actualizações institucionais."
        subtitle="Acompanhe as últimas novidades, eventos e comunicações oficiais da EconLab Research & Training."
      />

      <section className="py-16 md:py-20">
        <div className="container-econ">
          <div className="flex flex-wrap gap-2 md:gap-3 mb-10 md:mb-12">
            {(["Todas", ...newsCategories] as const).map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`text-xs uppercase tracking-wider font-semibold px-4 py-2 border transition-colors ${
                  filter === c
                    ? "bg-navy text-white border-navy"
                    : "bg-background text-foreground/70 border-border hover:border-gold hover:text-navy"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sorted.map((n) => (
              <article
                key={n.slug}
                className="group bg-background ring-1 ring-border hover:ring-gold transition-all flex flex-col"
              >
                <Link to="/noticias/$slug" params={{ slug: n.slug }} className="block overflow-hidden">
                  <img
                    src={n.image}
                    alt={n.title}
                    loading="lazy"
                    width={800}
                    height={500}
                    className="w-full aspect-[16/10] object-cover object-[center_top] transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] font-bold">
                    <span className="text-gold">{n.category}</span>
                    <span className="text-muted-foreground inline-flex items-center gap-1.5">
                      <Calendar size={12} /> {n.date}
                    </span>
                  </div>
                  <h2 className="mt-3 text-lg leading-snug">
                    <Link to="/noticias/$slug" params={{ slug: n.slug }} className="hover:text-navy">
                      {n.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">{n.summary}</p>
                  <Link
                    to="/noticias/$slug"
                    params={{ slug: n.slug }}
                    className="mt-5 inline-flex items-center gap-2 text-navy font-semibold text-xs uppercase tracking-wider border-b-2 border-gold pb-1 self-start hover:text-gold"
                  >
                    Ler mais <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
