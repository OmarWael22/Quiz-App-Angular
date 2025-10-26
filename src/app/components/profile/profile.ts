import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { AuthService } from '../../services/auth-service';

@Component({
    selector: 'app-profile',
    imports: [CommonModule, DatePipe, TitleCasePipe],
    templateUrl: './profile.html',
    styleUrl: './profile.css'
})
export class Profile implements OnInit {
    userData: any = null;
    userExams: any = null;
    constructor(private authService: AuthService, private userService: UserService) {}

    ngOnInit(): void {
        
        const user = this.authService.user;
        const userId = user._id;

        if (userId) {
            this.userService.getUserById(userId).subscribe({
                next: ({ data }) => {
                    this.userData = data;
                },
                error: (err) => {
                    console.error('Error fetching user data:', err);
                },
            });

            this.userService.getUserExams(userId).subscribe({
                next: ({ data }) => {
                    this.userExams = data;
                },
                error: (err) => {
                    console.error('Error fetching user data:', err);
                }
            })
        }
    }
}
