import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-econlab.jpg";

const links = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/servicos", label: "Serviços" },
  { to: "/pesquisas", label: "Pesquisas" },
  { to: "/noticias", label: "Notícias" },
  { to: "/eventos", label: "Eventos" },
  { to: "/estrutura-organizacional", label: "Estrutura" },
  { to: "/equipa", label: "Equipa" },
  { to: "/contactos", label: "Contactos" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl backdrop-saturate-150 ${
        scrolled
          ? "bg-white/30 border-b border-white/20 shadow-[0_4px_30px_rgba(0,15,74,0.06)]"
          : "bg-white/10 border-b border-white/10"
      }`}
      style={{ WebkitBackdropFilter: "blur(20px) saturate(150%)" }}
    >
      <div className="container-econ flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group min-w-0">
          <img src={logo} alt="EconLab Research & Training" className="h-9 w-9 md:h-12 md:w-12 object-contain shrink-0" />
          <div className="flex flex-col leading-none min-w-0">
            <span className="font-display font-bold text-navy tracking-tight text-[13px] sm:text-[15px] truncate">EconLab</span>
            <span className="hidden xs:inline text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-muted-foreground truncate">Research &amp; Training</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="relative text-[13px] font-medium text-foreground/80 hover:text-navy transition-colors data-[status=active]:text-navy"
              activeProps={{ className: "text-navy after:scale-x-100" }}
            >
              <span>{l.label}</span>
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link to="/contactos" className="btn-gold text-xs px-5 py-2.5">Falar Connosco</Link>
        </div>

        <button
          aria-label="Abrir menu"
          className="lg:hidden p-2 text-navy"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/20 bg-white/30 backdrop-blur-xl backdrop-saturate-150">
          <nav className="container-econ py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm text-foreground/80 border-b border-border/60 last:border-0"
                activeProps={{ className: "text-navy font-semibold" }}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/contactos" onClick={() => setOpen(false)} className="btn-gold mt-3 text-xs">
              Falar Connosco
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
