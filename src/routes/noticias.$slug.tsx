import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Calendar, ArrowLeft, User } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { getNewsBySlug, news } from "@/lib/news-data";

export const Route = createFileRoute("/noticias/$slug")({
  loader: ({ params }) => {
    const article = getNewsBySlug(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData, params }) => {
    const a = loaderData?.article;
    if (!a) {
      return { meta: [{ title: "Notícia não encontrada — EconLab" }] };
    }
    return {
      meta: [
        { title: `${a.title} — EconLab` },
        { name: "description", content: a.summary },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.summary },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/noticias/${params.slug}` },
        { property: "og:image", content: a.image },
        { property: "article:published_time", content: a.isoDate },
        { property: "article:section", content: a.category },
        { property: "article:author", content: a.author },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: a.title },
        { name: "twitter:description", content: a.summary },
        { name: "twitter:image", content: a.image },
      ],
      links: [{ rel: "canonical", href: `/noticias/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: a.title,
            description: a.summary,
            image: [a.image],
            datePublished: a.isoDate,
            articleSection: a.category,
            author: { "@type": "Person", name: a.author },
            publisher: {
              "@type": "Organization",
              name: "EconLab Research & Training",
            },
          }),
        },
      ],
    };
  },
  component: NoticiaDetail,
  notFoundComponent: () => (
    <SiteShell>
      <div className="container-econ py-32 text-center">
        <h1 className="text-3xl">Notícia não encontrada</h1>
        <Link to="/noticias" className="mt-6 inline-block btn-gold">Voltar às Notícias</Link>
      </div>
    </SiteShell>
  ),
});

function NoticiaDetail() {
  const { article } = Route.useLoaderData();
  const related = news.filter((n) => n.slug !== article.slug && n.category === article.category).slice(0, 3);

  return (
    <SiteShell>
      <article>
        <header className="bg-navy text-navy-foreground relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={article.image} alt="" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/60" />
          </div>
          <div className="container-econ relative py-20 md:py-28">
            <Link to="/noticias" className="inline-flex items-center gap-2 text-white/70 hover:text-gold text-xs uppercase tracking-wider">
              <ArrowLeft size={14} /> Notícias
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-[0.22em] font-bold">
              <span className="text-gold">{article.category}</span>
              <span className="text-white/70 inline-flex items-center gap-1.5"><Calendar size={12} /> {article.date}</span>
              <span className="text-white/70 inline-flex items-center gap-1.5"><User size={12} /> {article.author}</span>
            </div>
            <h1 className="!text-white mt-6 text-3xl md:text-5xl font-display font-bold leading-tight max-w-4xl">
              {article.title}
            </h1>
            <span className="gold-bar mt-8" />
          </div>
        </header>

        <section className="py-16 md:py-20">
          <div className="container-econ max-w-3xl">
            <img
              src={article.image}
              alt={article.title}
              width={1600}
              height={1000}
              className="w-full aspect-[16/10] object-cover mb-10"
            />
            <p className="text-lg md:text-xl text-foreground/85 leading-relaxed font-medium">{article.summary}</p>
            <div className="mt-8 space-y-6 text-foreground/80 leading-relaxed">
              {article.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="bg-surface py-16 md:py-20">
            <div className="container-econ">
              <h2 className="text-2xl md:text-3xl">Notícias relacionadas</h2>
              <span className="gold-bar mt-4" />
              <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {related.map((n) => (
                  <Link
                    key={n.slug}
                    to="/noticias/$slug"
                    params={{ slug: n.slug }}
                    className="group bg-background ring-1 ring-border hover:ring-gold transition-all block"
                  >
                    <img src={n.image} alt={n.title} loading="lazy" className="w-full aspect-[16/10] object-cover" />
                    <div className="p-5">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-gold font-bold">{n.category}</div>
                      <h3 className="mt-2 text-base leading-snug group-hover:text-navy">{n.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </SiteShell>
  );
}
