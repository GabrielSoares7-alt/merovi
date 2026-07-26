"use client";

type TextAreaProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  rows?: number;
};

export function TextArea({
  label,
  value,
  onChange,
  placeholder,
  required,
  error,
  rows = 4,
}: TextAreaProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-muted"> *</span>}
      </span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`resize-none rounded-lg border bg-transparent px-4 py-2.5 text-foreground placeholder:text-muted/50 focus:outline-none transition-colors duration-150 ${
          error ? "border-white/50" : "border-white/15 focus:border-white/40"
        }`}
      />
      {error && (
        <span className="text-sm font-medium text-foreground">! {error}</span>
      )}
    </label>
  );
}
