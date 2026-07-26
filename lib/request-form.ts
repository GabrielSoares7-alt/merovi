import { resolveEstadoLabel } from "@/lib/estados";

export type ChoiceOption = {
  value: string;
  label: string;
};

export const SEGMENTO_OPTIONS: ChoiceOption[] = [
  { value: "clinica", label: "Clínica" },
  { value: "escritorio", label: "Escritório" },
  { value: "restaurante", label: "Restaurante" },
  { value: "loja", label: "Loja" },
  { value: "prestador", label: "Prestador de serviços" },
  { value: "outros", label: "Outros" },
];

export const SIM_NAO: ChoiceOption[] = [
  { value: "sim", label: "Sim" },
  { value: "nao", label: "Não" },
];

export const SIM_NAO_NAOSEI: ChoiceOption[] = [
  { value: "sim", label: "Sim" },
  { value: "nao", label: "Não" },
  { value: "nao-sei", label: "Não sei" },
];

export const OBJETIVO_OPTIONS: ChoiceOption[] = [
  { value: "mais-clientes", label: "Gerar mais clientes" },
  { value: "profissionalismo", label: "Passar mais profissionalismo" },
  { value: "google", label: "Ser encontrado no Google" },
  { value: "outros", label: "Outros" },
];

export const TIPO_SITE_OPTIONS: ChoiceOption[] = [
  { value: "institucional", label: "Institucional" },
  { value: "landing-page", label: "Landing page" },
  { value: "outros", label: "Outros" },
];

export const ESTILO_OPTIONS: ChoiceOption[] = [
  { value: "minimalista", label: "Minimalista" },
  { value: "moderno-tech", label: "Moderno/tech" },
  { value: "elegante-premium", label: "Elegante/premium" },
  { value: "outros", label: "Outros" },
];

export const FUNCIONALIDADES_OPTIONS: ChoiceOption[] = [
  { value: "formulario-contato", label: "Formulário de contato" },
  { value: "whatsapp", label: "Integração com WhatsApp" },
  { value: "blog", label: "Blog" },
  { value: "depoimentos", label: "Área de depoimentos" },
  { value: "outros", label: "Outros" },
];

export type FormState = {
  nome: string;
  whatsapp: string;
  email: string;
  empresa: string;
  segmento: string;
  segmentoOutro: string;
  cidade: string;
  estado: string;
  possuiSite: string;
  possuiDominio: string;
  possuiGmb: string;
  objetivo: string;
  objetivoOutro: string;
  tipoSite: string;
  tipoSiteOutro: string;
  estiloVisual: string;
  estiloVisualOutro: string;
  coresPreferidas: string;
  sitesReferencia: string;
  funcionalidades: string[];
  funcionalidadesOutro: string;
  observacoes: string;
};

export const INITIAL_FORM_STATE: FormState = {
  nome: "",
  whatsapp: "",
  email: "",
  empresa: "",
  segmento: "",
  segmentoOutro: "",
  cidade: "",
  estado: "",
  possuiSite: "",
  possuiDominio: "",
  possuiGmb: "",
  objetivo: "",
  objetivoOutro: "",
  tipoSite: "",
  tipoSiteOutro: "",
  estiloVisual: "",
  estiloVisualOutro: "",
  coresPreferidas: "",
  sitesReferencia: "",
  funcionalidades: [],
  funcionalidadesOutro: "",
  observacoes: "",
};

export const STEP_TITLES = [
  "Seus dados",
  "Seu negócio",
  "Presença digital atual",
  "Objetivo do projeto",
  "Direção visual",
  "Funcionalidades",
];

/** Short, generic message for the WhatsApp handoff — the full answers go by e-mail instead (see buildSummaryText). */
export const WHATSAPP_MESSAGE =
  "Olá! Acabei de preencher o formulário no site da Merovi e gostaria de solicitar meu site.";

export function resolveLabel(
  value: string,
  otherValue: string,
  options: ChoiceOption[],
) {
  if (!value) return "—";
  if (value === "outros") {
    return otherValue ? `Outros (${otherValue})` : "Outros";
  }
  return options.find((option) => option.value === value)?.label ?? value;
}

export function resolveMultiLabel(
  values: string[],
  otherValue: string,
  options: ChoiceOption[],
) {
  if (values.length === 0) return "—";
  return values
    .map((value) => {
      if (value === "outros") {
        return otherValue ? `Outros (${otherValue})` : "Outros";
      }
      return options.find((option) => option.value === value)?.label ?? value;
    })
    .join(", ");
}

/**
 * The full, organized summary of every answer — used as the e-mail body
 * sent to the Merovi inbox. The WhatsApp handoff uses WHATSAPP_MESSAGE
 * instead; this detailed version no longer goes there.
 */
export function buildSummaryText(state: FormState) {
  const lines = [
    "Novo pedido de site pelo formulário da Merovi.",
    "",
    "*Dados de contato*",
    `Nome: ${state.nome}`,
    `WhatsApp: ${state.whatsapp}`,
    `E-mail: ${state.email}`,
    `Empresa: ${state.empresa}`,
    "",
    "*Sobre o negócio*",
    `Segmento: ${resolveLabel(state.segmento, state.segmentoOutro, SEGMENTO_OPTIONS)}`,
    `Cidade/Estado: ${state.cidade} - ${resolveEstadoLabel(state.estado)}`,
    "",
    "*Presença digital atual*",
    `Site atual: ${resolveLabel(state.possuiSite, "", SIM_NAO)}`,
    `Domínio: ${resolveLabel(state.possuiDominio, "", SIM_NAO_NAOSEI)}`,
    `Google Meu Negócio: ${resolveLabel(state.possuiGmb, "", SIM_NAO_NAOSEI)}`,
    "",
    "*Objetivo do projeto*",
    `Objetivo: ${resolveLabel(state.objetivo, state.objetivoOutro, OBJETIVO_OPTIONS)}`,
    `Tipo de site: ${resolveLabel(state.tipoSite, state.tipoSiteOutro, TIPO_SITE_OPTIONS)}`,
    "",
    "*Direção visual*",
    `Estilo: ${resolveLabel(state.estiloVisual, state.estiloVisualOutro, ESTILO_OPTIONS)}`,
    `Cores preferidas: ${state.coresPreferidas || "—"}`,
    `Sites de referência: ${state.sitesReferencia || "—"}`,
    "",
    "*Funcionalidades desejadas*",
    resolveMultiLabel(
      state.funcionalidades,
      state.funcionalidadesOutro,
      FUNCIONALIDADES_OPTIONS,
    ),
    "",
    "*Observações*",
    state.observacoes || "—",
  ];
  return lines.join("\n");
}
