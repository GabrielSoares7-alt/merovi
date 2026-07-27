"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";
import { TextField } from "@/components/ui/TextField";
import { TextArea } from "@/components/ui/TextArea";
import { SelectField } from "@/components/ui/SelectField";
import { CityAutocomplete } from "@/components/ui/CityAutocomplete";
import { CONTACT } from "@/lib/nav";
import { ESTADOS } from "@/lib/estados";
import {
  ESTILO_OPTIONS,
  FUNCIONALIDADES_OPTIONS,
  INITIAL_FORM_STATE,
  OBJETIVO_OPTIONS,
  SEGMENTO_OPTIONS,
  SIM_NAO,
  SIM_NAO_NAOSEI,
  STEP_TITLES,
  TIPO_SITE_OPTIONS,
  WHATSAPP_MESSAGE,
  type FormState,
} from "@/lib/request-form";

/**
 * Multi-step lead form. Deliberately lighter on motion than the rest of the
 * site (no ScrollReveal, no Card hover-lift on the shell) — this page's job
 * is fast, clear data entry, not visual impact.
 *
 * Submitting fires the full answer summary to the Merovi inbox (POST
 * /api/request-site, Resend) and then redirects to WhatsApp with a short,
 * generic message — the detailed answers no longer go in the WhatsApp text.
 * The e-mail is best-effort: a failed/slow send never blocks the WhatsApp
 * handoff, since that's the actual conversion action.
 */
