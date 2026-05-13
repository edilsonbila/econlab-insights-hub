import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { SiteShell, PageHero } from "@/components/site/SiteShell";

export const Route = createFileRoute("/contactos")({
  head: () => ({
    meta: [
      { title: "Contactos — EconLab Research & Training" },
      { name: "description", content: "Entre em contacto com a EconLab Research & Training. Maputo, Moçambique." },
      { property: "og:title", content: "Contactos EconLab" },
      { property: "og:description", content: "Estamos disponíveis para colaborar consigo." },
    ],
  }),
  component: ContactosPage,
});

function ContactosPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Falar Connosco"
        title="Vamos transformar dados em decisões estratégicas."
        subtitle="Estamos disponíveis para conversar sobre projectos de pesquisa, consultoria estratégica ou programas de formação executiva."
      />

      <section className="py-20">
        <div className="container-econ grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <span className="eyebrow">Sede Institucional</span>
              <h2 className="mt-5 text-2xl">EconLab · Maputo</h2>
              <span className="gold-bar mt-4" />
            </div>
            {[
              { Icon: MapPin, t: "Endereço", d: "Av. Julius Nyerere, 1234\nMaputo · Moçambique" },
              { Icon: Phone, t: "Telefone", d: "+258 21 000 000\n+258 84 000 0000" },
              { Icon: Mail, t: "E-mail", d: "institucional@econlab.co.mz\nimprensa@econlab.co.mz" },
              { Icon: Clock, t: "Horário", d: "Segunda a Sexta\n08:00 – 17:00" },
            ].map(({ Icon, t, d }) => (
              <div key={t} className="flex gap-5">
                <Icon size={22} className="text-gold flex-none mt-1" />
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold text-navy">{t}</div>
                  <p className="mt-1 text-foreground/80 whitespace-pre-line leading-relaxed">{d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3 bg-surface p-10">
            <h2 className="text-2xl">Envie-nos uma mensagem</h2>
            <span className="gold-bar mt-4" />
            <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Nome" placeholder="O seu nome completo" />
                <Field label="Instituição" placeholder="Empresa ou organização" />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="E-mail" type="email" placeholder="email@instituicao.co.mz" />
                <Field label="Telefone" placeholder="+258 ..." />
              </div>
              <Field label="Assunto" placeholder="Como podemos ajudar?" />
              <div>
                <label className="text-xs uppercase tracking-wider font-bold text-navy">Mensagem</label>
                <textarea
                  rows={5}
                  placeholder="Descreva brevemente a sua solicitação"
                  className="mt-2 w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-navy"
                />
              </div>
              <button type="submit" className="btn-primary w-full sm:w-auto">Enviar Mensagem</button>
            </form>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider font-bold text-navy">{label}</label>
      <input
        {...props}
        className="mt-2 w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-navy"
      />
    </div>
  );
}
