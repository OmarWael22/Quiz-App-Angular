import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { __classPrivateFieldGet } from 'tslib';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http : HttpClient) {
        this.setIsLoggedIn();
    }
    private isLoggedIn = signal(false); // to make CD in header
    user: any = null;

    getIsLoggedIn() {
        return this.isLoggedIn();
    }

    private googleAuthUrl = 'https://quiz-app-api-lac.vercel.app/api/auth/google';

    setIsLoggedIn() {
        if(localStorage.getItem("token") != null) {
            this.isLoggedIn.set(true);
            const storedUser = localStorage.getItem("user");
            console.log('storedUser', storedUser);
            if(storedUser && storedUser !== undefined) {
                this.user = JSON.parse(storedUser);
            }
        }
        else 
            this.isLoggedIn.set(false);
    }

    authWithGoogle() {
        return this.http.get<any>(this.googleAuthUrl, {
            withCredentials: true
        });
    }
}
