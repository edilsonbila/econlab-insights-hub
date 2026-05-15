export const services = [
  {
    slug: "pesquisa",
    title: "Pesquisa Económica",
    short: "Estudos rigorosos sobre macroeconomia, sectores produtivos e políticas públicas.",
    icon: "BarChart3",
  },
  {
    slug: "consultoria",
    title: "Consultoria Estratégica",
    short: "Apoio à decisão para governos, instituições financeiras e empresas líderes.",
    icon: "Target",
  },
  {
    slug: "treinamento",
    title: "Formação Executiva",
    short: "Programas certificados em economia aplicada, finanças e ciência de dados.",
    icon: "GraduationCap",
  },
] as const;

export type Department = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  director: string;
  methodologies: string[];
  projects: { title: string; client: string; year: string }[];
  team: { name: string; role: string }[];
};

export const departments: Record<string, Department> = {
  pesquisa: {
    slug: "pesquisa",
    name: "Departamento de Pesquisa",
    tagline: "Investigação económica independente, baseada em evidência.",
    description:
      "O Departamento de Pesquisa da EconLab conduz estudos macroeconómicos, sectoriais e de políticas públicas, produzindo conhecimento original que informa decisores em Moçambique e na região austral de África. A nossa investigação combina métodos quantitativos avançados, trabalho de campo e análise institucional.",
    director: "Dr.ª Amélia Macuácua",
    methodologies: [
      "Modelos de Equilíbrio Geral Computável (CGE)",
      "Econometria aplicada e séries temporais",
      "Análise de impacto e avaliação de políticas",
      "Estudos qualitativos e trabalho de campo",
      "Análise de dados de larga escala e visualização",
    ],
    projects: [
      { title: "Diagnóstico Macroeconómico de Moçambique 2025", client: "Ministério da Economia e Finanças", year: "2025" },
      { title: "Cadeias de Valor Agrícolas em Nampula", client: "FAO Moçambique", year: "2024" },
      { title: "Inflação e Política Monetária na SADC", client: "Banco Africano de Desenvolvimento", year: "2024" },
    ],
    team: [
      { name: "Dr.ª Amélia Macuácua", role: "Directora de Pesquisa" },
      { name: "Dr. João Mondlane", role: "Investigador Sénior · Macroeconomia" },
      { name: "Dr.ª Felisbela Cossa", role: "Investigadora · Sectores Produtivos" },
    ],
  },
  consultoria: {
    slug: "consultoria",
    name: "Departamento de Consultoria",
    tagline: "Decisões estratégicas suportadas por inteligência económica.",
    description:
      "Apoiamos governos, instituições multilaterais, bancos e grandes empresas em decisões críticas de investimento, regulação e estratégia. Combinamos rigor analítico com profundo conhecimento do contexto moçambicano e africano.",
    director: "Eng.º Carlos Nhamposse",
    methodologies: [
      "Análise estratégica e benchmarking sectorial",
      "Estudos de viabilidade económico-financeira",
      "Modelos de avaliação de investimentos",
      "Inteligência de mercado e regulatório",
      "Apoio à formulação de políticas públicas",
    ],
    projects: [
      { title: "Estratégia Nacional de Industrialização", client: "Confederação das Associações Económicas", year: "2025" },
      { title: "Avaliação de Projecto de Energia Renovável", client: "Standard Bank Mozambique", year: "2024" },
      { title: "Plano Estratégico Sector Logístico", client: "Porto de Maputo", year: "2024" },
    ],
    team: [
      { name: "Eng.º Carlos Nhamposse", role: "Director de Consultoria" },
      { name: "Dr.ª Helena Sitoe", role: "Senior Manager · Estratégia" },
      { name: "Dr. Pedro Tembe", role: "Senior Manager · Finanças Corporativas" },
    ],
  },
  treinamento: {
    slug: "treinamento",
    name: "Departamento de Treinamento",
    tagline: "Capacitar a próxima geração de líderes económicos.",
    description:
      "Desenhamos e leccionamos programas executivos, cursos especializados e workshops corporativos em economia aplicada, finanças, análise de dados e gestão pública. Os nossos formandos ocupam hoje cargos de liderança em instituições de referência.",
    director: "Prof. Dr. Edson Massingue",
    methodologies: [
      "Pedagogia executiva baseada em casos reais",
      "Programas modulares e blended learning",
      "Simulações e laboratórios de decisão",
      "Certificação alinhada com padrões internacionais",
      "Mentoria e acompanhamento pós-formação",
    ],
    projects: [
      { title: "Programa Executivo em Política Económica", client: "Banco de Moçambique", year: "2025" },
      { title: "Diploma em Análise Financeira Avançada", client: "Bolsa de Valores de Moçambique", year: "2024" },
      { title: "Workshop em Ciência de Dados para Economistas", client: "Universidade Eduardo Mondlane", year: "2024" },
    ],
    team: [
      { name: "Prof. Dr. Edson Massingue", role: "Director de Formação" },
      { name: "Dr.ª Lúcia Banze", role: "Coordenadora Académica" },
      { name: "Dr. Ivan Chissano", role: "Coordenador de Programas Executivos" },
    ],
  },
  "comunicacao-e-imagem": {
    slug: "comunicacao-e-imagem",
    name: "Departamento de Comunicação e Imagem",
    tagline: "Projectar a voz institucional da EconLab.",
    description:
      "Responsável pela comunicação institucional, relações com a imprensa, identidade visual, publicações editoriais e gestão das plataformas digitais da EconLab.",
    director: "Dr.ª Tânia Mabunda",
    methodologies: [
      "Estratégia de comunicação institucional",
      "Relações públicas e media relations",
      "Editoria e design de publicações",
      "Marketing digital e analítica de audiência",
      "Gestão de eventos e conferências",
    ],
    projects: [
      { title: "Lançamento do Anuário Económico EconLab", client: "Interno", year: "2025" },
      { title: "Conferência Anual de Economia Moçambicana", client: "Interno", year: "2024" },
      { title: "Reposicionamento da Marca EconLab", client: "Interno", year: "2024" },
    ],
    team: [
      { name: "Dr.ª Tânia Mabunda", role: "Directora de Comunicação" },
      { name: "Sr. Hélder Matavel", role: "Editor-Chefe" },
      { name: "Sr.ª Aida Khan", role: "Gestora Digital" },
    ],
  },
  "administracao-e-financas": {
    slug: "administracao-e-financas",
    name: "Departamento de Administração e Finanças",
    tagline: "Garantir a sustentabilidade e governação da instituição.",
    description:
      "Assegura a gestão financeira, recursos humanos, procurement, infraestrutura e governação corporativa da EconLab, segundo padrões internacionais de transparência e prestação de contas.",
    director: "Dr. Salomão Guebuza",
    methodologies: [
      "Planeamento orçamental plurianual",
      "Auditoria interna e controlo de gestão",
      "Compliance e governação corporativa",
      "Gestão de talento e desenvolvimento de pessoas",
      "Procurement institucional",
    ],
    projects: [
      { title: "Implementação de Sistema ERP Institucional", client: "Interno", year: "2025" },
      { title: "Plano Estratégico de Recursos Humanos 2025–2028", client: "Interno", year: "2025" },
      { title: "Certificação ISO 9001", client: "Interno", year: "2024" },
    ],
    team: [
      { name: "Dr. Salomão Guebuza", role: "Director Administrativo e Financeiro" },
      { name: "Dr.ª Marta Cumbe", role: "Controller" },
      { name: "Dr. Nelson Wamusse", role: "Coordenador de Recursos Humanos" },
    ],
  },
};

