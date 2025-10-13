import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category-service';
import { Category } from '../../../utils/types';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-category-control',
        templateUrl: './category-control.html',
    imports: [ReactiveFormsModule],
    styleUrl: './category-control.css'
    })
    export class CategoryControl implements OnInit {
    private categoryService = inject(CategoryService);
    private fb = inject(FormBuilder);
    private modalService = inject(NgbModal);

    categories: Category[] = [];
    loading = true;
    error: string | null = null;

    categoryForm!: FormGroup;
    editingCategory: Category | null = null;

    ngOnInit(): void {
        this.loadCategories();

        this.categoryForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        description: ['', [Validators.required]],
        rating: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
        popularity: ['', [Validators.required, Validators.min(0)]],
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
            this.error = 'Failed to load categories';
            this.loading = false;
        },
        });
    }

    openAddModal(content: any) {
        this.editingCategory = null;
        this.categoryForm.reset();
        this.modalService.open(content, { centered: true });
    }

    openEditModal(content: any, category: Category) {
        this.editingCategory = category;
        this.categoryForm.patchValue(category);
        this.modalService.open(content, { centered: true });
    }

    saveCategory(modalRef: any) {
        if (this.categoryForm.invalid) {
        this.categoryForm.markAllAsTouched();
        return;
        }

        const formData = this.categoryForm.value;

        if (this.editingCategory) {
        // Update existing category
        this.categoryService.updateCategory(this.editingCategory._id, formData).subscribe({
            next: () => {
                //this.loadCategories();
                this.categories = this.categories.map(cat => cat._id === this.editingCategory?._id ? {_id : cat._id,...formData} : cat)
                modalRef.close();
            },
        });
        } else {
        // Add new category
        this.categoryService.addCategory(formData).subscribe({
            next: ({data}) => {
                const { createdAt , updatedAt , __v , ...CategoryData } = data
            // this.loadCategories();
                this.categories = [...this.categories, CategoryData];
                console.log(this.categories);
            modalRef.close();
            },
        });
        }
    }

    deleteCategory(id: string) {
        this.categoryService.deleteCategory(id).subscribe({
            next: () => {
                this.categories = this.categories.filter(cat => cat._id !== id)
                //this.loadCategories(),
            }

        });

    }
}
