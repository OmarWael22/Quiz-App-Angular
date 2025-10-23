import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const cookieName = 'token'; // 👈 specify your cookie name
    const match = document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));
    const token = match ? decodeURIComponent(match[2]) : null;

    console.log('authInterceptor', token); // should now show your JWT
    return next(req);
};
