import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteShell, PageHero } from "@/components/site/SiteShell";
import { departments } from "@/lib/site-data";
import researchImg from "@/assets/research-econlab.jpg";

export const Route = createFileRoute("/departamento/$slug")({
  loader: ({ params }) => {
    const dept = departments[params.slug];
    if (!dept) throw notFound();
    return { dept };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.dept.name} — EconLab` },
      { name: "description", content: loaderData?.dept.tagline ?? "Departamento EconLab" },
      { property: "og:title", content: loaderData?.dept.name ?? "Departamento EconLab" },
      { property: "og:description", content: loaderData?.dept.tagline ?? "" },
    ],
  }),
  component: DepartamentoPage,
  notFoundComponent: () => (
    <SiteShell>
      <div className="container-econ py-32 text-center">
        <h1 className="text-4xl">Departamento não encontrado</h1>
        <Link to="/estrutura-organizacional" className="btn-primary mt-8">Ver Departamentos</Link>
      </div>
    </SiteShell>
  ),
  errorComponent: () => (
    <SiteShell>
      <div className="container-econ py-32 text-center">
        <h1 className="text-3xl">Erro a carregar este departamento.</h1>
      </div>
    </SiteShell>
  ),
});

function DepartamentoPage() {
  const { dept } = Route.useLoaderData();
  return (
    <SiteShell>
      <PageHero eyebrow="Microsite Departamental" title={dept.name} subtitle={dept.tagline} />

      <section className="py-20">
        <div className="container-econ grid md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="eyebrow">Apresentação</span>
            <h2 className="mt-5 text-3xl md:text-4xl">{dept.tagline}</h2>
            <span className="gold-bar mt-6" />
            <p className="mt-8 text-foreground/75 leading-relaxed text-lg">{dept.description}</p>
            <div className="mt-10 border-l-2 border-gold pl-6">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Direcção</div>
              <div className="font-display text-2xl font-bold text-navy mt-1">{dept.director}</div>
            </div>
          </div>
          <div>
            <img src={researchImg} alt="" loading="lazy" width={1600} height={1100} className="w-full aspect-[4/5] object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-econ grid md:grid-cols-2 gap-16">
          <div>
            <span className="eyebrow">Metodologias</span>
            <h2 className="mt-5 text-3xl">Como trabalhamos.</h2>
            <ul className="mt-8 space-y-4">
              {dept.methodologies.map((m) => (
                <li key={m} className="flex gap-3">
                  <CheckCircle2 size={20} className="text-gold mt-0.5 flex-none" />
                  <span className="text-foreground/80">{m}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="eyebrow">Equipa Nuclear</span>
            <h2 className="mt-5 text-3xl">Liderança departamental.</h2>
            <div className="mt-8 space-y-px bg-border">
              {dept.team.map((t) => (
                <div key={t.name} className="bg-background p-5">
                  <div className="font-display font-bold text-navy">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-econ">
          <span className="eyebrow">Projectos Recentes</span>
          <h2 className="mt-5 text-3xl md:text-4xl">Selecção de trabalhos.</h2>
          <div className="mt-12 divide-y divide-border border-y border-border">
            {dept.projects.map((p) => (
              <article key={p.title} className="py-8 grid md:grid-cols-12 gap-6 items-baseline">
                <div className="md:col-span-1 font-display text-2xl font-bold text-gold">{p.year}</div>
                <div className="md:col-span-7">
                  <h3 className="text-xl">{p.title}</h3>
                </div>
                <div className="md:col-span-4 text-sm text-muted-foreground md:text-right">{p.client}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-econ">
          <div className="bg-navy text-white p-12 md:p-20 grid md:grid-cols-3 gap-10 items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-2 h-full bg-gold" />
            <div className="md:col-span-2">
              <span className="eyebrow !text-gold"><span className="text-gold">Colaborar com este departamento</span></span>
              <h2 className="!text-white mt-5 text-3xl md:text-4xl leading-tight">Tem um projecto que se enquadra nesta área?</h2>
            </div>
            <div className="flex md:justify-end">
              <Link to="/contactos" className="btn-gold">Iniciar Conversa <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
