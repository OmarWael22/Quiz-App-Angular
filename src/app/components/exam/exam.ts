import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-exam',
    imports: [],
    templateUrl: './exam.html',
    styleUrl: './exam.css'
})
export class Exam implements OnInit{
    examData: any;
    userAnswers: string[] = [];

    category: string = '';
    difficulty: string = '';
    nQuestion: number = 0;

    private route = inject(ActivatedRoute);
    
    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        // get query params values
        const snapshot = this.route.snapshot;
        this.category = snapshot.queryParams['category'];
        this.difficulty = snapshot.queryParams['difficulty'];
        this.nQuestion = snapshot.queryParams['nQuestion'];
        
        const apiUrl: string = 'https://quiz-app-api-lac.vercel.app/api/exams';

        const body = {
            categoryId: this.category,
            difficulty: this.difficulty,
            numberOfQuestions: this.nQuestion
        }
        // console.log('snapshot', snapshot);
        // console.log(this.category, this.difficulty, this.nQuestion);
        
        this.http.post(apiUrl, body, {
            withCredentials: true
        }).subscribe({
            next: (res: any) => {
                console.log('Exam created successfully', res);
                this.examData = res;
            },
            error: (error: any) => {
                console.error('Errorrr', error);
            }
        })



    }


    submitExam() {
        console.log('submit');
    }

    selectAnswer(c: any, i: any) {
        console.log('select', c, i);
    }
}