export const team = [
  { name: "Dr. António Mavie", role: "Presidente do Conselho", area: "Direcção" },
  { name: "Dr.ª Carla Sumbane", role: "Directora Executiva", area: "Direcção" },
  { name: "Dr.ª Amélia Macuácua", role: "Directora de Pesquisa", area: "Pesquisa" },
  { name: "Eng.º Carlos Nhamposse", role: "Director de Consultoria", area: "Consultoria" },
  { name: "Prof. Dr. Edson Massingue", role: "Director de Formação", area: "Treinamento" },
  { name: "Dr.ª Tânia Mabunda", role: "Directora de Comunicação", area: "Comunicação" },
  { name: "Dr. Salomão Guebuza", role: "Director Administrativo e Financeiro", area: "Administração" },
  { name: "Dr. João Mondlane", role: "Investigador Sénior", area: "Pesquisa" },
  { name: "Dr.ª Helena Sitoe", role: "Senior Manager · Estratégia", area: "Consultoria" },
];

export const events = [
  {
    date: "12 Junho 2025",
    title: "Conferência Anual de Economia Moçambicana 2025",
    location: "Centro de Conferências Joaquim Chissano · Maputo",
    type: "Conferência",
    summary:
      "Reunião anual de economistas, decisores políticos e líderes empresariais para debater os desafios e oportunidades da economia moçambicana.",
  },
  {
    date: "28 Maio 2025",
    title: "Fórum sobre Investimento e Indústria Extractiva",
    location: "Hotel Polana · Maputo",
    type: "Fórum",
    summary:
      "Debate de alto nível sobre o impacto macroeconómico dos projectos de gás natural na bacia do Rovuma.",
  },
  {
    date: "15 Abril 2025",
    title: "Workshop Internacional em Modelação Econométrica",
    location: "EconLab Campus · Maputo",
    type: "Workshop",
    summary:
      "Formação intensiva com especialistas internacionais em técnicas avançadas de modelação aplicada a economias emergentes.",
  },
];

