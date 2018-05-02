import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Category } from '../category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  public backendCallInProgress = false;

  categories: Category[];

  constructor(private categoryService: CategoryService, private router: Router) {
  }

  ngOnInit() {
    this.setCategories();
  }

  setCategories(): void {
    this.backendCallInProgress = true;
    this.categoryService.getCategories()
      .subscribe(categories => {
        this.categories = categories;
        this.backendCallInProgress = false;
      });
  }

  deleteCategory(category: Category): void {
    this.backendCallInProgress = true;
    this.categoryService.delete(category).subscribe(answer => {
      this.setCategories();
    });
  }

  editCategory(category: Category): void {
    this.router.navigateByUrl('/category-edit/' + category.id);
  }

}
