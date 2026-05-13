import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { SiteShell, PageHero } from "@/components/site/SiteShell";
import { publications } from "@/lib/site-data";

export const Route = createFileRoute("/pesquisas")({
  head: () => ({
    meta: [
      { title: "Pesquisas e Publicações — EconLab" },
      { name: "description", content: "Working papers, relatórios institucionais e policy briefs produzidos pela EconLab." },
      { property: "og:title", content: "Publicações EconLab" },
      { property: "og:description", content: "Conhecimento económico independente, baseado em evidência." },
    ],
  }),
  component: PesquisasPage,
});

function PesquisasPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Pesquisas & Publicações"
        title="Conhecimento económico independente, ao serviço da decisão."
        subtitle="Working papers, relatórios sectoriais, anuários económicos e policy briefs produzidos pelos investigadores da EconLab."
      />

      <section className="py-20">
        <div className="container-econ">
          <div className="grid lg:grid-cols-3 gap-px bg-border">
            {publications.map((p) => (
              <article key={p.title} className="bg-background p-8 flex flex-col group hover:bg-navy hover:text-white transition-all duration-500">
                <div className="text-xs uppercase tracking-[0.2em] font-bold text-gold">{p.type}</div>
                <h3 className="mt-4 text-xl leading-snug group-hover:!text-white">{p.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground group-hover:text-white/65">{p.authors}</p>
                <div className="mt-auto pt-8 flex items-center justify-between text-xs uppercase tracking-wider">
                  <span className="text-muted-foreground group-hover:text-white/55">{p.date}</span>
                  <button className="inline-flex items-center gap-2 font-semibold text-navy group-hover:text-gold">
                    PDF <Download size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
