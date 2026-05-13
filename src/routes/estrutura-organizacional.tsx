import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, PageHero } from "@/components/site/SiteShell";
import { departments } from "@/lib/site-data";

export const Route = createFileRoute("/estrutura-organizacional")({
  head: () => ({
    meta: [
      { title: "Estrutura Organizacional — EconLab" },
      { name: "description", content: "Conheça a estrutura de governação e os departamentos da EconLab Research & Training." },
      { property: "og:title", content: "Estrutura Organizacional EconLab" },
      { property: "og:description", content: "Governação, conselho e departamentos institucionais." },
    ],
  }),
  component: EstruturaPage,
});

function EstruturaPage() {
  const depts = Object.values(departments);
  return (
    <SiteShell>
      <PageHero
        eyebrow="Governação Institucional"
        title="Uma estrutura desenhada para garantir excelência, independência e impacto."
        subtitle="A EconLab opera segundo princípios de governação corporativa internacionalmente reconhecidos, com órgãos de direcção, departamentos técnicos e funções de suporte claramente definidos."
      />

      <section className="py-20">
        <div className="container-econ">
          <span className="eyebrow">Órgãos de Governação</span>
          <h2 className="mt-5 text-3xl md:text-4xl">Direcção e Conselhos.</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-px bg-border">
            {[
              { t: "Conselho de Direcção", d: "Órgão máximo de governação institucional, responsável pelo planeamento estratégico." },
              { t: "Direcção Executiva", d: "Coordena a operação corrente e a implementação da estratégia institucional." },
              { t: "Conselho Científico", d: "Garante o rigor metodológico, a integridade académica e a qualidade científica." },
            ].map((b) => (
              <div key={b.t} className="bg-background p-10">
                <h3 className="text-xl">{b.t}</h3>
                <span className="gold-bar mt-4" />
                <p className="mt-5 text-muted-foreground leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-econ">
          <span className="eyebrow">Departamentos</span>
          <h2 className="mt-5 text-3xl md:text-4xl">Cinco departamentos, uma instituição integrada.</h2>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {depts.map((d, i) => (
              <Link
                key={d.slug}
                to="/departamento/$slug"
                params={{ slug: d.slug }}
                className="bg-background p-8 border border-transparent hover:border-gold transition-all group block"
              >
                <div className="font-display text-sm font-bold text-gold">0{i + 1}</div>
                <h3 className="mt-4 text-xl group-hover:text-navy">{d.name}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{d.tagline}</p>
                <div className="mt-6 text-xs uppercase tracking-wider font-semibold text-navy border-b-2 border-gold pb-1 inline-block">
                  Aceder departamento
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
