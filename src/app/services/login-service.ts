import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private loginUrl = 'https://quiz-app-api-lac.vercel.app/api/auth/login';

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

}