export function RequestSiteForm() {
  const [state, setState] = useState<FormState>(INITIAL_FORM_STATE);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [waUrl, setWaUrl] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  // Kept in a ref (not state) so the abandonment listeners below always read
  // the latest values without needing to re-subscribe on every keystroke.
  // Updated synchronously inside update() below, NOT via a useEffect mirror
  // — a useEffect runs after commit/paint, asynchronously relative to the
  // change, so a pagehide/visibilitychange firing in the same tick as the
  // last keystroke (e.g. a click that both blurs a field and navigates)
  // could read a stale value from before that effect had run.
  const stateRef = useRef(state);
  const formSubmittedRef = useRef(false);
  const partialSentRef = useRef(false);

  // Partial-lead capture: if someone fills in WhatsApp and then leaves
  // (closes the tab, switches tabs, minimizes, or navigates away) without
  // completing the form, fire a best-effort e-mail with whatever was filled
  // in so far. Uses sendBeacon (not fetch) because fetch requests can be
  // cancelled mid-flight once the page starts unloading; sendBeacon is
  // designed to survive that. visibilitychange covers tab-switch/minimize,
  // pagehide covers tab close/navigation — together they cover all the exit
  // paths a plain "beforeunload" would miss on mobile browsers.
  useEffect(() => {
    function sendPartialLeadIfEligible() {
      if (formSubmittedRef.current || partialSentRef.current) return;
      const current = stateRef.current;
      if (!current.whatsapp.trim()) return;

      partialSentRef.current = true;
      if (typeof navigator.sendBeacon === "function") {
        navigator.sendBeacon(
          "/api/request-site/partial",
          JSON.stringify(current),
        );
      }
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "hidden") {
        sendPartialLeadIfEligible();
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", sendPartialLeadIfEligible);

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
      window.removeEventListener("pagehide", sendPartialLeadIfEligible);
    };
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    stateRef.current = { ...stateRef.current, [key]: value };
    setState((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key as string]) return prev;
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  }

  function validateStep(index: number): Record<string, string> {
    const next: Record<string, string> = {};
    const required = (key: keyof FormState, message: string) => {
      const value = state[key];
      if (typeof value === "string" && value.trim() === "") {
        next[key as string] = message;
      }
    };

    if (index === 0) {
      required("nome", "Conta seu nome");
      required("whatsapp", "Conta seu WhatsApp");
      required("email", "Conta seu e-mail");
      required("empresa", "Conta o nome da empresa");
    } else if (index === 1) {
      required("segmento", "Escolha o segmento");
      required("estado", "Escolha o estado");
      required("cidade", "Conta sua cidade");
    } else if (index === 2) {
      required("possuiSite", "Escolha uma opção");
      required("possuiDominio", "Escolha uma opção");
      required("possuiGmb", "Escolha uma opção");
    } else if (index === 3) {
      required("objetivo", "Escolha o objetivo");
      required("tipoSite", "Escolha o tipo de site");
    } else if (index === 4) {
      required("estiloVisual", "Escolha o estilo");
      required("coresPreferidas", "Conta suas cores preferidas");
    } else if (index === 5) {
      if (state.funcionalidades.length === 0) {
        next.funcionalidades = "Escolha ao menos uma opção";
      }
    }
    return next;
  }

  const isLastStep = step === STEP_TITLES.length - 1;

  function handleNext() {
    const stepErrors = validateStep(step);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep((current) => Math.min(current + 1, STEP_TITLES.length - 1));
  }

  function handleBack() {
    setErrors({});
    setStep((current) => Math.max(current - 1, 0));
  }

  async function handleSubmit() {
    const stepErrors = validateStep(step);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    // Set before the fetch (not after) so the navigation to WhatsApp right
    // below — which triggers pagehide — is never mistaken for abandonment.
    formSubmittedRef.current = true;
    setSending(true);
    try {
      await fetch("/api/request-site", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
    } catch {
      // Best-effort: the WhatsApp handoff below is the real conversion
      // action and must not be blocked by an e-mail delivery failure.
    }

    const url = `${CONTACT.whatsappHref}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    setWaUrl(url);
    window.location.href = url;
  }

  if (waUrl) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-surface p-8 text-center">
        <h2 className="text-xl font-semibold">Abrindo o WhatsApp…</h2>
        <p className="text-muted">
          Se não abriu automaticamente, toque no botão abaixo.
        </p>
        <Button href={waUrl} target="_blank" rel="noopener noreferrer">
          Abrir WhatsApp
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (isLastStep) {
          handleSubmit();
        } else {
          handleNext();
        }
      }}
      className="flex flex-col gap-8 rounded-2xl border border-white/10 bg-surface p-6 sm:p-8"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm text-muted">
          <span>{STEP_TITLES[step]}</span>
          <span>
            Passo {step + 1} de {STEP_TITLES.length}
          </span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full w-full origin-left bg-foreground transition-transform duration-200"
            style={{ transform: `scaleX(${(step + 1) / STEP_TITLES.length})` }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {step === 0 && (
          <>
            <TextField
              label="Nome"
              required
              value={state.nome}
              onChange={(value) => update("nome", value)}
              error={errors.nome}
              placeholder="Seu nome"
            />
            <TextField
              label="WhatsApp"
              required
              type="tel"
              value={state.whatsapp}
              onChange={(value) => update("whatsapp", value)}
              error={errors.whatsapp}
              placeholder="(21) 99999-9999"
            />
            <TextField
              label="E-mail"
              required
              type="email"
              value={state.email}
              onChange={(value) => update("email", value)}
              error={errors.email}
              placeholder="voce@empresa.com"
            />
            <TextField
              label="Nome da empresa"
              required
              value={state.empresa}
              onChange={(value) => update("empresa", value)}
              error={errors.empresa}
              placeholder="Nome do seu negócio"
            />
          </>
        )}

        {step === 1 && (
          <>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-foreground">
                Segmento da empresa <span className="text-muted">*</span>
              </span>
              <RadioGroup
                options={SEGMENTO_OPTIONS}
                value={state.segmento}
                onChange={(value) => update("segmento", value)}
                otherValue={state.segmentoOutro}
                onOtherChange={(value) => update("segmentoOutro", value)}
                error={errors.segmento}
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <SelectField
                label="Estado"
                required
                value={state.estado}
                onChange={(value) => {
                  update("estado", value);
                  update("cidade", "");
                }}
                options={ESTADOS}
                error={errors.estado}
              />
              <CityAutocomplete
                label="Cidade"
                required
                value={state.cidade}
                onChange={(value) => update("cidade", value)}
                uf={state.estado}
                error={errors.cidade}
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-foreground">
                Possui site atualmente? <span className="text-muted">*</span>
              </span>
              <RadioGroup
                options={SIM_NAO}
                value={state.possuiSite}
                onChange={(value) => update("possuiSite", value)}
                error={errors.possuiSite}
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-foreground">
                Possui domínio? <span className="text-muted">*</span>
              </span>
              <RadioGroup
                options={SIM_NAO_NAOSEI}
                value={state.possuiDominio}
                onChange={(value) => update("possuiDominio", value)}
                error={errors.possuiDominio}
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-foreground">
                Possui Google Meu Negócio?{" "}
                <span className="text-muted">*</span>
              </span>
              <RadioGroup
                options={SIM_NAO_NAOSEI}
                value={state.possuiGmb}
                onChange={(value) => update("possuiGmb", value)}
                error={errors.possuiGmb}
              />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-foreground">
                Objetivo do novo site <span className="text-muted">*</span>
              </span>
              <RadioGroup
                options={OBJETIVO_OPTIONS}
                value={state.objetivo}
                onChange={(value) => update("objetivo", value)}
                otherValue={state.objetivoOutro}
                onOtherChange={(value) => update("objetivoOutro", value)}
                error={errors.objetivo}
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-foreground">
                Tipo de site desejado <span className="text-muted">*</span>
              </span>
              <RadioGroup
                options={TIPO_SITE_OPTIONS}
                value={state.tipoSite}
                onChange={(value) => update("tipoSite", value)}
                otherValue={state.tipoSiteOutro}
                onOtherChange={(value) => update("tipoSiteOutro", value)}
                error={errors.tipoSite}
              />
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-foreground">
                Estilo visual desejado <span className="text-muted">*</span>
              </span>
              <RadioGroup
                options={ESTILO_OPTIONS}
                value={state.estiloVisual}
                onChange={(value) => update("estiloVisual", value)}
                otherValue={state.estiloVisualOutro}
                onOtherChange={(value) => update("estiloVisualOutro", value)}
                error={errors.estiloVisual}
              />
            </div>
            <TextField
              label="Cores preferidas"
              required
              value={state.coresPreferidas}
              onChange={(value) => update("coresPreferidas", value)}
              error={errors.coresPreferidas}
              placeholder="Ex: tons de azul e branco"
            />
            <TextField
              label="Sites de referência"
              value={state.sitesReferencia}
              onChange={(value) => update("sitesReferencia", value)}
              placeholder="Links de sites que você gosta (opcional)"
            />
          </>
        )}

        {step === 5 && (
          <>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-foreground">
                Funcionalidades desejadas{" "}
                <span className="text-muted">*</span>
              </span>
              <CheckboxGroup
                options={FUNCIONALIDADES_OPTIONS}
                values={state.funcionalidades}
                onChange={(values) => update("funcionalidades", values)}
                otherValue={state.funcionalidadesOutro}
                onOtherChange={(value) =>
                  update("funcionalidadesOutro", value)
                }
                error={errors.funcionalidades}
              />
            </div>
            <TextArea
              label="Observações"
              value={state.observacoes}
              onChange={(value) => update("observacoes", value)}
              placeholder="Alguma outra informação importante? (opcional)"
            />
          </>
        )}
      </div>

      <div className="flex items-center justify-between">
        {step > 0 ? (
          <Button
            type="button"
            variant="secondary"
            onClick={handleBack}
            disabled={sending}
          >
            Voltar
          </Button>
        ) : (
          <span />
        )}
        <Button type="submit" variant="primary" disabled={sending}>
          {sending
            ? "Enviando…"
            : isLastStep
              ? "Enviar pelo WhatsApp"
              : "Próximo"}
        </Button>
      </div>
    </form>
  );
}
