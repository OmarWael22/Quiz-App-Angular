import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

    constructor(private http: HttpClient, private router: Router) {}

    ngOnInit(): void {
        // get query params values
        const snapshot = this.route.snapshot;
        this.category = snapshot.queryParams['category'];
        this.difficulty = snapshot.queryParams['difficulty'];
        this.nQuestion = snapshot.queryParams['nQuestion'];
        const apiUrl: string = 'https://quiz-app-api-lac.vercel.app/api/exams';

        console.log('snapshot', snapshot);

        const body = {
            categoryId: this.category,
            difficulty: this.difficulty,
            numberOfQuestions: this.nQuestion
        }

        this.http.post(apiUrl, body, {
            withCredentials: true
        }).subscribe({
            next: (res: any) => {
                console.log('Exam created successfully', res);
                this.examData = res;
                console.log('this.examData', this.examData);
                this.questions = this.examData.data.questions;
                console.log('this.questions', this.questions);
                this.userAnswers = new Array(this.questions?.length).fill('');
                console.log('this.userAnswers', this.userAnswers);
            },
            error: (error: any) => {
                console.error('Errorrr', error);
            }
        })
    }


    submitExam() {
        const newExamId = this.examData?.data?.newExam?._id;
        console.log('newExamId', newExamId);
        const gradeExamAPIURL = `https://quiz-app-api-lac.vercel.app/api/exams/grade/${newExamId}`;
        console.log('gradeExamAPIURL', gradeExamAPIURL);

        const questionsResponse = [];
        for(let i = 0; i < this.questions.length; ++i) {
            questionsResponse.push({
                questionId: this.questions[i]._id,
                userAns: this.userAnswers[i]
            });
        }
        console.log('questionsResponse', questionsResponse);

        this.router.navigate(['/grade-exam'], {
            state: {questionsResponse: questionsResponse, apiUrl: gradeExamAPIURL}
        });
    }

    selectAnswer(questionIdx: any, choosenAnswer: any) {
        // console.log('select', choosenAnswer, questionIdx);
        this.userAnswers[questionIdx] = choosenAnswer;
        // console.log('this.userAnswers', this.userAnswers);
    }
}
