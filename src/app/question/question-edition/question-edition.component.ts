import { CategoryService } from './../../category/category.service';
import { QuestionService } from './../question.service';
import { Question, CreateQuestion, EditQuestion } from './../question';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Category } from '../../commons/category/category';

@Component({
  selector: 'app-question-edition',
  templateUrl: './question-edition.component.html',
  styleUrls: ['./question-edition.component.css']
})
export class QuestionEditionComponent implements OnInit {

  public backendCallInProgress = false;

  public request: EditQuestion;

  public editQuestionFormGroup: FormGroup;

  public categories: Category[] = [];

  private questionId: number;

  constructor(private fb: FormBuilder, private questionService: QuestionService, private router: Router, private route: ActivatedRoute,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.questionId = +this.route.snapshot.paramMap.get('questionId');
    this.setCategories();
    this.setData({ answer: '', question: '', category: null });
    this.getQuestion();
  }

  getQuestion() {
    this.questionService.getQuestion(this.questionId).subscribe(question => {
      this.setData(question);
      this.backendCallInProgress = false;
    });
  }

  setData(question: Question) {
    this.request = {
      answer: question.answer,
      question: question.question,
      categoryId: question.category != null ? question.category.id : null
    };

    this.editQuestionFormGroup = this.fb.group({
      question: [this.request['question'], Validators.compose([Validators.minLength(2), Validators.required])],
      answer: [this.request['answer'], Validators.compose([Validators.minLength(2), Validators.required])],
      categoryId: [this.request['categoryId'], Validators.required]
    });
  }

  private setCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  isDisabled(): boolean {
    return this.editQuestionFormGroup.invalid;
  }

  editQuestion(): void {
    this.backendCallInProgress = true;
    this.questionService.editQuestion(this.questionId, this.editQuestionFormGroup.value).subscribe(category => {
      this.backendCallInProgress = false;
      this.router.navigateByUrl('/questions/' + this.editQuestionFormGroup.value['categoryId']);
    });
  }

}
