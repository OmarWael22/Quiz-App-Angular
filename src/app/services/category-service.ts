import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Category } from '../utils/types';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private apiUrl = 'https://quiz-app-api-lac.vercel.app/api/categories';

    constructor(private http: HttpClient) {}

    getCategories(): Observable<Category[]> {
        return this.http.get<{ data: Category[] }>(this.apiUrl).pipe(
        map(response => response.data)
        );
    }
    updateCategory(catId : string , data:Omit<Category,'_id'>): Observable<any>{
        // const { name, description, rating, popularity } = category;
        // const body = { name, description, rating, popularity };
        return this.http.put(`${this.apiUrl}/${catId}`, data )
    }
    addCategory(category: Omit<Category,'_id'>): Observable<any>{
        const { name, description, rating, popularity } = category;
        const body = { name, description, rating, popularity };
        return this.http.post(this.apiUrl, body )
    }
    deleteCategory(id : string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`,)
    }
}
