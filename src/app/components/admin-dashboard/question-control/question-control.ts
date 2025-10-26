import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuestionService } from '../../../services/question-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category, Question } from '../../../utils/types';
import { CategoryService } from '../../../services/category-service';

@Component({
  selector: 'app-question-control',
  imports: [ReactiveFormsModule],
  templateUrl: './question-control.html',
  styleUrl: './question-control.css'
})
export class QuestionControl {
    private questionService = inject(QuestionService);
    private categoryService = inject(CategoryService);
    private fb = inject(FormBuilder);
    private modalService = inject(NgbModal);

    questions: Question[] = [];
    categories: Category[] = [];
    loading = true;
    error: string | null = null;

    questionForm!: FormGroup;
    editingQuestion: Question | null = null;

    ngOnInit(): void {
        this.loadCategories();
        this.loadQuestions();
        this.questionForm = this.fb.group({
        description: ['', [Validators.required]],
        choice1: ['', [Validators.required]],
        choice2: ['', [Validators.required]],
        choice3: ['', [Validators.required]],
        choice4: ['', [Validators.required]],
        correctChoice: ['', [Validators.required]],
        difficulty: ['easy', [Validators.pattern(/^(easy|medium|hard)$/),Validators.required]],
        categoryId: ['', [Validators.required]],
        });
    }

    loadQuestions() {
        this.loading = true;
        this.questionService.getCategories().subscribe({
        next: (data) => {
                this.questions = data;
            this.loading = false;
        },
        error: (err) => {
            console.error(err);
            this.error = 'Failed to load questions';
            this.loading = false;
        },
        });
    }
    loadCategories() {
        this.loading = true;
        this.categoryService.getCategories().subscribe({
        next: (data) => {
                this.categories = data;
                this.loading = false;
        },
        error: (err) => {
            console.error(err);
            this.error = 'Failed to load questions';
            this.loading = false;
        },
        });
    }
    getCategoryName(id: string) {
        return this.categories.find((cat)=> cat._id === id)?.name
    }

    openAddModal(content: any) {
        this.editingQuestion = null;
        this.questionForm.reset({
            difficulty: 'easy',
            categoryId : ''
        });
        this.modalService.open(content, { centered: true });
    }

    openEditModal(content: any, category: any) {
        this.editingQuestion = category;
        category['choice1'] = category.choices[0];
        category['choice2'] = category.choices[1];
        category['choice3'] = category.choices[2];
        category['choice4'] = category.choices[3];
        // delete category.choices;
        this.questionForm.patchValue(category);
        this.modalService.open(content, { centered: true });
    }

    saveCategory(modalRef: any) {
        if (this.questionForm.invalid) {
        this.questionForm.markAllAsTouched();
        return;
        }

        const formData = this.questionForm.value;
        formData['choices'] = [formData.choice1, formData.choice2, formData.choice3, formData.choice4];
        delete formData.choice1;
        delete formData.choice2;
        delete formData.choice3;
        delete formData.choice4;

        if (this.editingQuestion) {
        // Update existing category
        this.questionService.updateQuestion(this.editingQuestion._id, formData).subscribe({
            next: () => {
                //this.loadQuestions();
                this.questions = this.questions.map(cat => cat._id === this.editingQuestion?._id ? {_id : cat._id,...formData} : cat)
                modalRef.close();
            },
        });
        } else {
        // Add new category
        this.questionService.addQuestion(formData).subscribe({
            next: ({data}) => {
                const { createdAt , updatedAt , __v , ...QuestionData } = data
            // this.loadQuestions();
                this.questions = [...this.questions, QuestionData];
            modalRef.close();
            },
        });
        }
    }

    deleteCategory(id: string) {
        this.questionService.deleteQuestion(id).subscribe({
            next: () => {
                this.questions = this.questions.filter(cat => cat._id !== id)
                //this.loadQuestions(),
            }

        });

    }
}
