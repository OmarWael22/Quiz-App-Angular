import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
    email: string = '';
    password: string = '';
    errMsg: string | null = null;
    successMsg: string | null = null;

    constructor(private loginService: LoginService, private router: Router) {}

    onSubmit(e: Event){
        this.loginService.login(this.email, this.password).subscribe({
            next: (res) => {
                console.log('Logged in successfully!');
                this.successMsg = 'Logged in successfully!';
                setTimeout(() => {
                    this.router.navigate(['/']);
                }, 2000)
            },
            error: (err) => {
                this.errMsg = err.error?.message || 'Email or password are incorrect!';
            }
        })


    }

}
