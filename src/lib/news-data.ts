import heroImg from "@/assets/hero-econlab.jpg";
import aboutImg from "@/assets/about-econlab.jpg";
import founder1 from "@/assets/founder-1.jpg";
import founder2 from "@/assets/founder-2.jpg";
import founder3 from "@/assets/founder-3.jpg";

export type NewsCategory = "Institucional" | "Eventos" | "Avisos";

export type NewsArticle = {
  slug: string;
  title: string;
  summary: string;
  category: NewsCategory;
  date: string;
  isoDate: string;
  author: string;
  image: string;
  content: string[];
};

export const newsCategories: NewsCategory[] = ["Institucional", "Eventos", "Avisos"];

export const news: NewsArticle[] = [
  {
    slug: "econlab-lanca-anuario-economico-2025",
    title: "EconLab lança Anuário Económico de Moçambique — Edição 2025",
    summary:
      "Publicação anual reúne análises macroeconómicas, dados sectoriais e perspectivas para a economia moçambicana no próximo ciclo.",
    category: "Institucional",
    date: "12 Maio 2025",
    isoDate: "2025-05-12",
    author: "Equipa Editorial EconLab",
    image: aboutImg,
    content: [
      "A EconLab Research & Training anunciou esta semana o lançamento oficial da Edição 2025 do seu Anuário Económico de Moçambique, uma publicação de referência que reúne análises macroeconómicas detalhadas, indicadores sectoriais e perspectivas para a economia nacional.",
      "O documento, elaborado pela equipa de investigação da EconLab em colaboração com economistas convidados, aborda temas estruturais como política monetária, desempenho fiscal, cadeias de valor agrícolas, indústria extractiva e inclusão financeira digital.",
      "A apresentação pública decorrerá no Centro de Conferências Joaquim Chissano, com a participação de decisores políticos, líderes empresariais e parceiros institucionais. O Anuário estará disponível em formato impresso e digital, gratuitamente, através do portal da EconLab.",
    ],
  },
  {
    slug: "conferencia-anual-economia-mocambicana-2025",
    title: "Inscrições abertas para a Conferência Anual de Economia Moçambicana 2025",
    summary:
      "Maior evento económico do país reúne em Junho economistas, decisores e líderes empresariais em torno dos desafios estruturais da economia.",
    category: "Eventos",
    date: "28 Abril 2025",
    isoDate: "2025-04-28",
    author: "Departamento de Comunicação",
    image: heroImg,
    content: [
      "Estão oficialmente abertas as inscrições para a Conferência Anual de Economia Moçambicana 2025, organizada pela EconLab Research & Training, a realizar-se no dia 12 de Junho, no Centro de Conferências Joaquim Chissano, em Maputo.",
      "A edição deste ano terá como tema central «Transformação Estrutural e Resiliência Macroeconómica em África Austral» e contará com painéis dedicados à política fiscal, ao sector energético, à inclusão financeira e às cadeias de valor regionais.",
      "Estão confirmados oradores nacionais e internacionais, incluindo representantes do Banco de Moçambique, do Banco Africano de Desenvolvimento e de universidades de referência. As inscrições podem ser efectuadas através do portal institucional da EconLab.",
    ],
  },
  {
    slug: "alteracao-horario-atendimento-institucional",
    title: "Aviso: Alteração temporária do horário de atendimento institucional",
    summary:
      "Entre 1 e 15 de Junho, o atendimento presencial funcionará em horário reduzido devido a obras de requalificação das instalações.",
    category: "Avisos",
    date: "15 Abril 2025",
    isoDate: "2025-04-15",
    author: "Administração EconLab",
    image: founder3,
    content: [
      "A EconLab Research & Training informa todos os parceiros, clientes institucionais e público em geral que, entre os dias 1 e 15 de Junho de 2025, o atendimento presencial na sede de Maputo funcionará em horário reduzido, das 09h00 às 13h00.",
      "A medida resulta de obras de requalificação das instalações que visam melhorar as condições de trabalho da equipa e o acolhimento de visitantes. Os serviços de consultoria, formação e investigação continuarão a funcionar normalmente em regime remoto.",
      "Para questões urgentes, recomendamos o contacto através do e-mail institucional ou da linha telefónica oficial. Agradecemos a compreensão de todos os nossos parceiros.",
    ],
  },
  {
    slug: "parceria-estrategica-banco-mocambique",
    title: "EconLab e Banco de Moçambique reforçam parceria em formação executiva",
    summary:
      "Nova edição do Programa Executivo em Política Económica arranca em Setembro com 40 quadros séniores do sector financeiro.",
    category: "Institucional",
    date: "30 Março 2025",
    isoDate: "2025-03-30",
    author: "Equipa Editorial EconLab",
    image: founder1,
    content: [
      "A EconLab Research & Training e o Banco de Moçambique formalizaram a renovação da parceria estratégica para a continuidade do Programa Executivo em Política Económica, uma referência na formação de quadros séniores do sector financeiro moçambicano.",
      "A nova edição arrancará em Setembro de 2025 e contará com a participação de 40 profissionais oriundos da banca central, da banca comercial e de instituições reguladoras. O programa combina módulos presenciais, estudos de caso e mentoria individual.",
      "Esta parceria reforça o compromisso da EconLab com a capacitação de decisores em áreas estratégicas como política monetária, estabilidade financeira e supervisão prudencial.",
    ],
  },
  {
    slug: "workshop-modelacao-econometrica-abril",
    title: "Workshop Internacional em Modelação Econométrica reúne 60 investigadores",
    summary:
      "Formação intensiva contou com especialistas convidados da África do Sul, Portugal e Reino Unido em modelos aplicados a economias emergentes.",
    category: "Eventos",
    date: "20 Abril 2025",
    isoDate: "2025-04-20",
    author: "Departamento de Pesquisa",
    image: founder2,
    content: [
      "O Workshop Internacional em Modelação Econométrica, realizado entre 15 e 18 de Abril no campus da EconLab em Maputo, reuniu 60 investigadores e analistas de instituições públicas, universidades e centros de estudo da região.",
      "A formação foi conduzida por especialistas convidados da África do Sul, Portugal e Reino Unido, com foco em técnicas avançadas de modelação aplicada a economias emergentes, incluindo modelos VAR estruturais, DSGE e métodos bayesianos.",
      "O encontro consolidou a EconLab como pólo regional de formação avançada em economia aplicada e abriu caminho para uma nova rede de colaboração entre investigadores africanos.",
    ],
  },
];

export function getNewsBySlug(slug: string) {
  return news.find((n) => n.slug === slug);
}

export function getLatestNews(limit = 3) {
  return [...news]
    .sort((a, b) => (a.isoDate < b.isoDate ? 1 : -1))
    .slice(0, limit);
}
