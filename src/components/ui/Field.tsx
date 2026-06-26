import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/** Campo de formulário com rótulo (server-safe; usado pelos forms client). */
export function Field({
  label,
  name,
  className,
  ...props
}: { label: string; name: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-[11px] uppercase tracking-[0.18em] text-ink/45">
        {label}
      </span>
      <input
        id={name}
        name={name}
        className="w-full border border-ink/20 bg-transparent px-4 py-2.5 text-sm outline-none transition-colors focus:border-ink"
        {...props}
      />
    </label>
  );
}
