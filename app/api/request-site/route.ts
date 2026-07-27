import { NextResponse } from "next/server";
import { Resend } from "resend";
import { resolveEstadoLabel } from "@/lib/estados";
import {
  ESTILO_OPTIONS,
  FUNCIONALIDADES_OPTIONS,
  OBJETIVO_OPTIONS,
  SEGMENTO_OPTIONS,
  SIM_NAO,
  SIM_NAO_NAOSEI,
  TIPO_SITE_OPTIONS,
  buildSummaryText,
  resolveLabel,
  resolveMultiLabel,
  type FormState,
} from "@/lib/request-form";

const REQUEST_INBOX = "merovidigital@gmail.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function section(title: string, rows: Array<[string, string]>) {
  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:4px 16px 4px 0;color:#8a8a8a;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:4px 0;color:#111111;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");
  return `
    <h2 style="font-size:15px;margin:24px 0 8px;color:#111111;">${escapeHtml(title)}</h2>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">${rowsHtml}</table>`;
}

function buildEmailHtml(state: FormState) {
  return `
    <div style="font-family:-apple-system,Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h1 style="font-size:20px;margin-bottom:4px;color:#111111;">Novo pedido de site — Merovi</h1>
      <p style="color:#8a8a8a;font-size:14px;margin-top:0;">Enviado pelo formulário em /solicitar-meu-site.</p>
      ${section("Dados de contato", [
        ["Nome", state.nome],
        ["WhatsApp", state.whatsapp],
        ["E-mail", state.email],
        ["Empresa", state.empresa],
      ])}
      ${section("Sobre o negócio", [
        ["Segmento", resolveLabel(state.segmento, state.segmentoOutro, SEGMENTO_OPTIONS)],
        ["Cidade/Estado", `${state.cidade} - ${resolveEstadoLabel(state.estado)}`],
      ])}
      ${section("Presença digital atual", [
        ["Site atual", resolveLabel(state.possuiSite, "", SIM_NAO)],
        ["Domínio", resolveLabel(state.possuiDominio, "", SIM_NAO_NAOSEI)],
        ["Google Meu Negócio", resolveLabel(state.possuiGmb, "", SIM_NAO_NAOSEI)],
      ])}
      ${section("Objetivo do projeto", [
        ["Objetivo", resolveLabel(state.objetivo, state.objetivoOutro, OBJETIVO_OPTIONS)],
        ["Tipo de site", resolveLabel(state.tipoSite, state.tipoSiteOutro, TIPO_SITE_OPTIONS)],
      ])}
      ${section("Direção visual", [
        ["Estilo", resolveLabel(state.estiloVisual, state.estiloVisualOutro, ESTILO_OPTIONS)],
        ["Cores preferidas", state.coresPreferidas || "—"],
        ["Sites de referência", state.sitesReferencia || "—"],
      ])}
      ${section("Funcionalidades desejadas", [
        ["Selecionadas", resolveMultiLabel(state.funcionalidades, state.funcionalidadesOutro, FUNCIONALIDADES_OPTIONS)],
      ])}
      ${section("Observações", [["Texto livre", state.observacoes || "—"]])}
    </div>`;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY não configurada — e-mail do formulário não foi enviado.",
    );
    return NextResponse.json(
      { ok: false, error: "email_not_configured" },
      { status: 500 },
    );
  }

  let state: FormState;
  try {
    state = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_body" },
      { status: 400 },
    );
  }

  const resend = new Resend(apiKey);
  const fromAddress =
    process.env.REQUEST_FORM_FROM_EMAIL || "Merovi <contato@merovi.com.br>";

  try {
    const result = await resend.emails.send({
      from: fromAddress,
      to: REQUEST_INBOX,
      replyTo: state.email || undefined,
      subject: `Novo pedido de site — ${state.empresa || state.nome || "sem nome"}`,
      html: buildEmailHtml(state),
      text: buildSummaryText(state),
    });

    if (result.error) {
      console.error("Resend recusou o envio:", result.error);
      return NextResponse.json(
        { ok: false, error: "send_failed" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Falha ao enviar e-mail via Resend:", error);
    return NextResponse.json(
      { ok: false, error: "send_failed" },
      { status: 500 },
    );
  }
}
