"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type CityAutocompleteProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  uf: string;
  required?: boolean;
  error?: string;
};

const cityCache = new Map<string, string[]>();

// Strip combining diacritical marks (U+0300-U+036F) after NFD decomposition,
// so typing "sao paulo" still matches "São Paulo".
const DIACRITICS_PATTERN = /[̀-ͯ]/g;

function normalize(text: string) {
  return text.toLowerCase().normalize("NFD").replace(DIACRITICS_PATTERN, "");
}

/**
 * Free-text city field with suggestions from IBGE's municipality API,
 * scoped to the chosen UF (`GET /localidades/estados/{uf}/municipios`).
 * Results are cached per UF for the session. If the request fails, the
 * field still works as plain free text — the API is a UX aid, not a
 * hard dependency for filling out the form.
 */
export function CityAutocomplete({
  label,
  value,
  onChange,
  uf,
  required,
  error,
}: CityAutocompleteProps) {
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
    setFetchFailed(false);

    if (!uf) {
      setCities([]);
      return;
    }

    const cached = cityCache.get(uf);
    if (cached) {
      setCities(cached);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`,
    )
      .then((response) => {
        if (!response.ok) throw new Error("IBGE request failed");
        return response.json();
      })
      .then((data: Array<{ nome: string }>) => {
        if (cancelled) return;
        const names = data
          .map((item) => item.nome)
          .sort((a, b) => a.localeCompare(b, "pt-BR"));
        cityCache.set(uf, names);
        setCities(names);
      })
      .catch(() => {
        if (!cancelled) setFetchFailed(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [uf]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const suggestions = useMemo(() => {
    if (!value.trim()) return cities.slice(0, 8);
    const query = normalize(value);
    return cities.filter((city) => normalize(city).includes(query)).slice(0, 8);
  }, [cities, value]);

  const disabled = !uf;

  return (
    <div ref={containerRef} className="relative flex flex-col gap-2">
      <span className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-muted"> *</span>}
      </span>
      <input
        type="text"
        value={value}
        disabled={disabled}
        onChange={(event) => {
          onChange(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={
          disabled
            ? "Escolha o estado primeiro"
            : loading
              ? "Carregando cidades…"
              : "Digite sua cidade"
        }
        className={`rounded-lg border bg-transparent px-4 py-2.5 text-foreground placeholder:text-muted/50 focus:outline-none transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 ${
          error ? "border-white/50" : "border-white/15 focus:border-white/40"
        }`}
      />
      {open && !disabled && suggestions.length > 0 && (
        <ul className="absolute top-full z-20 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-white/15 bg-background py-1 shadow-lg">
          {suggestions.map((city) => (
            <li key={city}>
              <button
                type="button"
                onClick={() => {
                  onChange(city);
                  setOpen(false);
                }}
                className="block w-full px-4 py-2 text-left text-sm text-foreground hover:bg-white/5"
              >
                {city}
              </button>
            </li>
          ))}
        </ul>
      )}
      {fetchFailed && !disabled && (
        <p className="text-sm text-muted">
          Não consegui carregar as sugestões agora, pode digitar sua cidade
          normalmente.
        </p>
      )}
      {error && (
        <span className="text-sm font-medium text-foreground">! {error}</span>
      )}
    </div>
  );
}
