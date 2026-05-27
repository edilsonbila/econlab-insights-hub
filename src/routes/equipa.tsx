import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHero } from "@/components/site/SiteShell";
import { team } from "@/lib/site-data";

export const Route = createFileRoute("/equipa")({
  head: () => ({
    meta: [
      { title: "Equipa — EconLab Research & Training" },
      { name: "description", content: "Conheça os economistas, investigadores e formadores da EconLab." },
      { property: "og:title", content: "Equipa EconLab" },
      { property: "og:description", content: "Talento qualificado ao serviço da inteligência económica." },
    ],
  }),
  component: EquipaPage,
});

function EquipaPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="A Nossa Equipa"
        title="Economistas, investigadores e formadores comprometidos com África."
        subtitle="Reunimos profissionais com formação e experiência internacional, unidos pelo compromisso com o desenvolvimento de Moçambique e da região."
      />

      <section className="py-20">
        <div className="container-econ">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {team.map((m) => (
              <article key={m.name} className="bg-background p-8 group">
                <div
                  className="aspect-[4/5] w-full mb-6 relative overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.22 0.13 268) 0%, oklch(0.32 0.13 268) 100%)",
                  }}
                >
                  {m.image ? (
                    <img
                      src={m.image}
                      alt={m.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center">
                      <span className="font-display text-7xl font-bold text-gold/30">
                        {m.name.split(" ").slice(-1)[0]?.[0] ?? "E"}
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold" />
                </div>
                <div className="text-xs uppercase tracking-wider text-gold font-bold">{m.area}</div>
                <h3 className="mt-2 text-xl">{m.name}</h3>
                <p className="mt-1 text-muted-foreground text-sm">{m.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}