import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http : HttpClient) {

    }
    isLoggedIn = signal(false); // to make CD in header

    userID: string = '';
    userName: string = '';
    userEmail: string = '';
    userRole: string = '';
    userToken: string = '';

    private googleAuthUrl = 'http://localhost:5050/api/auth/google';


    fillData(id: string, name: string, email: string, role: string, token: string) {
        console.log('Filling the data', id, name, email, role, token);
        this.isLoggedIn.set(true);
        this.userID = id;
        this.userName = name;
        this.userEmail = email;
        this.userRole = role;
        this.userToken = token;
    }

    clearData() {
        console.log('Clearing the data');
        this.isLoggedIn.set(false);
        this.userID = '';
        this.userName = '';
        this.userEmail = '';
        this.userRole = '';
        this.userToken = '';
    }

    authWithGoogle() {
        console.log('auht with google in auth service');
        return this.http.get<any>(this.googleAuthUrl, {
            withCredentials: true
        });
    }
}
