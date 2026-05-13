import { createFileRoute } from "@tanstack/react-router";
import { Calendar, MapPin } from "lucide-react";
import { SiteShell, PageHero } from "@/components/site/SiteShell";
import { events } from "@/lib/site-data";

export const Route = createFileRoute("/eventos")({
  head: () => ({
    meta: [
      { title: "Eventos — EconLab Research & Training" },
      { name: "description", content: "Conferências, fóruns e workshops promovidos pela EconLab em Moçambique e na região." },
      { property: "og:title", content: "Eventos EconLab" },
      { property: "og:description", content: "Agenda institucional de conferências e fóruns económicos." },
    ],
  }),
  component: EventosPage,
});

function EventosPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Agenda Institucional"
        title="Espaços de debate, formação e diálogo de alto nível."
        subtitle="A EconLab promove conferências, fóruns e workshops que reúnem decisores políticos, líderes empresariais e académicos de referência."
      />

      <section className="py-20">
        <div className="container-econ space-y-px bg-border">
          {events.concat(events).map((e, i) => (
            <article key={i} className="bg-background p-10 grid md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-3">
                <div className="border border-navy p-5 inline-block">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{e.type}</div>
                  <div className="mt-2 font-display text-2xl font-bold text-navy">{e.date}</div>
                </div>
              </div>
              <div className="md:col-span-9">
                <h2 className="text-2xl md:text-3xl">{e.title}</h2>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2"><Calendar size={14} className="text-gold" /> {e.date}</span>
                  <span className="inline-flex items-center gap-2"><MapPin size={14} className="text-gold" /> {e.location}</span>
                </div>
                <p className="mt-5 text-foreground/75 leading-relaxed max-w-3xl">{e.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
