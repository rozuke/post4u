import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }

    const hasLetter = /[A-Za-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const passwordValid = hasLetter && hasNumber;

    return !passwordValid ? { weakPassword: true } : null;
  };
}
