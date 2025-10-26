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

    private googleAuthUrl = 'http://localhost:5050/api/auth/google';

    setIsLoggedIn() {
        if(localStorage.getItem("token") != null) {
            this.isLoggedIn.set(true);
            const storedUser = localStorage.getItem("user");
            if(storedUser) {
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
