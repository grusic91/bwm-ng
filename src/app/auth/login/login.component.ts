import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl
} from '@angular/forms';
import { forbiddenEmailValidator } from '../../shared/validators/functions';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    emailIdPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): any {
        this.loginForm = this.fb.group({
            email: ['', [
                Validators.required,
                Validators.pattern(this.emailIdPattern),
                forbiddenEmailValidator('test@gm.com')
            ]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    login(): any {
        if (this.loginForm.invalid) { return; }
        alert(this.diagnostic);
    }

    get email(): AbstractControl { return this.loginForm.get('email'); }

    get password(): AbstractControl { return this.loginForm.get('password'); }

    get diagnostic(): string {
        return JSON.stringify(this.loginForm.value);
    }
}
