import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GradeExamService } from '../../services/grade-exam-service';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-grade-exam',
  imports: [NgClass, DatePipe, RouterLink],
  templateUrl: './grade-exam.html',
  styleUrl: './grade-exam.css'
})
export class GradeExam implements OnInit{
    questionsBody: any[] = [];
    apiUrl: string = '';
    gradeData: any;

    constructor(private gradeExamService: GradeExamService, private router: Router) {
        const navigation = this.router.getCurrentNavigation();
        const state = navigation?.extras?.state;
        console.log('state', state);
        this.questionsBody = state?.['questionsResponse'];
        console.log('this.questionsBody', this.questionsBody);
        this.apiUrl = state?.['apiUrl'];
        console.log('this.apiUrl', this.apiUrl);
    }

    ngOnInit(): void {
        this.gradeExamService.gradeExam(this.apiUrl, this.questionsBody).subscribe({
            next:(res) => {
                console.log('res this.gradeExamService', res);
                this.gradeData = res.data;
            },
            error: (err) => {
                console.error('grade exam error', err);
            }
        })
    }

}
