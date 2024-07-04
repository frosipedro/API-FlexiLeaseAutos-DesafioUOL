export function validateCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]/g, '');

  if (cpf.length !== 11) {
    return false;
  }

  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  const validateDigit = (
    cpf: string,
    factor: number,
    digitPosition: number,
  ): boolean => {
    let total = 0;
    for (let i = 0; i < factor - 1; i++) {
      total += parseInt(cpf[i]) * (factor - i);
    }
    const remainder = total % 11;
    const calculatedDigit = remainder < 2 ? 0 : 11 - remainder;
    return calculatedDigit === parseInt(cpf[digitPosition]);
  };

  const isFirstDigitValid = validateDigit(cpf, 10, 9);
  const isSecondDigitValid = validateDigit(cpf, 11, 10);

  return isFirstDigitValid && isSecondDigitValid;
}
