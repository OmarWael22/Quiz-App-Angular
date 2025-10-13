import { Component, OnInit, inject } from '@angular/core';
import { CategoryControl } from './category-control/category-control';
import { Categories } from "../categories/categories";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.html',
    imports: [CategoryControl, Categories, RouterOutlet, RouterLink ,RouterLinkActive],
    styleUrl: './admin-dashboard.css'
    })
    export class AdminDashboard  {

}

