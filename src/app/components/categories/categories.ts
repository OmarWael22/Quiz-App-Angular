import { Component, OnInit } from '@angular/core';
import { Category } from '../../utils/types';
import { CategoryService } from '../../services/category-service';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class Categories implements OnInit {
  categories: Category[] = []
  loading: boolean = true;
  error: string | null = null;
  constructor(private categoryService: CategoryService) {
  }
  ngOnInit(): void {
    // fetch categories from api
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.sort((a,b)=>(Number(b.popularity)- Number(a.popularity)))
        this.loading = false;
      },
      error: (err) => {
        console.log("Error fetching categories: ", err);
        this.error = 'Failed to load categories. Please try again later.';
        this.loading = false;
      }
    })
  }

}
