import { CategoryService } from './../../category/category.service';
import { QuestionService } from './../question.service';
import { Question, CreateQuestion } from './../question';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Category } from '../../commons/category/category';

@Component({
  selector: 'app-question-new',
  templateUrl: './question-new.component.html',
  styleUrls: ['./question-new.component.css']
})
export class QuestionNewComponent implements OnInit {

  public backendCallInProgress = false;

  public newQuestion: CreateQuestion;

  public newQuestionFormGroup: FormGroup;

  public categories: Category[] = [];

  constructor(private fb: FormBuilder, private questionService: QuestionService, private router: Router, private route: ActivatedRoute,
    private categoryService: CategoryService) { }

  ngOnInit() {
    const categoryId = this.route.snapshot.paramMap.get('categoryId');

    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.newQuestion = {};

    if (categoryId != null) {
      this.newQuestion.categoryId = +categoryId;
    }

    this.newQuestionFormGroup = this.fb.group({
      question: [this.newQuestion['question'], Validators.compose([Validators.minLength(2), Validators.required])],
      answer: [this.newQuestion['answer'], Validators.compose([Validators.minLength(2), Validators.required])],
      categoryId: [this.newQuestion['categoryId'], Validators.required]
    });
  }

  isDisabled(): boolean {
    return this.newQuestionFormGroup.invalid;
  }

  saveQuestion(): void {
    this.backendCallInProgress = true;
    this.questionService.save(this.newQuestionFormGroup.value).subscribe(question => {
      this.backendCallInProgress = false;
      this.router.navigateByUrl('/questions/' + question.category.id);
    });
  }

}
