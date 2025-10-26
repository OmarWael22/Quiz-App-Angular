import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
    selector: 'app-exam',
    imports: [],
    templateUrl: './exam.html',
    styleUrl: './exam.css'
})
export class Exam implements OnInit{
    examData: any;
    questions: any[] = [];
    userAnswers: string[] | undefined[] = [];

    category: string = '';
    difficulty: string = '';
    nQuestion: number = 0;

    private route = inject(ActivatedRoute);

    constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

    ngOnInit(): void {
        // get query params values
        const snapshot = this.route.snapshot;
        this.category = snapshot.queryParams['category'];
        this.difficulty = snapshot.queryParams['difficulty'];
        this.nQuestion = snapshot.queryParams['nQuestion'];
        const apiUrl: string = 'https://quiz-app-api-lac.vercel.app/api/exams';

        let user: any = this.authService.user;
        
        const userId = user._id;

        const body = {
            categoryId: this.category,
            difficulty: this.difficulty,
            numberOfQuestions: this.nQuestion,
            userId
        }

        this.http.post(apiUrl, body, {
            withCredentials: true
        }).subscribe({
            next: (res: any) => {
                this.examData = res;
                this.questions = this.examData.data.questions;
                this.userAnswers = new Array(this.questions?.length).fill('');
            },
            error: (error: any) => {
                console.error('Errorrr', error);
            }
        })
    }


    submitExam() {
        const newExamId = this.examData?.data?.newExam?._id;
        const gradeExamAPIURL = `https://quiz-app-api-lac.vercel.app/api/exams/grade/${newExamId}`;

        const questionsResponse = [];
        for(let i = 0; i < this.questions.length; ++i) {
            questionsResponse.push({
                questionId: this.questions[i]._id,
                userAns: this.userAnswers[i]
            });
        }

        this.router.navigate(['/grade-exam'], {
            state: {questionsResponse: questionsResponse, apiUrl: gradeExamAPIURL}
        });
    }

    selectAnswer(questionIdx: any, choosenAnswer: any) {
        this.userAnswers[questionIdx] = choosenAnswer;
    }
}
