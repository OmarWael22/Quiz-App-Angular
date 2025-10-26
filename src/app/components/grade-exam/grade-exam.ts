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
    isLoading: boolean = true;

    constructor(private gradeExamService: GradeExamService, private router: Router) {
        const navigation = this.router.getCurrentNavigation();
        const state = navigation?.extras?.state;
        this.questionsBody = state?.['questionsResponse'];
        this.apiUrl = state?.['apiUrl'];
    }

    ngOnInit(): void {
        this.gradeExamService.gradeExam(this.apiUrl, this.questionsBody).subscribe({
            next:(res) => {
                this.gradeData = res.data;
                this.isLoading = false;
            },
            error: (err) => {
                console.error('grade exam error', err);
                this.isLoading = false;
            }
        })
    }

}
