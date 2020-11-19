import { Component, OnInit, OnDestroy } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forbiddenEmailValidator } from '../../shared/validators/functions';
import { AuthService } from '../shared/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    message: string;
    messageTimeout: any;
    loginForm: FormGroup;
    emailIdPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    errors: BwmApi.Error[] = [];

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private auth: AuthService
        ) { }

    ngOnInit(): void {
        this.initForm();
        this.checkLoginMessage();
    }

    login(): any {
        if (this.loginForm.invalid) { return; }
        
        this.errors = [];
        return this.auth
            .login(this.loginForm.value)
            .subscribe((_: string) => {
                if(this.auth.redirectUrl){
                    this.router.navigate([this.auth.redirectUrl]);
                    this.auth.redirectUrl = null;
                } else {
                    this.router.navigate(['/rentals']);
                }                
            }, (errors: BwmApi.Error[]) => {
                this.errors = errors;
            }
        );
    }

    checkLoginMessage(): void {
        this.route.queryParams.subscribe(params => {
            this.message = params.message ? params.message : null ;

            this.messageTimeout = window.setTimeout(() => {
                this.router.navigate([], {
                    replaceUrl: true,
                    queryParams: { message: null },
                    queryParamsHandling: 'merge'
                });
                this.message = '';
            }, 2000);
        });
    }

    ngOnDestroy(): void {
        this.messageTimeout && window.clearTimeout(this.messageTimeout);
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

    

    get email(): AbstractControl { return this.loginForm.get('email'); }

    get password(): AbstractControl { return this.loginForm.get('password'); }

    get diagnostic(): string {
        return JSON.stringify(this.loginForm.value);
    }
}
