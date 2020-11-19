import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RegisterForm, LoginForm } from './register-form.model';
import { extractApiError } from 'src/app/shared/helpers/functions';
import { JwtHelperService } from "@auth0/angular-jwt";
import * as moment from 'moment';

const jwt = new JwtHelperService();

class DecodedToken {
    exp: number = 0;
    email: string = '';
    userId: string = '';
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private decodedToken: DecodedToken;
    redirectUrl: string;

    constructor(private http: HttpClient) {
        this.decodedToken = new DecodedToken();
    }

    register(formData: RegisterForm): Observable<any> {
        return this.http
            .post(`/api/users/register`, formData)
            .pipe(catchError((resError: HttpErrorResponse) =>
                throwError(extractApiError(resError))
            )
        );
    }

    login(formData: any) {
        return this.http
            .post('/api/users/login', formData)
            .pipe(
                map((token: string) => {
                    this.saveToken(token);
                    return token;
                }),
                catchError((resError: HttpErrorResponse) => 
                    throwError(extractApiError(resError))
                ),
            )       
    }

    logout() {
        localStorage.removeItem('bwm_auth_token');
        this.decodedToken = new DecodedToken();
    }

    checkAuthentication(): boolean {
        const authToken = localStorage.getItem('bwm_auth_token');
        if(!authToken) { return false; }

        const decodedToken = jwt.decodeToken(authToken);
        if (!decodedToken) { return false; }
        this.decodedToken = decodedToken;
        return true;
    }

    private saveToken(token: string): string | null {
        const decodedToken = jwt.decodeToken(token);
        if (!decodedToken) { return null; }
    
        this.decodedToken = decodedToken;
    
        localStorage.setItem('bwm_auth_token', token);
        return token;
      }

      get isAuthenticated(): boolean {
        return moment().isBefore(this.expiration);
      }
    
      get username(): string {
          // todo cast email to part infront of @
        return this.decodedToken.email;
      }
    
      private get expiration() {
        return moment.unix(this.decodedToken.exp);
      }
}
