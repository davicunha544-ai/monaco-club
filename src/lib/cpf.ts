/** Utilitários de CPF (validação com dígitos verificadores). */

export function limparCPF(cpf: string): string {
  return (cpf || "").replace(/\D/g, "");
}

export function validarCPF(cpf: string): boolean {
  const c = limparCPF(cpf);
  if (c.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(c)) return false; // todos os dígitos iguais

  const digito = (qtd: number) => {
    let soma = 0;
    for (let i = 0; i < qtd; i++) soma += Number(c[i]) * (qtd + 1 - i);
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };

  return digito(9) === Number(c[9]) && digito(10) === Number(c[10]);
}

export function formatarCPF(cpf: string): string {
  const c = limparCPF(cpf).slice(0, 11);
  if (c.length !== 11) return cpf;
  return `${c.slice(0, 3)}.${c.slice(3, 6)}.${c.slice(6, 9)}-${c.slice(9, 11)}`;
}
