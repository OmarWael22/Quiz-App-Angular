import { Routes } from '@angular/router';
import { Landing } from './components/landing/landing';
import { Categories } from './components/categories/categories';

export const routes: Routes = [
  //In general, eager loading is recommended for primary landing page(s) while other pages would be lazy-loaded.
  { path: 'home', component: Landing , title : 'home'},
  { path: '', redirectTo : 'home' , pathMatch : 'full'},
  {
    path: 'categories',
    loadComponent: () => import('./components/categories/categories').then(m => m.Categories),
    title: 'categories'
  },
  {
    path: 'start-quiz',
    loadComponent: () => import('./components/startquiz/startquiz').then(m => m.Startquiz),
    title: 'Start Quiz'
  },
  {
    path: 'profile',
    loadComponent: () => import('./components/profile/profile').then(m => m.Profile),
    title: 'Profile'
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login').then(m => m.Login),
    title: 'Login'
  },
  {
    path: '**',
    loadComponent: () => import('./components/not-found/not-found').then(m => m.NotFound),
    title: 'Page Not Found'
  }
];
