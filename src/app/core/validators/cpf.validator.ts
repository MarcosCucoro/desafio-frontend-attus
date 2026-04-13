import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const cpfValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  let cpf = control.value;

  if (!cpf) return null;

  cpf = cpf.replace(/\D/g, '');

  if (cpf.length < 11) return null; // 🔥 não valida enquanto digita

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return { invalidCpf: true };
  }

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += +cpf[i - 1] * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder >= 10) remainder = 0;
  if (remainder !== +cpf[9]) return { invalidCpf: true };

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += +cpf[i - 1] * (12 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder >= 10) remainder = 0;

  return remainder === +cpf[10] ? null : { invalidCpf: true };
};
