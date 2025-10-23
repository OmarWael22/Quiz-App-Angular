import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { LogoutService } from '../../services/logout-service';

@Component({
    selector: 'app-header',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './header.html',
    styleUrl: './header.css'
})
export class Header{
    constructor(protected authService: AuthService, private logoutService: LogoutService, private router: Router) { }

    scrollToSection(event: Event, sectionId: string) {
        event.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    logout() {
        this.logoutService.logout().subscribe({
            next: (res: Response) => {
                this.authService.clearData();
            }
        });

        this.router.navigate(['/'])
    }

}
