"use client";

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
};

export function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  error,
  className,
}: TextFieldProps) {
  return (
    <label className={`flex flex-col gap-2 ${className ?? ""}`}>
      <span className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-muted"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`rounded-lg border bg-transparent px-4 py-2.5 text-foreground placeholder:text-muted/50 focus:outline-none transition-colors duration-150 ${
          error ? "border-white/50" : "border-white/15 focus:border-white/40"
        }`}
      />
      {error && (
        <span className="text-sm font-medium text-foreground">! {error}</span>
      )}
    </label>
  );
}
