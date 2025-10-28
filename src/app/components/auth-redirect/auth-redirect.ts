import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-auth-redirect',
  imports: [],
  templateUrl: './auth-redirect.html',
  styleUrl: './auth-redirect.css'
})
export class AuthRedirect implements OnInit{
    constructor(
        private actevatedRouter : ActivatedRoute, 
        private router: Router,
        private authService: AuthService    
    ) { }

    ngOnInit(): void {
        const snapshot = this.actevatedRouter.snapshot;
        const token = snapshot.queryParams?.['token'];
        const user = snapshot.queryParams?.['user'];
        const decodedUser = decodeURIComponent(user);

        localStorage.setItem("token", token);
        localStorage.setItem("user",  decodedUser);
        this.authService.setIsLoggedIn();
        this.router.navigate(['/']);
    }
}
