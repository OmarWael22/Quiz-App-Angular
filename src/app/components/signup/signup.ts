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

		console.log('trying to signup', 'name=', name, 'email = ', email, 'pass = ', password);
		if(this.signupForm.invalid) {
			console.log('Signup form is invalid');
			return ;
		}
		this.signupService.signup(name, email, password).subscribe({
			next: (res) => {
				console.log('Signedup successfully', res.msg);
				this.router.navigate(['/login'])
			}
		})
	}
}
