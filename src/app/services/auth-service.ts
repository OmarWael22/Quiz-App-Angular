import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isLoggedIn = signal(false); // to make CD in header

    userID: string = '';
    userName: string = '';
    userEmail: string = '';
    userRole: string = '';
    userToken: string = '';
    

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
}
