import { Routes } from '@angular/router';
import { Landing } from './components/landing/landing';

export const routes: Routes = [
	//In general, eager loading is recommended for primary landing page(s) while other pages would be lazy-loaded.
	{ path: 'home', component: Landing, title: 'home' },
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{
		path: 'categories',
		loadComponent: () => import('./components/categories/categories').then(m => m.Categories),
		title: 'categories'
	},
	{

		path: 'grade-exam',
		loadComponent: () => import('./components/grade-exam/grade-exam').then(m => m.GradeExam),
		title: 'Grade Exam'
	},

	{
		path: 'profile',
		loadComponent: () => import('./components/profile/profile').then(m => m.Profile),
		title: 'Profile'
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./components/admin-dashboard/admin-dashboard').then(m => m.AdminDashboard),
        title: 'DashBoard',
        children: [
            {
                path: 'categories-control',
                loadComponent: () => import('./components/admin-dashboard/category-control/category-control').then(m => m.CategoryControl),

            },
            {
                path: 'questions-control',
                loadComponent: () => import('./components/admin-dashboard/question-control/question-control').then(m => m.QuestionControl),

            }
        ]
    },

	{
		path: 'login',
		loadComponent: () => import('./components/login/login').then(m => m.Login),
		title: 'Login'
	},
	{
		path: 'signup',
		loadComponent: () => import('./components/signup/signup').then(m => m.Signup),
		title: 'Signup'
	},
	{
		path: 'exam',
		loadComponent: () => import('./components/exam/exam').then(m => m.Exam),
		title: 'Exam'
	},
	{
		path: '**',
		loadComponent: () => import('./components/not-found/not-found').then(m => m.NotFound),
		title: 'Page Not Found'
	}
];
