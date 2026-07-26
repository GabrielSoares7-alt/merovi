"use client";

import { choicePillClass, type ChoiceOption } from "@/components/ui/RadioGroup";

type CheckboxGroupProps = {
  options: ChoiceOption[];
  values: string[];
  onChange: (values: string[]) => void;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
  otherPlaceholder?: string;
  error?: string;
};

/** Multi-select sibling of RadioGroup — same toggle-pill treatment, but any number of options can be active at once. */
export function CheckboxGroup({
  options,
  values,
  onChange,
  otherValue,
  onOtherChange,
  otherPlaceholder = "Qual?",
  error,
}: CheckboxGroupProps) {
  const showOtherInput = values.includes("outros") && onOtherChange;

  const toggle = (optionValue: string) => {
    if (values.includes(optionValue)) {
      onChange(values.filter((value) => value !== optionValue));
    } else {
      onChange([...values, optionValue]);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = values.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => toggle(option.value)}
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
