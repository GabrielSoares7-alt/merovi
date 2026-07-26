"use client";

export type ChoiceOption = {
  value: string;
  label: string;
};

export function choicePillClass(selected: boolean) {
  return `rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 ${
    selected
      ? "border-foreground bg-foreground text-background"
      : "border-white/15 text-muted hover:border-white/35 hover:text-foreground"
  }`;
}

type RadioGroupProps = {
  options: ChoiceOption[];
  value: string;
  onChange: (value: string) => void;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
  otherPlaceholder?: string;
  error?: string;
};

/**
 * Single-select field rendered as toggle pills (not a native radio list) per
 * the brief's "botões de opção em vez de campos de texto livre". An
 * "outros" option (value === "outros") reveals a manual text fallback.
 * Errors render in monochrome (bold foreground text, no red) — DESIGN.md
 * bans any hue outside the neutral set, including for form validation.
 */
export function RadioGroup({
  options,
  value,
  onChange,
  otherValue,
  onOtherChange,
  otherPlaceholder = "Qual?",
  error,
}: RadioGroupProps) {
  const showOtherInput = value === "outros" && onOtherChange;

  return (
    <div className="flex flex-col gap-3">
      <div role="radiogroup" className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.value)}
              className={choicePillClass(selected)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {showOtherInput && (
        <input
          type="text"
          value={otherValue ?? ""}
          onChange={(event) => onOtherChange?.(event.target.value)}
          placeholder={otherPlaceholder}
          className="w-full max-w-sm rounded-lg border border-white/15 bg-transparent px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-white/40 focus:outline-none"
        />
      )}
      {error && (
        <p className="text-sm font-medium text-foreground">! {error}</p>
      )}
    </div>
  );
}
