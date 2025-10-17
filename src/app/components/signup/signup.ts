import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SignupService } from '../../services/signup-service';

@Component({
	selector: 'app-signup',
	imports: [FormsModule, ReactiveFormsModule, RouterLink],
	templateUrl: './signup.html',
	styleUrl: './signup.css'
})
export class Signup {
	name: string = '';
	email: string = '';
	password: string = '';

    errMsg: string | null = null;
    successMsg: string | null = null;
    
	signupForm: FormGroup;

	constructor(fb: FormBuilder, private signupService: SignupService, private router: Router) {
		this.signupForm = fb.group({
			name: ['', [Validators.required, Validators.minLength(3)]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(3)]]
		});
	}

	onSignup() {
		const {name, email, password} = this.signupForm.value;

		if(this.signupForm.invalid) {
            this.errMsg = 'Invalid data';
            this.successMsg = null;
			return ;
		}
		this.signupService.signup(name, email, password).subscribe({
            error: (err) => {
                console.log('err', err, err.error.msg);
                this.errMsg = err.error.msg;
            },
			next: (res) => {
				console.log('Signedup successfully', res.msg);
                this.successMsg = 'Signed up successfully! 🎉';
                this.errMsg = null;
                setTimeout(() => {
                    this.router.navigate(['/login'])
                }, 2000);
			}
		})
	}
}
