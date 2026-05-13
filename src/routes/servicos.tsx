import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Target, GraduationCap } from "lucide-react";
import { SiteShell, PageHero } from "@/components/site/SiteShell";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços — EconLab Research & Training" },
      { name: "description", content: "Pesquisa económica, consultoria estratégica e formação executiva ao mais alto nível institucional." },
      { property: "og:title", content: "Serviços EconLab" },
      { property: "og:description", content: "Soluções integradas de inteligência económica." },
    ],
  }),
  component: ServicosPage,
});

const items = [
  {
    Icon: BarChart3,
    title: "Pesquisa Económica",
    desc: "Estudos macroeconómicos, sectoriais e de avaliação de políticas públicas, com rigor metodológico de padrão internacional.",
    bullets: ["Análises de conjuntura macroeconómica", "Estudos sectoriais aprofundados", "Avaliação de políticas públicas", "Working papers e relatórios institucionais"],
    dept: "pesquisa",
  },
  {
    Icon: Target,
    title: "Consultoria Estratégica",
    desc: "Apoio à decisão para governos, bancos, instituições multilaterais e grandes empresas, em projectos de elevada complexidade.",
    bullets: ["Estratégia corporativa e sectorial", "Estudos de viabilidade e investimento", "Análise regulatória e institucional", "Inteligência de mercado"],
    dept: "consultoria",
  },
  {
    Icon: GraduationCap,
    title: "Formação Executiva",
    desc: "Programas certificados de formação executiva, cursos especializados e workshops corporativos em economia, finanças e dados.",
    bullets: ["Programas executivos em economia", "Cursos de finanças avançadas", "Ciência de dados aplicada", "Workshops corporativos sob medida"],
    dept: "treinamento",
  },
];

function ServicosPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Serviços"
        title="Inteligência económica integrada para decisões de elevado impacto."
        subtitle="Combinamos pesquisa, consultoria e formação numa oferta institucional única, ao serviço de governos, instituições financeiras e grandes empresas."
      />

      <section className="py-24">
        <div className="container-econ space-y-px bg-border">
          {items.map(({ Icon, title, desc, bullets, dept }, i) => (
            <div key={title} className="bg-background p-10 md:p-16 grid md:grid-cols-12 gap-10 items-start">
              <div className="md:col-span-1">
                <div className="font-display text-5xl font-bold text-gold">0{i + 1}</div>
              </div>
              <div className="md:col-span-4">
                <Icon size={36} strokeWidth={1.5} className="text-navy" />
                <h2 className="mt-6 text-3xl md:text-4xl">{title}</h2>
              </div>
              <div className="md:col-span-7">
                <p className="text-foreground/75 text-lg leading-relaxed">{desc}</p>
                <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                  {bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 bg-gold flex-none" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/departamento/$slug"
                  params={{ slug: dept }}
                  className="mt-8 inline-flex items-center gap-2 text-navy font-semibold text-sm uppercase tracking-wider border-b-2 border-gold pb-1"
                >
                  Conhecer departamento <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
