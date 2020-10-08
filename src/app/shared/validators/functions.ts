import { AbstractControl, FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';

export function forbiddenEmailValidator(email: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        const forbidden = control.value === email;
        return forbidden ? {forbiddenEmail: {value: control.value}} : null;
    };
}

export function sameAsValidator(controls: string[]): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
        const firstControl = control.get(controls[0]);
        const secondControl = control.get(controls[1]);

        if (!firstControl || !secondControl) { return null; }
        return firstControl.value !== secondControl.value ? {sameAs: {value: control.value}} : null;
    };
}
