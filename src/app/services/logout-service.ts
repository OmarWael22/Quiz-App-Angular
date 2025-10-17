import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LogoutService {
    private logoutUrl = 'https://quiz-app-api-lac.vercel.app/api/auth/logout';
    
    constructor(private http: HttpClient) { }

    logout(): Observable<any> {
        console.log('Logging out serviceeee');
        return this.http.post<any>(this.logoutUrl, {}, {
            withCredentials: true
        });
    }

}
