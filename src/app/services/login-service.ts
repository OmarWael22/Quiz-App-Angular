import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private loginUrl = 'https://quiz-app-api-lac.vercel.app/api/auth/login';
    private logoutUrl = 'https://quiz-app-api-lac.vercel.app/api/auth/logout';

    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<any> {
        const reqBody = { 
            email,
            password
        };

        return this.http.post<any>(this.loginUrl, reqBody, {
            withCredentials: true
        });
    }

    logout(): Observable<any> {
        return this.http.post<any>(this.logoutUrl, {}, {
            withCredentials: true
        });
    }

}