import { CategoryService } from './../category.service';
import { Category } from './../category';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css']
})
export class CategoryNewComponent implements OnInit {

  public backendCallInProgress = false;

  public newCategory: Category;

  public newCategoryFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private router: Router) { }

  ngOnInit() {
    this.newCategory = {};

    this.newCategoryFormGroup = this.fb.group({
      name: [this.newCategory['name'], Validators.compose([Validators.minLength(2), Validators.required])],
      description: [this.newCategory['description'], Validators.compose([Validators.minLength(2), Validators.required])]
    });
  }

  isDisabled(): boolean {
    return this.newCategoryFormGroup.invalid;
  }

  saveCategory(): void {
    this.backendCallInProgress = true;
    this.categoryService.save(this.newCategoryFormGroup.value).subscribe(category => {
      this.newCategory = category;
      this.backendCallInProgress = false;
      this.router.navigateByUrl('/categories');
    });
  }

}
