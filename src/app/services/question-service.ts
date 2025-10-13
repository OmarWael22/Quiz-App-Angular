import { Injectable } from '@angular/core';
import { Question } from '../utils/types';
import { Observable , map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class QuestionService {
    private apiUrl = 'https://quiz-app-api-lac.vercel.app/api/questions';

    constructor(private http: HttpClient) {}

    getCategories(): Observable<Question[]> {
        return this.http.get<{ data: Question[] }>(this.apiUrl).pipe(
        map(response => response.data)
        );
    }
    updateQuestion(questionId : string , data:Omit<Question,'_id'>): Observable<any>{
        // const { name, description, rating, popularity } = category;
        // const body = { name, description, rating, popularity };
        return this.http.put(`${this.apiUrl}/${questionId}`, data )
    }
    addQuestion(Question: Omit<Question,'_id'>): Observable<any>{
        // const { name, description, rating, popularity } = Question;
        // const body = { name, description, rating, popularity };
        return this.http.post(this.apiUrl, Question )
    }
    deleteQuestion(id : string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`,)
    }
}
