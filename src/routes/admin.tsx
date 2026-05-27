import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  LogOut,
  Plus,
  Trash2,
  Edit2,
  FileText,
  ImageIcon,
  ShieldCheck,
  Eye,
  BookOpen,
  TrendingUp,
  BarChart3,
  Search,
  Filter,
  CheckCircle,
  X,
  FileSpreadsheet,
  Globe,
  Grid,
  ChevronRight
} from "lucide-react";
import { newsCategories, type NewsArticle, type NewsCategory } from "@/lib/news-data";
import {
  addNewsArticle,
  deleteAdminNews,
  getAllNews,
  slugify,
} from "@/lib/news-store";
import {
  getAllActivePesquisas,
  addPesquisa,
  deleteAdminPesquisa,
  type Publication
} from "@/lib/pesquisas-store";
import { getViews } from "@/lib/views-store";

// Recharts components imports
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from "recharts";

const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";
const AUTH_KEY = "econlab:admin-auth";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Administração — EconLab" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAuthed(window.sessionStorage.getItem(AUTH_KEY) === "1");
    }
    setReady(true);
  }, []);

  if (!ready) return <div className="min-h-screen bg-slate-50" />;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {authed ? (
        <Dashboard onLogout={() => { window.sessionStorage.removeItem(AUTH_KEY); setAuthed(false); }} />
      ) : (
        <LoginForm onSuccess={() => { window.sessionStorage.setItem(AUTH_KEY, "1"); setAuthed(true); }} />
      )}
    </div>
  );
}

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (user === ADMIN_USER && pass === ADMIN_PASS) onSuccess();
    else setErr("Credenciais inválidas.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-navy relative overflow-hidden">
      <div className="absolute top-[-20%] right-[-20%] w-[50%] aspect-square rounded-full bg-gold/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-20%] w-[50%] aspect-square rounded-full bg-white/5 blur-3xl pointer-events-none" />

      <form onSubmit={submit} className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 border border-slate-100 relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-navy p-3 rounded-full text-gold mb-3 shadow-lg">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-xl font-display font-bold text-navy">Área Administrativa</h1>
          <p className="text-xs text-slate-500 mt-1">EconLab Research &amp; Training</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">Utilizador</label>
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="mt-1.5 w-full rounded border border-slate-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition"
              placeholder="Ex: admin"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">Palavra-passe</label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="mt-1.5 w-full rounded border border-slate-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition"
              placeholder="••••••••"
            />
          </div>
        </div>

        {err && <p className="mt-4 text-xs font-medium text-red-600 bg-red-50 p-2.5 rounded border border-red-100">{err}</p>}
        
        <button type="submit" className="mt-6 w-full bg-navy text-white text-sm font-semibold py-3 rounded-lg hover:bg-navy/90 transition shadow-md shadow-navy/15 cursor-pointer">
          Iniciar Sessão
        </button>
        
        <div className="mt-6 border-t border-slate-100 pt-4 text-center">
          <p className="text-[11px] text-slate-500">
            Credenciais Demo: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">admin</code> / <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">admin123</code>
          </p>
        </div>
      </form>
    </div>
  );
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(r.error);
    r.readAsDataURL(file);
  });
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<"dashboard" | "noticias" | "pesquisas">("dashboard");
  const [updater, setUpdater] = useState(0);

  // Lists and Data
  const [allNews, setAllNews] = useState<NewsArticle[]>([]);
  const [allPesquisas, setAllPesquisas] = useState<Publication[]>([]);

  // News Form states
  const [newsEditingSlug, setNewsEditingSlug] = useState<string | null>(null);
  const [newsTitle, setNewsTitle] = useState("");
  const [newsSummary, setNewsSummary] = useState("");
  const [newsCategory, setNewsCategory] = useState<NewsCategory>("Institucional");
  const [newsAuthor, setNewsAuthor] = useState("Equipa Editorial EconLab");
  const [newsContent, setNewsContent] = useState("");
  const [newsImageData, setNewsImageData] = useState<string>("");
  const [newsPdfData, setNewsPdfData] = useState<string>("");
  const [newsPdfName, setNewsPdfName] = useState<string>("");
  const [newsMsg, setNewsMsg] = useState<string>("");
  const [newsShowForm, setNewsShowForm] = useState(false);

  // Pesquisas Form states
  const [pesqEditingSlug, setPesqEditingSlug] = useState<string | null>(null);
  const [pesqTitle, setPesqTitle] = useState("");
  const [pesqType, setPesqType] = useState("Working Paper");
  const [pesqAuthors, setPesqAuthors] = useState("");
  const [pesqDate, setPesqDate] = useState("");
  const [pesqPdfData, setPesqPdfData] = useState<string>("");
  const [pesqPdfName, setPesqPdfName] = useState<string>("");
  const [pesqMsg, setPesqMsg] = useState<string>("");
  const [pesqShowForm, setPesqShowForm] = useState(false);

  // Global filters
  const [newsFilter, setNewsFilter] = useState("");
  const [pesqFilter, setPesqFilter] = useState("");

  const refreshData = () => {
    setAllNews(getAllNews());
    setAllPesquisas(getAllActivePesquisas());
  };

  useEffect(() => {
    refreshData();
  }, [updater]);

  // Statistics calculations
  const totalNews = allNews.length;
  const totalPesquisas = allPesquisas.length;
  const totalNewsViews = allNews.reduce((acc, n) => acc + getViews(n.slug), 0);
  const totalPesqViews = allPesquisas.reduce((acc, p) => acc + getViews(p.slug), 0);
  const totalViews = totalNewsViews + totalPesqViews;
  const avgViews = Math.round(totalViews / ((totalNews + totalPesquisas) || 1));

  // Recharts Chart 1: volume
  const volumeChartData = [
    { name: "Notícias", quantidade: totalNews, fill: "#000F4A" },
    { name: "Pesquisas", quantidade: totalPesquisas, fill: "#F5C016" }
  ];

  // Recharts Chart 2: news categories
  const categoriesChartData = [
    { name: "Institucional", value: allNews.filter(n => n.category === "Institucional").length },
    { name: "Eventos", value: allNews.filter(n => n.category === "Eventos").length },
    { name: "Avisos", value: allNews.filter(n => n.category === "Avisos").length }
  ].filter(c => c.value > 0);

  const COLORS = ["#000F4A", "#F5C016", "#64748B"];

  // Recharts Chart 3: Top Viewed Publications
  const combinedItems = [
    ...allNews.map(n => ({ title: n.title, views: getViews(n.slug), type: "Notícia" })),
    ...allPesquisas.map(p => ({ title: p.title, views: getViews(p.slug), type: "Pesquisa" }))
  ];
  const topViewedData = combinedItems
    .sort((a, b) => b.views - a.views)
    .slice(0, 5)
    .map(item => ({
      name: item.title.length > 25 ? item.title.slice(0, 22) + "..." : item.title,
      views: item.views,
      tipo: item.type
    }));

  // Handle News CRUD
  const handleNewsSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newsTitle.trim() || !newsSummary.trim() || !newsContent.trim()) {
      setNewsMsg("Preencha título, resumo e conteúdo principal.");
      return;
    }
    const now = new Date();
    const isEdit = !!newsEditingSlug;
    const finalSlug = isEdit ? newsEditingSlug! : `${slugify(newsTitle)}-${Date.now().toString(36)}`;
    
    // Maintain existing image if not uploaded in edit mode
    let finalImage = newsImageData;
    if (isEdit && !finalImage) {
      const current = allNews.find(n => n.slug === newsEditingSlug);
      if (current) finalImage = current.image;
    }
    if (!finalImage) {
      setNewsMsg("Por favor, selecione uma imagem para a notícia.");
      return;
    }

    const article: NewsArticle = {
      slug: finalSlug,
      title: newsTitle.trim(),
      summary: newsSummary.trim(),
      category: newsCategory,
      author: newsAuthor.trim() || "Equipa Editorial EconLab",
      date: isEdit
        ? (allNews.find(n => n.slug === newsEditingSlug)?.date || now.toLocaleDateString("pt-PT", { day: "2-digit", month: "long", year: "numeric" }))
        : now.toLocaleDateString("pt-PT", { day: "2-digit", month: "long", year: "numeric" }),
      isoDate: isEdit
        ? (allNews.find(n => n.slug === newsEditingSlug)?.isoDate || now.toISOString().slice(0, 10))
        : now.toISOString().slice(0, 10),
      image: finalImage,
      content: newsContent.split(/\n\n+/).map((p) => p.trim()).filter(Boolean),
      pdfUrl: newsPdfData || (isEdit ? allNews.find(n => n.slug === newsEditingSlug)?.pdfUrl : undefined),
      pdfName: newsPdfName || (isEdit ? allNews.find(n => n.slug === newsEditingSlug)?.pdfName : undefined),
    };

    addNewsArticle(article);
    setNewsEditingSlug(null);
    setNewsTitle(""); setNewsSummary(""); setNewsContent(""); setNewsImageData(""); setNewsPdfData(""); setNewsPdfName("");
    setNewsMsg(isEdit ? "Notícia atualizada com sucesso!" : "Notícia publicada com sucesso!");
    setNewsShowForm(false);
    setUpdater(prev => prev + 1);
  };

  const handleEditNews = (n: NewsArticle) => {
    setNewsEditingSlug(n.slug);
    setNewsTitle(n.title);
    setNewsSummary(n.summary);
    setNewsCategory(n.category);
    setNewsAuthor(n.author);
    setNewsContent(n.content.join("\n\n"));
    setNewsImageData("");
    setNewsPdfName(n.pdfName || "");
    setNewsPdfData(n.pdfUrl || "");
    setNewsMsg("");
    setNewsShowForm(true);
  };

  const handleDeleteNews = (slug: string) => {
    if (confirm("Tem a certeza que deseja eliminar esta notícia?")) {
      deleteAdminNews(slug);
      setUpdater(prev => prev + 1);
    }
  };

  // Handle Pesquisas CRUD
  const handlePesqSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!pesqTitle.trim() || !pesqAuthors.trim() || !pesqDate.trim()) {
      setPesqMsg("Preencha título, autores e data.");
      return;
    }
    const isEdit = !!pesqEditingSlug;
    const finalSlug = isEdit ? pesqEditingSlug! : `${slugify(pesqTitle)}-${Date.now().toString(36)}`;
    
    // Parse/guess isoDate
    const now = new Date();
    let isoStr = now.toISOString().slice(0, 10);
    if (pesqDate.toLowerCase().includes("março")) isoStr = "2025-03-01";
    else if (pesqDate.toLowerCase().includes("janeiro")) isoStr = "2025-01-01";
    else if (pesqDate.toLowerCase().includes("novembro")) isoStr = "2024-11-01";
    else if (pesqDate.toLowerCase().includes("outubro")) isoStr = "2024-10-01";
    else if (pesqDate.toLowerCase().includes("setembro")) isoStr = "2024-09-01";
    else if (pesqDate.toLowerCase().includes("julho")) isoStr = "2024-07-01";

    const pub: Publication = {
      slug: finalSlug,
      title: pesqTitle.trim(),
      type: pesqType,
      authors: pesqAuthors.trim(),
      date: pesqDate.trim(),
      isoDate: isoStr,
      pdfUrl: pesqPdfData || (isEdit ? allPesquisas.find(p => p.slug === pesqEditingSlug)?.pdfUrl : undefined),
      pdfName: pesqPdfName || (isEdit ? allPesquisas.find(p => p.slug === pesqEditingSlug)?.pdfName : undefined),
    };

    addPesquisa(pub);
    setPesqEditingSlug(null);
    setPesqTitle(""); setPesqAuthors(""); setPesqDate(""); setPesqPdfData(""); setPesqPdfName("");
    setPesqMsg(isEdit ? "Pesquisa atualizada com sucesso!" : "Pesquisa publicada com sucesso!");
    setPesqShowForm(false);
    setUpdater(prev => prev + 1);
  };

  const handleEditPesq = (p: Publication) => {
    setPesqEditingSlug(p.slug);
    setPesqTitle(p.title);
    setPesqType(p.type);
    setPesqAuthors(p.authors);
    setPesqDate(p.date);
    setPesqPdfName(p.pdfName || "");
    setPesqPdfData(p.pdfUrl || "");
    setPesqMsg("");
    setPesqShowForm(true);
  };

  const handleDeletePesq = (slug: string) => {
    if (confirm("Tem a certeza que deseja eliminar esta publicação de pesquisa?")) {
      deleteAdminPesquisa(slug);
      setUpdater(prev => prev + 1);
    }
  };

  // Aggregated Recent Activities List
  const recentActivities = [
    ...allNews.map(n => ({ id: n.slug, title: n.title, sub: n.category, date: n.date, views: getViews(n.slug), type: "Notícia" })),
    ...allPesquisas.map(p => ({ id: p.slug, title: p.title, sub: p.type, date: p.date, views: getViews(p.slug), type: "Pesquisa" }))
  ]
    .sort((a, b) => b.views - a.views) // Show most active/viewed
    .slice(0, 6);

  // Dynamic filtering
  const filteredNews = allNews.filter(n =>
    n.title.toLowerCase().includes(newsFilter.toLowerCase()) ||
    n.category.toLowerCase().includes(newsFilter.toLowerCase())
  );

  const filteredPesquisas = allPesquisas.filter(p =>
    p.title.toLowerCase().includes(pesqFilter.toLowerCase()) ||
    p.type.toLowerCase().includes(pesqFilter.toLowerCase()) ||
    p.authors.toLowerCase().includes(pesqFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-100">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-navy text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="bg-white p-1 rounded-sm">
            <ShieldCheck size={22} className="text-navy" />
          </div>
          <div className="leading-tight">
            <span className="font-display font-bold text-sm tracking-wide block">EconLab Admin</span>
            <span className="text-[10px] text-white/50 uppercase tracking-[0.1em]">Gestor de Conteúdos</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => { setActiveTab("dashboard"); refreshData(); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer ${
              activeTab === "dashboard" ? "bg-gold text-navy font-bold" : "text-white/80 hover:bg-white/5"
            }`}
          >
            <BarChart3 size={18} /> Painel Analítico
          </button>
          <button
            onClick={() => { setActiveTab("noticias"); refreshData(); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer ${
              activeTab === "noticias" ? "bg-gold text-navy font-bold" : "text-white/80 hover:bg-white/5"
            }`}
          >
            <FileText size={18} /> Notícias
          </button>
          <button
            onClick={() => { setActiveTab("pesquisas"); refreshData(); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer ${
              activeTab === "pesquisas" ? "bg-gold text-navy font-bold" : "text-white/80 hover:bg-white/5"
            }`}
          >
            <BookOpen size={18} /> Pesquisas
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition cursor-pointer">
            <LogOut size={18} /> Terminar Sessão
          </button>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 md:px-8">
          <h1 className="font-display text-lg font-bold text-navy uppercase tracking-wide">
            {activeTab === "dashboard" && "Dashboard Analítico"}
            {activeTab === "noticias" && "Gestão de Notícias"}
            {activeTab === "pesquisas" && "Gestão de Pesquisas & Publicações"}
          </h1>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Sessão Administrativa Ativa (Demo)
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-[1400px] w-full mx-auto">
          {/* ==================== TAB 1: DASHBOARD ==================== */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* STATS CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { label: "Total de Notícias", value: totalNews, Icon: FileText, color: "border-l-navy text-navy bg-navy/5" },
                  { label: "Total de Pesquisas", value: totalPesquisas, Icon: BookOpen, color: "border-l-gold text-gold bg-gold/5" },
                  { label: "Visualizações Gerais", value: totalViews.toLocaleString(), Icon: Eye, color: "border-l-indigo-600 text-indigo-600 bg-indigo-50" },
                  { label: "Média de Visualizações", value: avgViews, Icon: TrendingUp, color: "border-l-emerald-600 text-emerald-600 bg-emerald-50" },
                ].map((stat, i) => (
                  <div key={i} className={`bg-white p-6 rounded-xl border border-slate-200 border-l-4 ${stat.color} shadow-sm transition hover:shadow-md flex items-center justify-between`}>
                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">{stat.label}</span>
                      <span className="text-3xl font-display font-extrabold mt-2 block">{stat.value}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-white/80 shadow-sm">
                      <stat.Icon size={24} />
                    </div>
                  </div>
                ))}
              </div>

              {/* CHARTS ROW */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Chart 1: News vs Pesquisas */}
                <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
                  <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Grid size={16} /> Volumes de Publicação
                  </h3>
                  <div className="flex-1 min-h-[220px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={220}>
                      <RechartsBarChart data={volumeChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tickLine={false} axisLine={false} className="text-xs font-medium" />
                        <YAxis tickLine={false} axisLine={false} className="text-xs font-medium" />
                        <Tooltip cursor={{ fill: "transparent" }} />
                        <Bar dataKey="quantidade" radius={[4, 4, 0, 0]} barSize={40} />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Chart 2: News Categories */}
                <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
                  <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Filter size={16} /> Categorias das Notícias
                  </h3>
                  <div className="flex-1 min-h-[220px] flex items-center justify-center relative">
                    <ResponsiveContainer width="100%" height={220}>
                      <RechartsPieChart>
                        <Pie
                          data={categoriesChartData}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {categoriesChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-4">
                      <span className="text-2xl font-bold font-display text-navy">{totalNews}</span>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider">Artigos</span>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs">
                    {categoriesChartData.map((c, i) => (
                      <span key={c.name} className="inline-flex items-center gap-1.5 font-medium text-slate-600">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                        {c.name} ({c.value})
                      </span>
                    ))}
                  </div>
                </div>

                {/* Chart 3: Top Viewed */}
                <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
                  <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-4 flex items-center gap-2">
                    <TrendingUp size={16} /> Publicações mais Vistas
                  </h3>
                  <div className="flex-1 min-h-[220px] flex items-center justify-center">
                    {topViewedData.length === 0 ? (
                      <p className="text-xs text-slate-500">Sem dados estatísticos disponíveis.</p>
                    ) : (
                      <ResponsiveContainer width="100%" height={220}>
                        <RechartsBarChart
                          layout="vertical"
                          data={topViewedData}
                          margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                          <XAxis type="number" tickLine={false} axisLine={false} className="text-[10px]" />
                          <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} className="text-[10px]" width={80} />
                          <Tooltip />
                          <Bar dataKey="views" fill="#F5C016" radius={[0, 4, 4, 0]} barSize={12} />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>
              </div>

              {/* RECENT ACTIVITIES & SYSTEM GENERAL INFO */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* General stats table */}
                <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-4 flex items-center gap-2">
                    <ChevronRight size={16} className="text-gold" /> Publicações Mais Influentes
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead>
                        <tr className="text-xs text-slate-500 uppercase tracking-wider border-b border-slate-100">
                          <th className="pb-3 font-semibold">Título</th>
                          <th className="pb-3 font-semibold">Tipo</th>
                          <th className="pb-3 font-semibold text-right">Visualizações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {recentActivities.map((act, i) => (
                          <tr key={i} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 font-medium text-slate-800 max-w-xs truncate">{act.title}</td>
                            <td className="py-3">
                              <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                                act.type === "Notícia" ? "bg-navy/10 text-navy" : "bg-gold/15 text-gold-foreground"
                              }`}>
                                {act.type}
                              </span>
                            </td>
                            <td className="py-3 text-right font-semibold text-slate-900">{act.views}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* System details */}
                <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Globe size={16} /> Estatísticas Gerais do Sistema
                  </h3>
                  <div className="space-y-4 text-sm mt-3">
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Nome do Sistema</span>
                      <span className="font-semibold text-navy">EconLab Insights Hub</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Persistência</span>
                      <span className="font-semibold text-slate-800">Local Browser Cache</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Parâmetros das Gráficos</span>
                      <span className="font-semibold text-slate-800">Dynamic Recharts v2</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Autor Geral Ativo</span>
                      <span className="font-semibold text-slate-800">admin (Full CRUD)</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-slate-500 font-medium">Estado de Segurança</span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        <CheckCircle size={12} /> Protegido
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 2: NOTÍCIAS (CRUD) ==================== */}
          {activeTab === "noticias" && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* Header and Add button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Search input */}
                <div className="relative w-full max-w-sm">
                  <Search size={16} className="absolute left-3 top-3.5 text-slate-400" />
                  <input
                    value={newsFilter}
                    onChange={(e) => setNewsFilter(e.target.value)}
                    placeholder="Pesquisar notícias pelo título ou categoria..."
                    className="w-full rounded-lg border border-slate-200 pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white transition"
                  />
                </div>
                
                <button
                  onClick={() => {
                    setNewsEditingSlug(null);
                    setNewsTitle(""); setNewsSummary(""); setNewsContent(""); setNewsImageData(""); setNewsPdfData(""); setNewsPdfName("");
                    setNewsMsg("");
                    setNewsShowForm(!newsShowForm);
                  }}
                  className="bg-navy hover:bg-navy/90 text-white font-semibold text-xs uppercase tracking-wider px-5 py-3 rounded-lg shadow flex items-center justify-center gap-2 cursor-pointer shrink-0 transition"
                >
                  {newsShowForm ? <X size={16} /> : <Plus size={16} />}
                  {newsShowForm ? "Fechar Formulário" : "Nova Notícia"}
                </button>
              </div>

              {/* News Form Panel */}
              {newsShowForm && (
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-md animate-in slide-in-from-top-6 duration-300">
                  <h3 className="font-display text-sm font-bold text-navy uppercase tracking-wider mb-5 pb-3 border-b border-slate-100 flex items-center gap-2">
                    {newsEditingSlug ? <Edit2 size={16} className="text-gold" /> : <Plus size={16} className="text-gold" />}
                    {newsEditingSlug ? "Editar Notícia" : "Publicar Nova Notícia"}
                  </h3>
                  
                  <form onSubmit={handleNewsSubmit} className="space-y-5 text-sm text-slate-700">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                      <div className="md:col-span-8">
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Título da Notícia</label>
                        <input
                          value={newsTitle}
                          onChange={(e) => setNewsTitle(e.target.value)}
                          className="mt-1.5 w-full rounded border border-slate-200 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                          placeholder="Introduza um título impactante..."
                        />
                      </div>
                      <div className="md:col-span-4">
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Categoria</label>
                        <select
                          value={newsCategory}
                          onChange={(e) => setNewsCategory(e.target.value as NewsCategory)}
                          className="mt-1.5 w-full rounded border border-slate-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white"
                        >
                          {newsCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                      <div className="md:col-span-8">
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Resumo Rápido</label>
                        <textarea
                          value={newsSummary}
                          onChange={(e) => setNewsSummary(e.target.value)}
                          rows={2}
                          className="mt-1.5 w-full rounded border border-slate-200 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                          placeholder="Sumário breve para apresentação na grelha de notícias..."
                        />
                      </div>
                      <div className="md:col-span-4">
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Autor da Notícia</label>
                        <input
                          value={newsAuthor}
                          onChange={(e) => setNewsAuthor(e.target.value)}
                          className="mt-1.5 w-full rounded border border-slate-200 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Conteúdo Principal (Parágrafos separados por duas quebras de linha)</label>
                      <textarea
                        value={newsContent}
                        onChange={(e) => setNewsContent(e.target.value)}
                        rows={6}
                        className="mt-1.5 w-full rounded border border-slate-200 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy font-sans"
                        placeholder="Escreva os parágrafos da sua notícia. Prima duas vezes Enter para separar um parágrafo de outro..."
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                          <ImageIcon size={14} className="text-navy" /> Imagem de Capa (Obrigatória)
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const f = e.target.files?.[0];
                            if (f) setNewsImageData(await fileToDataUrl(f));
                          }}
                          className="mt-2 w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-navy/10 file:text-navy hover:file:bg-navy/15 file:cursor-pointer"
                        />
                        {newsImageData && (
                          <div className="mt-3 relative inline-block">
                            <img src={newsImageData} alt="Antevisão" className="h-20 w-32 object-cover rounded border border-slate-200" />
                            <button type="button" onClick={() => setNewsImageData("")} className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full p-0.5 hover:bg-red-700">
                              <X size={10} />
                            </button>
                          </div>
                        )}
                        {!newsImageData && newsEditingSlug && (
                          <p className="mt-2 text-xs text-slate-400">Mantém a imagem de capa atual (a menos que selecione uma nova).</p>
                        )}
                      </div>

                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                          <FileText size={14} className="text-navy" /> Documento PDF Associado (Opcional)
                        </label>
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={async (e) => {
                            const f = e.target.files?.[0];
                            if (f) { setNewsPdfData(await fileToDataUrl(f)); setNewsPdfName(f.name); }
                          }}
                          className="mt-2 w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-navy/10 file:text-navy hover:file:bg-navy/15 file:cursor-pointer"
                        />
                        {newsPdfName && (
                          <div className="mt-3 flex items-center gap-2 bg-white px-2.5 py-1.5 rounded border border-slate-200 text-xs">
                            <span className="truncate max-w-[180px] font-medium text-slate-600">📎 {newsPdfName}</span>
                            <button type="button" onClick={() => { setNewsPdfData(""); setNewsPdfName(""); }} className="text-red-500 hover:text-red-600 ml-auto">
                              <X size={12} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {newsMsg && (
                      <p className={`text-xs font-semibold p-2.5 rounded border ${
                        newsMsg.includes("sucesso") ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"
                      }`}>{newsMsg}</p>
                    )}

                    <div className="flex gap-3">
                      <button type="submit" className="bg-navy hover:bg-navy/90 text-white font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-lg shadow cursor-pointer">
                        {newsEditingSlug ? "Salvar Alterações" : "Publicar Artigo"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setNewsEditingSlug(null);
                          setNewsTitle(""); setNewsSummary(""); setNewsContent(""); setNewsImageData(""); setNewsPdfData(""); setNewsPdfName("");
                          setNewsMsg("");
                          setNewsShowForm(false);
                        }}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-lg border border-slate-200 cursor-pointer"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* News Articles Grid / Table */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                  <h3 className="font-display text-xs font-bold text-navy uppercase tracking-wider">Notícias Ativas ({filteredNews.length})</h3>
                  <span className="text-[10px] text-slate-500">Exibindo artigos dinâmicos e originais estáticos</span>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="text-xs text-slate-500 uppercase tracking-wider border-b border-slate-100 bg-slate-50/50">
                        <th className="p-4 font-semibold">Capa</th>
                        <th className="p-4 font-semibold">Título</th>
                        <th className="p-4 font-semibold">Categoria</th>
                        <th className="p-4 font-semibold">Autor</th>
                        <th className="p-4 font-semibold">Data</th>
                        <th className="p-4 font-semibold text-center">Visualizações</th>
                        <th className="p-4 font-semibold text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredNews.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-6 text-center text-slate-400">Nenhuma notícia encontrada com os filtros selecionados.</td>
                        </tr>
                      ) : (
                        filteredNews.map((n) => (
                          <tr key={n.slug} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4">
                              <img src={n.image} alt="" className="h-10 w-16 object-cover rounded border border-slate-200 shrink-0" />
                            </td>
                            <td className="p-4 font-medium text-slate-800 max-w-sm truncate">{n.title}</td>
                            <td className="p-4">
                              <span className="text-[10px] uppercase font-bold text-gold">{n.category}</span>
                            </td>
                            <td className="p-4 text-xs text-slate-500">{n.author}</td>
                            <td className="p-4 text-xs text-slate-500">{n.date}</td>
                            <td className="p-4 text-center font-semibold text-slate-900">{getViews(n.slug)}</td>
                            <td className="p-4 text-right">
                              <div className="inline-flex gap-1">
                                <button
                                  onClick={() => handleEditNews(n)}
                                  className="text-slate-400 hover:text-navy p-1.5 rounded hover:bg-slate-100 transition cursor-pointer"
                                  title="Editar Artigo"
                                >
                                  <Edit2 size={14} />
                                </button>
                                <button
                                  onClick={() => handleDeleteNews(n.slug)}
                                  className="text-slate-400 hover:text-red-600 p-1.5 rounded hover:bg-red-50 transition cursor-pointer"
                                  title="Eliminar Artigo"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 3: PESQUISAS (CRUD) ==================== */}
          {activeTab === "pesquisas" && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* Header and Add button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Search input */}
                <div className="relative w-full max-w-sm">
                  <Search size={16} className="absolute left-3 top-3.5 text-slate-400" />
                  <input
                    value={pesqFilter}
                    onChange={(e) => setPesqFilter(e.target.value)}
                    placeholder="Pesquisar pesquisas por título, tipo ou autor..."
                    className="w-full rounded-lg border border-slate-200 pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white transition"
                  />
                </div>
                
                <button
                  onClick={() => {
                    setPesqEditingSlug(null);
                    setPesqTitle(""); setPesqAuthors(""); setPesqDate(""); setPesqPdfData(""); setPesqPdfName("");
                    setPesqMsg("");
                    setPesqShowForm(!pesqShowForm);
                  }}
                  className="bg-navy hover:bg-navy/90 text-white font-semibold text-xs uppercase tracking-wider px-5 py-3 rounded-lg shadow flex items-center justify-center gap-2 cursor-pointer shrink-0 transition"
                >
                  {pesqShowForm ? <X size={16} /> : <Plus size={16} />}
                  {pesqShowForm ? "Fechar Formulário" : "Nova Pesquisa"}
                </button>
              </div>

              {/* Pesquisas Form Panel */}
              {pesqShowForm && (
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-md animate-in slide-in-from-top-6 duration-300">
                  <h3 className="font-display text-sm font-bold text-navy uppercase tracking-wider mb-5 pb-3 border-b border-slate-100 flex items-center gap-2">
                    {pesqEditingSlug ? <Edit2 size={16} className="text-gold" /> : <Plus size={16} className="text-gold" />}
                    {pesqEditingSlug ? "Editar Publicação de Pesquisa" : "Publicar Nova Pesquisa"}
                  </h3>
                  
                  <form onSubmit={handlePesqSubmit} className="space-y-5 text-sm text-slate-700">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                      <div className="md:col-span-8">
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Título do Estudo / Publicação</label>
                        <input
                          value={pesqTitle}
                          onChange={(e) => setPesqTitle(e.target.value)}
                          className="mt-1.5 w-full rounded border border-slate-200 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                          placeholder="Ex: Política Macroeconómica e Estabilidade Fiscal..."
                        />
                      </div>
                      <div className="md:col-span-4">
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Tipo de Estudo</label>
                        <select
                          value={pesqType}
                          onChange={(e) => setPesqType(e.target.value)}
                          className="mt-1.5 w-full rounded border border-slate-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy bg-white"
                        >
                          <option value="Working Paper">Working Paper</option>
                          <option value="Relatório">Relatório</option>
                          <option value="Policy Brief">Policy Brief</option>
                          <option value="Estudo Sectorial">Estudo Sectorial</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                      <div className="md:col-span-8">
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Autores (Separados por vírgulas)</label>
                        <input
                          value={pesqAuthors}
                          onChange={(e) => setPesqAuthors(e.target.value)}
                          className="mt-1.5 w-full rounded border border-slate-200 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                          placeholder="Ex: A. Macuácua, J. Mondlane"
                        />
                      </div>
                      <div className="md:col-span-4">
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Data de Publicação</label>
                        <input
                          value={pesqDate}
                          onChange={(e) => setPesqDate(e.target.value)}
                          className="mt-1.5 w-full rounded border border-slate-200 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                          placeholder="Ex: Março 2025"
                        />
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                        <FileSpreadsheet size={14} className="text-navy" /> Documento PDF de Estudo (Opcional)
                      </label>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={async (e) => {
                          const f = e.target.files?.[0];
                          if (f) { setPesqPdfData(await fileToDataUrl(f)); setPesqPdfName(f.name); }
                        }}
                        className="mt-2 w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-navy/10 file:text-navy hover:file:bg-navy/15 file:cursor-pointer"
                      />
                      {pesqPdfName && (
                        <div className="mt-3 flex items-center gap-2 bg-white px-2.5 py-1.5 rounded border border-slate-200 text-xs">
                          <span className="truncate max-w-[300px] font-medium text-slate-600">📎 {pesqPdfName}</span>
                          <button type="button" onClick={() => { setPesqPdfData(""); setPesqPdfName(""); }} className="text-red-500 hover:text-red-600 ml-auto">
                            <X size={12} />
                          </button>
                        </div>
                      )}
                    </div>

                    {pesqMsg && (
                      <p className={`text-xs font-semibold p-2.5 rounded border ${
                        pesqMsg.includes("sucesso") ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"
                      }`}>{pesqMsg}</p>
                    )}

                    <div className="flex gap-3">
                      <button type="submit" className="bg-navy hover:bg-navy/90 text-white font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-lg shadow cursor-pointer">
                        {pesqEditingSlug ? "Salvar Alterações" : "Publicar Pesquisa"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPesqEditingSlug(null);
                          setPesqTitle(""); setPesqAuthors(""); setPesqDate(""); setPesqPdfData(""); setPesqPdfName("");
                          setPesqMsg("");
                          setPesqShowForm(false);
                        }}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-lg border border-slate-200 cursor-pointer"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Pesquisas Grid / Table */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                  <h3 className="font-display text-xs font-bold text-navy uppercase tracking-wider">Estudos de Pesquisa ({filteredPesquisas.length})</h3>
                  <span className="text-[10px] text-slate-500">Exibindo publicações e working papers dinâmicos</span>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="text-xs text-slate-500 uppercase tracking-wider border-b border-slate-100 bg-slate-50/50">
                        <th className="p-4 font-semibold">Tipo</th>
                        <th className="p-4 font-semibold">Título do Estudo</th>
                        <th className="p-4 font-semibold">Autores</th>
                        <th className="p-4 font-semibold">Data</th>
                        <th className="p-4 font-semibold text-center">Visualizações</th>
                        <th className="p-4 font-semibold text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredPesquisas.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-6 text-center text-slate-400">Nenhuma publicação de pesquisa encontrada com os filtros selecionados.</td>
                        </tr>
                      ) : (
                        filteredPesquisas.map((p) => (
                          <tr key={p.slug} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4">
                              <span className="text-[10px] uppercase font-bold text-gold bg-gold/10 px-2 py-0.5 rounded">{p.type}</span>
                            </td>
                            <td className="p-4 font-medium text-slate-800 max-w-sm truncate">{p.title}</td>
                            <td className="p-4 text-xs text-slate-500">{p.authors}</td>
                            <td className="p-4 text-xs text-slate-500">{p.date}</td>
                            <td className="p-4 text-center font-semibold text-slate-900">{getViews(p.slug)}</td>
                            <td className="p-4 text-right">
                              <div className="inline-flex gap-1">
                                <button
                                  onClick={() => handleEditPesq(p)}
                                  className="text-slate-400 hover:text-navy p-1.5 rounded hover:bg-slate-100 transition cursor-pointer"
                                  title="Editar Pesquisa"
                                >
                                  <Edit2 size={14} />
                                </button>
                                <button
                                  onClick={() => handleDeletePesq(p.slug)}
                                  className="text-slate-400 hover:text-red-600 p-1.5 rounded hover:bg-red-50 transition cursor-pointer"
                                  title="Eliminar Pesquisa"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
