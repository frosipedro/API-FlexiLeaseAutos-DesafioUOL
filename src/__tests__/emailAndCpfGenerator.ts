export function gerarEmailAleatorio(): string {
  const nomes = ['pedro', 'joao', 'maria', 'ana', 'carlos'];
  const dominios = ['example.com', 'mail.com', 'test.com'];
  const nome = nomes[Math.floor(Math.random() * nomes.length)];
  const dominio = dominios[Math.floor(Math.random() * dominios.length)];
  const numeroAleatorio = Math.floor(Math.random() * 1000);

  return `${nome}${numeroAleatorio}@${dominio}`;
}

export function gerarCPF(): string {
  const digitos = Array.from({ length: 9 }, () =>
    Math.floor(Math.random() * 10),
  );

  const calcularDigitoVerificador = (digitos: number[]): number => {
    const base = digitos.length + 1;
    const soma = digitos.reduce(
      (acc, digito, index) => acc + digito * (base - index),
      0,
    );
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const digito1 = calcularDigitoVerificador(digitos);
  const digito2 = calcularDigitoVerificador([...digitos, digito1]);

  return [...digitos, digito1, digito2]
    .join('')
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}
