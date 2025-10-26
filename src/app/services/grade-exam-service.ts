import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GradeExamService {
    constructor(private http: HttpClient) { }

    gradeExam(apiUrl: string, questions: any[]): Observable<any> {
        return this.http.post<any>(apiUrl, {questions});
    }
}