export const publications = [
  {
    type: "Working Paper",
    title: "Política Monetária e Estabilidade de Preços em Moçambique 2010–2024",
    authors: "A. Macuácua, J. Mondlane",
    date: "Março 2025",
  },
  {
    type: "Relatório",
    title: "Anuário Económico de Moçambique — Edição 2025",
    authors: "Equipa de Pesquisa EconLab",
    date: "Janeiro 2025",
  },
  {
    type: "Policy Brief",
    title: "Cadeias de Valor Agrícolas e Segurança Alimentar",
    authors: "F. Cossa, P. Tembe",
    date: "Novembro 2024",
  },
  {
    type: "Estudo Sectorial",
    title: "Sector Logístico e Corredores Económicos da África Austral",
    authors: "C. Nhamposse, H. Sitoe",
    date: "Outubro 2024",
  },
  {
    type: "Working Paper",
    title: "Inclusão Financeira Digital em Moçambique",
    authors: "E. Massingue, L. Banze",
    date: "Setembro 2024",
  },
  {
    type: "Relatório",
    title: "Impacto Macroeconómico do Gás Natural na Bacia do Rovuma",
    authors: "Equipa de Consultoria EconLab",
    date: "Julho 2024",
  },
];

import bancoMocambique from "@/assets/partners/banco-mocambique.png";
import standardBank from "@/assets/partners/standard-bank.png";
import bancoAfricano from "@/assets/partners/banco-africano.ico";
import bancoMundial from "@/assets/partners/banco-mundial.ico";
import bolsaValores from "@/assets/partners/bolsa-valores.ico";
import fao from "@/assets/partners/fao.ico";
import fmi from "@/assets/partners/fmi.ico";
import uem from "@/assets/partners/uem.ico";

export const partners = [
  { name: "Banco de Moçambique", logo: bancoMocambique },
  { name: "Universidade Eduardo Mondlane", logo: uem },
  { name: "Banco Africano de Desenvolvimento", logo: bancoAfricano },
  { name: "Banco Mundial", logo: bancoMundial },
  { name: "FMI", logo: fmi },
  { name: "FAO", logo: fao },
  { name: "Standard Bank", logo: standardBank },
  { name: "Bolsa de Valores de Moçambique", logo: bolsaValores },
];
