import { Link } from "@tanstack/react-router";
import { Linkedin, Twitter, Facebook, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo-econlab.jpg";

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground mt-24">
      <div className="container-econ py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-white p-1.5 rounded-sm">
              <img src={logo} alt="EconLab" className="h-10 w-10 object-contain" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-base">EconLab</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/60">Research &amp; Training</div>
            </div>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            Instituto independente de investigação económica, consultoria estratégica e formação executiva, ao serviço do desenvolvimento de Moçambique e de África.
          </p>
          <div className="flex gap-3 mt-6">
            {[Linkedin, Twitter, Facebook].map((Icon, i) => (
              <a key={i} href="#" className="h-9 w-9 grid place-items-center border border-white/15 hover:bg-gold hover:text-navy hover:border-gold transition-all">
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white text-xs uppercase tracking-[0.22em] mb-5 font-semibold">Instituição</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li><Link to="/sobre" className="hover:text-gold">Sobre a EconLab</Link></li>
            <li><Link to="/estrutura-organizacional" className="hover:text-gold">Estrutura Organizacional</Link></li>
            <li><Link to="/equipa" className="hover:text-gold">A Nossa Equipa</Link></li>
            <li><Link to="/pesquisas" className="hover:text-gold">Publicações &amp; Pesquisas</Link></li>
            <li><Link to="/eventos" className="hover:text-gold">Eventos</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-xs uppercase tracking-[0.22em] mb-5 font-semibold">Áreas de Actuação</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li><Link to="/departamento/$slug" params={{ slug: "pesquisa" }} className="hover:text-gold">Pesquisa Económica</Link></li>
            <li><Link to="/departamento/$slug" params={{ slug: "consultoria" }} className="hover:text-gold">Consultoria Estratégica</Link></li>
            <li><Link to="/departamento/$slug" params={{ slug: "treinamento" }} className="hover:text-gold">Formação Executiva</Link></li>
            <li><Link to="/servicos" className="hover:text-gold">Todos os Serviços</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-xs uppercase tracking-[0.22em] mb-5 font-semibold">Contactos</h4>
          <ul className="space-y-4 text-sm text-white/70">
            <li className="flex gap-3"><MapPin size={16} className="text-gold flex-none mt-0.5" /><span>Av. Julius Nyerere, 1234<br/>Maputo, Moçambique</span></li>
            <li className="flex gap-3"><Phone size={16} className="text-gold flex-none mt-0.5" /><span>+258 21 000 000</span></li>
            <li className="flex gap-3"><Mail size={16} className="text-gold flex-none mt-0.5" /><span>institucional@econlab.co.mz</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-econ py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} EconLab Research &amp; Training. Todos os direitos reservados.</p>
          <p>Maputo · Moçambique · África</p>
        </div>
      </div>
    </footer>
  );
}
