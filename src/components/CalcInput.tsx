"use client";

interface CalcInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit?: string;
  placeholder?: string;
  helpText?: string;
}

export default function CalcInput({
  label,
  value,
  onChange,
  unit = "만원",
  placeholder = "0",
  helpText,
}: CalcInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2.5 border border-card-border rounded-lg bg-card-bg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-right text-lg"
        />
        <span className="text-sm text-muted whitespace-nowrap">{unit}</span>
      </div>
      {helpText && <p className="text-xs text-muted mt-1">{helpText}</p>}
    </div>
  );
}
