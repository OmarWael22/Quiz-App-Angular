import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GradeExamService {
    constructor(private http: HttpClient) { }

    gradeExam(apiUrl: string, questionsBody: any[]): Observable<any> {
        console.log('trying to post');
        return this.http.post<any>(apiUrl, questionsBody);
    }
}
