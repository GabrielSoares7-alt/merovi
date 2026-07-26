"use client";

type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  error?: string;
};

export function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder = "Selecione",
  required,
  error,
}: SelectFieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-muted"> *</span>}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`rounded-lg border bg-transparent px-4 py-2.5 text-foreground focus:outline-none transition-colors duration-150 ${
          error ? "border-white/50" : "border-white/15 focus:border-white/40"
        }`}
      >
        <option value="" disabled className="bg-background text-muted">
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-background text-foreground"
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-sm font-medium text-foreground">! {error}</span>
      )}
    </label>
  );
}
