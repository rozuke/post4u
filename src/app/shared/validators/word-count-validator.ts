import { AbstractControl, ValidationErrors } from '@angular/forms';

export function wordCountValidator(maxWords: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const words = control.value.trim().split(/\s+/);
    if (words.length > maxWords) {
      return { wordCount: { maxWords, actualWords: words.length } };
    }

    return null;
  };
}
