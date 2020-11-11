import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RegisterForm } from './register-form.model';
import { extractApiError } from 'src/app/shared/helpers/functions';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) {}

    register(formData: RegisterForm): Observable<any> {
        return this.http
            .post(`/api/users/register`, formData)
            .pipe(catchError((resError: HttpErrorResponse) =>
                throwError(extractApiError(resError))
            )
        );
    }
    login(): any {}
}
