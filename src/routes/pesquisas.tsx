import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Download, Eye } from "lucide-react";
import { SiteShell, PageHero } from "@/components/site/SiteShell";
import { getAllActivePesquisas, type Publication } from "@/lib/pesquisas-store";
import { getViews, incrementViews } from "@/lib/views-store";

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

function generateFallbackPdf(title: string): string {
  // Tiny valid minimal base64 PDF
  return "data:application/pdf;base64,JVBERi0xLjQKJdfljqgKMSAwIG9iagogIDw8L1R5cGUvQ2F0YWxvZy9QYWdlcyAyIDAgUj4+CmVuZG9iagoyIDAgb2JqagogIDw8L1R5cGUvUGFnZXMvS2lkc1szIDAgUl0vQ291bnQgMT4+CmVuZG9iagozIDAgb2JqagogIDw8L1R5cGUvUGFnZS9QYXJlbnQgMiAwIFIvTWVkaWFCb3hbMCAwIDU5NSA4NDJdL1Jlc291cmNlczw8L0ZvbnQ8PC9GMSA0IDAgUj4+Pj4vQ29udGVudHMgNSAwIFI+PgplbmRvYmoKNCAwIG9iagogIDw8L1R5cGUvRm9udC9TdWJ0eXBlL1R5cGUxL0Jhc2VGb250L0hlbHZldGljYT4+CmVuZG9iago1IDAgb2JqagogIDw8L0xlbmd0aCA4MD4+c3RyZWFtCkJUCi9GMSAxMiBUZgoxMCAwIDAgMTAgNTAgODAwIFRkCihFY29uTGFiIFJlc2VhcmNoICYgVHJhaW5pbmcgLSBEb2N1bWVudG8gT2ZpY2lhbCkgVGoKMCAgLTE4IFRkCihQdWJsaWNhY2FvOiApIFRqCkVOCnN0cmVhbQplbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDAwNzAgMDAwMDAgbiAKMDAwMDAwMDEyMSAwMDAwMCBuIAowMDAwMDAwMjQwIDAwMDAwIG4gCjAwMDAwMDAzMDIgMDAwMDAgbiAKdHJhaWxlcgo8PC9TaXplIDYvUm9vdCAxIDAgUj4+CnN0YXJ0eHJlZgo0MzIKJSVFT0Y=";
}

function PesquisasPage() {
  const [items, setItems] = useState<Publication[]>([]);
  const [updater, setUpdater] = useState(0);

  useEffect(() => {
    setItems(getAllActivePesquisas());
  }, [updater]);

  const handleDownload = (p: Publication) => {
    incrementViews(p.slug);
    // Trigger state update to refresh views immediately!
    setUpdater((prev) => prev + 1);
  };

  return (
    <SiteShell>
      <PageHero
        eyebrow="Pesquisas & Publicações"
        title="Conhecimento económico independente, ao serviço da decisão."
        subtitle="Working papers, relatórios sectoriais, anuários económicos e policy briefs produzidos pelos investigadores da EconLab."
      />

      <section className="py-20">
        <div className="container-econ">
          {items.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Nenhuma pesquisa publicada de momento.
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-px bg-border">
              {items.map((p) => {
                const viewsCount = getViews(p.slug);
                return (
                  <article
                    key={p.slug}
                    className="bg-background p-8 flex flex-col group hover:bg-navy hover:text-white transition-all duration-500"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-xs uppercase tracking-[0.2em] font-bold text-gold">{p.type}</div>
                      <div className="text-[10px] text-muted-foreground group-hover:text-white/60 flex items-center gap-1">
                        <Eye size={12} className="text-gold group-hover:text-gold" /> {viewsCount} visualizações
                      </div>
                    </div>
                    <h3 className="mt-4 text-xl leading-snug group-hover:!text-white">{p.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground group-hover:text-white/65">{p.authors}</p>
                    <div className="mt-auto pt-8 flex items-center justify-between text-xs uppercase tracking-wider">
                      <span className="text-muted-foreground group-hover:text-white/55">{p.date}</span>
                      <a
                        href={p.pdfUrl || generateFallbackPdf(p.title)}
                        download={p.pdfName || `${p.slug}.pdf`}
                        onClick={() => handleDownload(p)}
                        className="inline-flex items-center gap-2 font-semibold text-navy group-hover:text-gold hover:underline transition-colors"
                      >
                        PDF <Download size={14} />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
