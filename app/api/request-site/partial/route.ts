import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  buildPartialSummaryText,
  INITIAL_FORM_STATE,
  type FormState,
} from "@/lib/request-form";

const REQUEST_INBOX = "merovidigital@gmail.com";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY não configurada — lead parcial não foi enviado.",
    );
    return NextResponse.json(
      { ok: false, error: "email_not_configured" },
      { status: 500 },
    );
  }

  // navigator.sendBeacon() posts the JSON payload as a plain string, which
  // the browser sends with Content-Type: text/plain (not application/json)
  // — so we read the raw body and parse it ourselves instead of using
  // request.json().
  const raw = await request.text();
  let state: FormState;
  try {
    state = { ...INITIAL_FORM_STATE, ...JSON.parse(raw) };
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_body" },
      { status: 400 },
    );
  }

  if (!state.whatsapp || !state.whatsapp.trim()) {
    return NextResponse.json(
      { ok: false, error: "missing_whatsapp" },
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
      subject: `Lead parcial — formulário abandonado (${state.nome || state.empresa || state.whatsapp})`,
      text: buildPartialSummaryText(state),
    });

    if (result.error) {
      console.error("Resend recusou o envio do lead parcial:", result.error);
      return NextResponse.json(
        { ok: false, error: "send_failed" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Falha ao enviar lead parcial via Resend:", error);
    return NextResponse.json(
      { ok: false, error: "send_failed" },
      { status: 500 },
    );
  }
}
