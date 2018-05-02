import { CategoryService } from './../category.service';
import { Category, EditCategory } from './../category';
import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-category-edition',
  templateUrl: './category-edition.component.html',
  styleUrls: ['./category-edition.component.css']
})
export class CategoryEditionComponent implements OnInit {

  public backendCallInProgress = false;

  public request: EditCategory;

  public editCategoryGroup: FormGroup;

  private categoryId: number;

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.backendCallInProgress = true;
    this.categoryId = +this.activeRoute.snapshot.paramMap.get('categoryId');
    this.setData({ name: '', description: '' });
    this.getCategory();
  }

  getCategory() {
    this.categoryService.getCategory(this.categoryId).subscribe(category => {
      this.setData(category);
      this.backendCallInProgress = false;
    });
  }

  setData(category: Category) {
    this.request = {
      name: category.name,
      description: category.description
    };

    this.editCategoryGroup = this.fb.group({
      name: [this.request['name'], Validators.compose([Validators.minLength(2), Validators.required])],
      description: [this.request['description'], Validators.compose([Validators.minLength(2), Validators.required])]
    });
  }

  isDisabled(): boolean {
    return this.editCategoryGroup.invalid;
  }

  editCategory(): void {
    this.backendCallInProgress = true;
    this.categoryService.editCategory(this.categoryId, this.editCategoryGroup.value).subscribe(category => {
      this.backendCallInProgress = false;
      this.router.navigateByUrl('/categories');
    });
  }
}
