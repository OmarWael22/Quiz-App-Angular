import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl = 'https://quiz-app-api-lac.vercel.app/api/user'; // adjust your backend base URL if needed

    constructor(private http: HttpClient) {}

    getUserById(id: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }
}
