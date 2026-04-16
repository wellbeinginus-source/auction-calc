interface ResultRowProps {
  label: string;
  value: string;
  highlight?: boolean;
  sub?: boolean;
}

export default function ResultRow({
  label,
  value,
  highlight,
  sub,
}: ResultRowProps) {
  return (
    <div
      className={`flex items-center justify-between py-2 ${
        highlight
          ? "text-lg font-bold border-t-2 border-primary pt-3 mt-1"
          : sub
            ? "text-sm text-muted"
            : ""
      }`}
    >
      <span>{label}</span>
      <span className={highlight ? "text-primary" : ""}>{value}</span>
    </div>
  );
}
