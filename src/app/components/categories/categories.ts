import { Component, inject, OnInit, signal } from '@angular/core';
import { Category } from '../../utils/types';
import { CategoryService } from '../../services/category-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports:[ReactiveFormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit {
  categories: Category[] = [];
  loading = true;
  error: string | null = null;
  selectedCategory = signal<string | null>(null);
  quizForm!: FormGroup;
  private router = inject(Router);

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.sort(
          (a, b) => Number(b.popularity) - Number(a.popularity)
        );
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
        this.error = 'Failed to load categories. Please try again later.';
        this.loading = false;
      },
    });

    this.quizForm = new FormGroup({
      nQuestion: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(100),
      ]),
      difficulty: new FormControl('easy', [
        Validators.pattern(/^(easy|medium|hard)$/),
      ]),
    });
  }

  openQuizForm(category: string) {
    this.selectedCategory.set(category);
  }

  sendQuizForm(categoryId: string) {
    if (this.quizForm.valid) {
      console.log('Quiz form submitted:', this.quizForm.value);
      this.router.navigate(['/exam'], {
        queryParams: {
          category: categoryId,
          ...this.quizForm.value,
        },
      });
    } else {
      this.quizForm.markAllAsTouched();
    }
  }

  cancelQuizForm() {
    this.selectedCategory.set(null);
    this.quizForm.reset({ nQuestion: '', difficulty: 'any' });
  }
}
