import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <section className="bg-navy text-navy-foreground relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #F5C016 0, transparent 40%), radial-gradient(circle at 80% 80%, #F5C016 0, transparent 35%)",
        }}
      />
      <div className="container-econ relative py-24 md:py-32">
        <div className="max-w-3xl">
          <span className="eyebrow text-gold">
            <span className="!text-gold">{eyebrow}</span>
          </span>
          <h1 className="!text-white mt-5 text-4xl md:text-6xl font-display font-bold leading-[1.05]">
            {title}
          </h1>
          {subtitle && <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">{subtitle}</p>}
          <span className="gold-bar mt-8" />
        </div>
      </div>
    </section>
  );
}
