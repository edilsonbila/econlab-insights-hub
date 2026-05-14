import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Target, GraduationCap, Award, Globe, ShieldCheck, TrendingUp, Users, BookOpen } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import heroImg from "@/assets/hero-econlab.jpg";
import aboutImg from "@/assets/about-econlab.jpg";
import logo from "@/assets/logo-econlab.jpg";
import founder1 from "@/assets/founder-1.jpg";
import founder2 from "@/assets/founder-2.jpg";
import founder3 from "@/assets/founder-3.jpg";
import { events, partners } from "@/lib/site-data";

const founders = [
  { img: founder1, name: "Dr. Hélder Mutombene", role: "Fundador & Presidente Executivo", area: "Estratégia Institucional" },
  { img: founder2, name: "Dr. Aly Capingana", role: "Co-Fundador & Director de Pesquisa", area: "Economia Aplicada" },
  { img: founder3, name: "Dr. Nelson Tivane", role: "Co-Fundador & Director de Consultoria", area: "Política Pública" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EconLab — Transformando Dados em Conhecimento Estratégico" },
      { name: "description", content: "Pesquisa, consultoria e formação para decisões económicas mais inteligentes em Moçambique e África." },
      { property: "og:title", content: "EconLab Research & Training" },
      { property: "og:description", content: "Inteligência económica ao serviço de decisões estratégicas." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative bg-navy text-navy-foreground overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" width={1920} height={1280} className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/60" />
        </div>
        <img src={logo} alt="" aria-hidden className="absolute right-[-80px] bottom-[-80px] w-[480px] opacity-[0.04] pointer-events-none select-none" />
        <div className="container-econ relative py-28 md:py-40">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 max-w-3xl">
              <span className="eyebrow !text-gold"><span className="text-gold">Research · Consulting · Training</span></span>
              <h1 className="!text-white mt-6 text-5xl md:text-7xl font-display font-bold leading-[1.02]">
                Transformando dados em <span className="text-gold">conhecimento estratégico</span>.
              </h1>
              <p className="mt-7 text-lg md:text-xl text-white/75 max-w-2xl leading-relaxed">
                Pesquisa, consultoria e formação para decisões económicas mais inteligentes em Moçambique e na região austral de África.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/servicos" className="btn-gold">Conhecer Serviços <ArrowRight size={16} /></Link>
                <Link to="/pesquisas" className="btn-outline !border-white/30 !text-white hover:!bg-white hover:!text-navy">Ver Publicações</Link>
              </div>
            </div>

            {/* Founder portrait card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end animate-in fade-in slide-in-from-bottom-6 duration-1000">
              <figure className="group relative w-full max-w-sm">
                <div className="absolute -inset-2 bg-gold/20 blur-2xl opacity-60 group-hover:opacity-90 transition-opacity" />
                <div className="absolute -top-3 -left-3 w-24 h-24 border-t-2 border-l-2 border-gold" />
                <div className="absolute -bottom-3 -right-3 w-24 h-24 border-b-2 border-r-2 border-gold" />
                <div className="relative overflow-hidden rounded-sm shadow-2xl ring-1 ring-white/10">
                  <img
                    src={founders[0].img}
                    alt={founders[0].name}
                    width={900}
                    height={1200}
                    className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/95 via-navy/60 to-transparent p-6">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-gold font-bold">{founders[0].area}</div>
                    <div className="font-display text-white text-lg font-bold mt-1">{founders[0].name}</div>
                    <div className="text-xs text-white/70">{founders[0].role}</div>
                  </div>
                </div>
              </figure>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl">
            {[
              { v: "120+", l: "Estudos publicados" },
              { v: "45", l: "Clientes institucionais" },
              { v: "1.800", l: "Quadros formados" },
              { v: "12", l: "Países de actuação" },
            ].map((s) => (
              <div key={s.l} className="border-l-2 border-gold pl-4">
                <div className="font-display text-3xl md:text-4xl font-bold text-white">{s.v}</div>
                <div className="text-xs uppercase tracking-wider text-white/55 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section className="py-24 md:py-32">
        <div className="container-econ grid md:grid-cols-2 gap-16 items-center">
          <div className="relative animate-in fade-in slide-in-from-left-6 duration-1000">
            <img src={aboutImg} alt="EconLab institucional" width={1600} height={1100} loading="lazy" className="w-full aspect-[4/5] object-cover" />
            <div className="absolute -bottom-8 -left-4 md:-left-8 bg-gold p-6 md:p-8 max-w-[200px] hidden md:block">
              <div className="font-display text-2xl md:text-3xl font-bold text-navy">Desde 2018</div>
              <p className="text-xs md:text-sm text-navy/80 mt-2">Ao serviço da inteligência económica em Moçambique.</p>
            </div>
          </div>
          <div>
            <span className="eyebrow">Sobre a EconLab</span>
            <h2 className="mt-5 text-3xl md:text-5xl leading-tight">Um instituto independente de inteligência económica.</h2>
            <span className="gold-bar mt-6" />
            <p className="mt-8 text-foreground/75 leading-relaxed text-lg">
              A EconLab Research &amp; Training é uma instituição moçambicana dedicada à produção de conhecimento económico rigoroso, à consultoria estratégica de alto nível e à formação executiva de quadros para o sector público e privado.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Reunimos economistas, analistas e formadores com experiência internacional, comprometidos com a excelência analítica, a integridade institucional e o desenvolvimento sustentável de África.
            </p>
            <Link to="/sobre" className="mt-8 inline-flex items-center gap-2 text-navy font-semibold text-sm uppercase tracking-wider border-b-2 border-gold pb-1 hover:text-gold">
              Conhecer a Instituição <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ÁREAS DE ACTUAÇÃO */}
      <section className="bg-surface py-24 md:py-32">
        <div className="container-econ">
          <div className="max-w-2xl">
            <span className="eyebrow">Áreas de Actuação</span>
            <h2 className="mt-5 text-3xl md:text-5xl leading-tight">Três pilares, uma só missão institucional.</h2>
          </div>
          <div className="mt-16 grid md:grid-cols-3 gap-px bg-border">
            {[
              { Icon: BarChart3, t: "Pesquisa Económica", d: "Estudos macroeconómicos, sectoriais e de avaliação de políticas, com rigor metodológico internacional." },
              { Icon: Target, t: "Consultoria Estratégica", d: "Apoio à decisão para governos, instituições financeiras e empresas líderes em África." },
              { Icon: GraduationCap, t: "Formação Executiva", d: "Programas certificados em economia aplicada, finanças, ciência de dados e gestão pública." },
            ].map(({ Icon, t, d }) => (
              <div key={t} className="bg-background p-10 group hover:bg-navy hover:text-white transition-all duration-500">
                <Icon size={36} className="text-gold" strokeWidth={1.5} />
                <h3 className="mt-8 text-2xl group-hover:!text-white">{t}</h3>
                <p className="mt-4 text-muted-foreground group-hover:text-white/70 leading-relaxed">{d}</p>
                <span className="gold-bar mt-8 group-hover:w-16 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSÃO VISÃO VALORES */}
      <section className="py-24 md:py-32">
        <div className="container-econ">
          <div className="max-w-2xl">
            <span className="eyebrow">Identidade Institucional</span>
            <h2 className="mt-5 text-3xl md:text-5xl leading-tight">Missão, Visão e Valores.</h2>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-8">
            {[
              { t: "Missão", d: "Produzir conhecimento económico de excelência e capacitar decisores para um desenvolvimento sustentável de Moçambique e de África.", n: "01" },
              { t: "Visão", d: "Ser a referência incontornável em pesquisa, consultoria e formação económica na região austral de África até 2030.", n: "02" },
              { t: "Valores", d: "Independência intelectual, rigor analítico, integridade institucional, excelência académica e compromisso com o continente.", n: "03" },
            ].map((c) => (
              <div key={c.t} className="border border-border p-10 hover:border-gold transition-colors">
                <div className="font-display text-5xl font-bold text-gold">{c.n}</div>
                <h3 className="mt-6 text-2xl">{c.t}</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FACTORES DETERMINANTES */}
      <section className="bg-navy text-navy-foreground py-24 md:py-32">
        <div className="container-econ">
          <div className="max-w-2xl">
            <span className="eyebrow !text-gold"><span className="text-gold">Factores Determinantes</span></span>
            <h2 className="!text-white mt-5 text-3xl md:text-5xl leading-tight">O que nos distingue.</h2>
          </div>
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {[
              { Icon: Award, t: "Excelência Académica", d: "Equipa formada nas melhores universidades de Europa, África e América." },
              { Icon: ShieldCheck, t: "Independência", d: "Investigação livre de pressões políticas ou comerciais." },
              { Icon: Globe, t: "Visão Africana", d: "Profundo conhecimento dos contextos moçambicano e regional." },
              { Icon: TrendingUp, t: "Impacto Mensurável", d: "Recomendações que se traduzem em resultados verificáveis." },
            ].map(({ Icon, t, d }) => (
              <div key={t} className="bg-navy p-8">
                <Icon size={28} className="text-gold" strokeWidth={1.5} />
                <h3 className="!text-white mt-6 text-lg">{t}</h3>
                <p className="mt-3 text-white/65 text-sm leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTOS RECENTES */}
      <section className="py-24 md:py-32">
        <div className="container-econ">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="eyebrow">Agenda Institucional</span>
              <h2 className="mt-5 text-3xl md:text-5xl leading-tight">Eventos recentes.</h2>
            </div>
            <Link to="/eventos" className="text-navy font-semibold text-sm uppercase tracking-wider border-b-2 border-gold pb-1">
              Ver Agenda Completa
            </Link>
          </div>
          <div className="mt-14 divide-y divide-border border-y border-border">
            {events.map((e) => (
              <article key={e.title} className="py-8 grid md:grid-cols-12 gap-6 items-baseline group hover:bg-surface/60 px-2 -mx-2 transition-colors">
                <div className="md:col-span-2 text-sm font-semibold text-navy">{e.date}</div>
                <div className="md:col-span-2 text-xs uppercase tracking-wider text-gold font-bold">{e.type}</div>
                <div className="md:col-span-8">
                  <h3 className="text-xl group-hover:text-navy">{e.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{e.location}</p>
                  <p className="text-sm text-foreground/70 mt-2 leading-relaxed">{e.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FUNDADORES */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-background to-surface">
        <div className="container-econ">
          <div className="max-w-2xl">
            <span className="eyebrow">Os Nossos Fundadores</span>
            <h2 className="mt-5 text-3xl md:text-5xl leading-tight">A liderança por trás da EconLab.</h2>
            <span className="gold-bar mt-6" />
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Três economistas com formação internacional e visão partilhada: colocar o conhecimento ao serviço do desenvolvimento de Moçambique e de África.
            </p>
          </div>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {founders.map((f, i) => (
              <article
                key={f.name}
                className="group relative bg-background ring-1 ring-border hover:ring-gold transition-all duration-500 animate-in fade-in slide-in-from-bottom-6"
                style={{ animationDelay: `${i * 120}ms`, animationFillMode: "both", animationDuration: "900ms" }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={f.img}
                    alt={f.name}
                    width={900}
                    height={1100}
                    loading="lazy"
                    className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                </div>
                <div className="p-7">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-gold font-bold">{f.area}</div>
                  <h3 className="mt-2 text-xl">{f.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{f.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PARCEIROS */}
      <section className="bg-surface py-20">
        <div className="container-econ">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Parceiros Institucionais</span>
            <h2 className="mt-5 text-2xl md:text-4xl">Confiança de instituições de referência.</h2>
          </div>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {partners.map((p) => (
              <div key={p} className="bg-surface aspect-[3/1] grid place-items-center px-6">
                <span className="font-display font-semibold text-navy/70 text-center text-sm md:text-base">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container-econ">
          <div className="bg-navy text-white p-12 md:p-20 grid md:grid-cols-3 gap-10 items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-2 h-full bg-gold" />
            <div className="md:col-span-2">
              <span className="eyebrow !text-gold"><span className="text-gold">Inteligência Económica</span></span>
              <h2 className="!text-white mt-5 text-3xl md:text-5xl leading-tight">Transforme dados em decisões estratégicas.</h2>
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
