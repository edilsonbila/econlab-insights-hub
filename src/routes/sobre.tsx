import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHero } from "@/components/site/SiteShell";
import aboutImg from "@/assets/about-econlab.jpg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a EconLab — Instituto de Inteligência Económica" },
      { name: "description", content: "Conheça a EconLab Research & Training: missão, história, governação e equipa." },
      { property: "og:title", content: "Sobre a EconLab" },
      { property: "og:description", content: "Instituto independente de pesquisa, consultoria e formação económica." },
    ],
  }),
  component: SobrePage,
});

function SobrePage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Quem Somos"
        title="Uma instituição construída sobre o rigor, a independência e o compromisso com África."
        subtitle="Fundada em 2018, a EconLab Research & Training nasce da convicção de que decisões económicas melhores se constroem com evidência rigorosa, análise independente e talento qualificado."
      />

      <section className="py-24">
        <div className="container-econ grid md:grid-cols-2 gap-16">
          <div>
            <span className="eyebrow">A Nossa História</span>
            <h2 className="mt-5 text-3xl md:text-4xl">Da investigação académica ao impacto institucional.</h2>
            <span className="gold-bar mt-6" />
            <div className="mt-8 space-y-5 text-foreground/75 leading-relaxed">
              <p>A EconLab foi fundada em Maputo por um grupo de economistas moçambicanos com formação internacional, com o propósito de criar uma instituição capaz de produzir conhecimento económico de excelência e de o colocar ao serviço do desenvolvimento do país e da região.</p>
              <p>Ao longo dos anos, consolidou-se como referência em pesquisa aplicada, assessoria estratégica a governos e instituições multilaterais, e formação executiva de quadros para o sector público e privado.</p>
              <p>Hoje, a EconLab opera em mais de uma dezena de países africanos, mantendo parcerias com universidades, bancos centrais, think tanks e organismos multilaterais.</p>
            </div>
          </div>
          <div>
            <img src={aboutImg} alt="" loading="lazy" width={1600} height={1100} className="w-full aspect-[4/5] object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="container-econ">
          <span className="eyebrow">Princípios Fundadores</span>
          <h2 className="mt-5 text-3xl md:text-4xl max-w-2xl">Os princípios que orientam toda a nossa actuação.</h2>
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {[
              { t: "Independência", d: "Pesquisa livre de interferência política ou comercial." },
              { t: "Rigor", d: "Metodologias auditáveis e padrões académicos internacionais." },
              { t: "Integridade", d: "Transparência absoluta na produção e divulgação do conhecimento." },
              { t: "Impacto", d: "Compromisso com a transformação real das instituições e das economias." },
            ].map((p, i) => (
              <div key={p.t} className="bg-background p-10">
                <div className="font-display text-sm font-bold text-gold">0{i + 1}</div>
                <h3 className="mt-4 text-xl">{p.t}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-econ grid md:grid-cols-3 gap-12">
          {[
            { y: "2018", t: "Fundação", d: "Constituição formal do instituto em Maputo." },
            { y: "2021", t: "Expansão Regional", d: "Início de operações em projectos para a SADC." },
            { y: "2025", t: "Liderança Continental", d: "Reconhecimento como think tank de referência em África Austral." },
          ].map((m) => (
            <div key={m.y} className="border-l-2 border-gold pl-6">
              <div className="font-display text-4xl font-bold text-navy">{m.y}</div>
              <h3 className="mt-3 text-xl">{m.t}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{m.d}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
