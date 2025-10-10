import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
 
@Injectable({
    providedIn: 'root'
})
export class SignupService {
    private signupUrl = 'https://quiz-app-api-lac.vercel.app/api/auth/register';
    
    constructor(private http: HttpClient) { }

    signup(name: string, email: string, password: string): Observable<any> {
        const reqBody = {
            name, 
            email,
            password
        };

        return this.http.post<any>(this.signupUrl, reqBody);
    }
}