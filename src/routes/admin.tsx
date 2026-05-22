import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { LogOut, Plus, Trash2, FileText, ImageIcon, ShieldCheck } from "lucide-react";
import { newsCategories, type NewsArticle, type NewsCategory } from "@/lib/news-data";
import {
  addNewsArticle,
  deleteAdminNews,
  getAdminNews,
  slugify,
} from "@/lib/news-store";

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

  if (!ready) return <div className="min-h-screen bg-slate-100" />;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans">
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
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-white rounded-lg shadow-xl p-8 border border-slate-200">
        <div className="flex items-center gap-2 text-slate-700 mb-6">
          <ShieldCheck size={20} />
          <h1 className="text-lg font-semibold">Área Administrativa</h1>
        </div>
        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">Utilizador</label>
        <input
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          autoFocus
        />
        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mt-4">Palavra-passe</label>
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
        {err && <p className="mt-3 text-xs text-red-600">{err}</p>}
        <button type="submit" className="mt-6 w-full bg-slate-900 text-white text-sm font-semibold py-2.5 rounded hover:bg-slate-800 transition">
          Entrar
        </button>
        <p className="mt-4 text-[11px] text-slate-500 text-center">
          Demo: <code className="bg-slate-100 px-1">admin</code> / <code className="bg-slate-100 px-1">admin123</code>
        </p>
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
  const [items, setItems] = useState<NewsArticle[]>([]);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState<NewsCategory>("Institucional");
  const [author, setAuthor] = useState("Equipa Editorial EconLab");
  const [content, setContent] = useState("");
  const [imageData, setImageData] = useState<string>("");
  const [pdfData, setPdfData] = useState<string>("");
  const [pdfName, setPdfName] = useState<string>("");
  const [msg, setMsg] = useState<string>("");

  const refresh = () => setItems(getAdminNews());
  useEffect(() => { refresh(); }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim() || !content.trim() || !imageData) {
      setMsg("Preencha título, resumo, conteúdo e imagem.");
      return;
    }
    const now = new Date();
    const article: NewsArticle = {
      slug: `${slugify(title)}-${Date.now().toString(36)}`,
      title: title.trim(),
      summary: summary.trim(),
      category,
      author: author.trim() || "EconLab",
      date: now.toLocaleDateString("pt-PT", { day: "2-digit", month: "long", year: "numeric" }),
      isoDate: now.toISOString().slice(0, 10),
      image: imageData,
      content: content.split(/\n\n+/).map((p) => p.trim()).filter(Boolean),
      pdfUrl: pdfData || undefined,
      pdfName: pdfName || undefined,
    };
    addNewsArticle(article);
    setTitle(""); setSummary(""); setContent(""); setImageData(""); setPdfData(""); setPdfName("");
    setMsg("Notícia publicada com sucesso.");
    refresh();
  };

  return (
    <div>
      <header className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} />
            <span className="font-semibold text-sm tracking-wide">EconLab · Admin</span>
          </div>
          <button onClick={onLogout} className="inline-flex items-center gap-2 text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded">
            <LogOut size={14} /> Sair
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-5 gap-8">
        <section className="lg:col-span-3 bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-base font-semibold flex items-center gap-2"><Plus size={16} /> Nova Notícia</h2>
          <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">Título</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">Categoria</label>
                <select value={category} onChange={(e) => setCategory(e.target.value as NewsCategory)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2 bg-white">
                  {newsCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">Autor</label>
                <input value={author} onChange={(e) => setAuthor(e.target.value)} className="mt-1 w-full rounded border border-slate-300 px-3 py-2" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">Resumo</label>
              <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={2} className="mt-1 w-full rounded border border-slate-300 px-3 py-2" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">Conteúdo (parágrafos separados por linha em branco)</label>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={6} className="mt-1 w-full rounded border border-slate-300 px-3 py-2" />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide flex items-center gap-1"><ImageIcon size={12} /> Imagem</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const f = e.target.files?.[0];
                    if (f) setImageData(await fileToDataUrl(f));
                  }}
                  className="mt-1 w-full text-xs"
                />
                {imageData && <img src={imageData} alt="" className="mt-2 h-20 w-full object-cover object-[center_top] rounded border border-slate-200" />}
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide flex items-center gap-1"><FileText size={12} /> PDF (opcional)</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={async (e) => {
                    const f = e.target.files?.[0];
                    if (f) { setPdfData(await fileToDataUrl(f)); setPdfName(f.name); }
                  }}
                  className="mt-1 w-full text-xs"
                />
                {pdfName && <p className="mt-2 text-xs text-slate-600 truncate">📎 {pdfName}</p>}
              </div>
            </div>
            {msg && <p className="text-xs text-slate-600">{msg}</p>}
            <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 rounded">
              Publicar Notícia
            </button>
          </form>
        </section>

        <section className="lg:col-span-2 bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-base font-semibold">Notícias publicadas (admin)</h2>
          <p className="text-xs text-slate-500 mt-1">Armazenadas localmente no navegador (demo).</p>
          <ul className="mt-4 divide-y divide-slate-100">
            {items.length === 0 && <li className="text-sm text-slate-500 py-4">Nenhuma notícia criada ainda.</li>}
            {items.map((n) => (
              <li key={n.slug} className="py-3 flex items-start gap-3">
                <img src={n.image} alt="" className="h-12 w-16 object-cover object-[center_top] rounded border border-slate-200 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{n.title}</p>
                  <p className="text-[11px] text-slate-500">{n.category} · {n.date}{n.pdfUrl ? " · PDF" : ""}</p>
                </div>
                <button
                  onClick={() => { deleteAdminNews(n.slug); refresh(); }}
                  className="text-slate-400 hover:text-red-600 p-1"
                  title="Eliminar"
                >
                  <Trash2 size={14} />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
