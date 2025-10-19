import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { UserService } from '../../services/user-service';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';

@Component({
    selector: 'app-profile',
    imports: [CommonModule, DatePipe, TitleCasePipe],
    templateUrl: './profile.html',
    styleUrl: './profile.css'
})
export class Profile implements OnInit {
    userData: any = null;
    userExams: any = null;
    constructor(private auth: AuthService, private userService: UserService) {}

    ngOnInit(): void {
        const userId = this.auth.userID;

        if (userId) {
            this.userService.getUserById(userId).subscribe({
                next: ({ data }) => {
                    console.log('User data fetched:', data);
                    this.userData = data;
                },
                error: (err) => {
                    console.error('Error fetching user data:', err);
                },
            });

            this.userService.getUserExams(userId).subscribe({
                next: ({ data }) => {
                    console.log('data', data);
                    this.userExams = data;
                },
                error: (err) => {
                    console.error('Error fetching user data:', err);
                }
            })
        }
    }
}
