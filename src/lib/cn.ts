/**
 * Junta classes condicionalmente, ignorando valores falsy.
 * Mantém o projeto sem dependências extras (clsx/classnames).
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
