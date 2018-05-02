import { CategoryCommonService } from './../../commons/category/category-common.service';
import { QuestionService } from './../question.service';
import { Category } from './../../commons/category/category';
import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../question';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  public backendCallInProgress = false;

  private id?: number;

  public categoryName?: string;

  questions: Question[];

  constructor(private questionService: QuestionService, private route: ActivatedRoute, private router: Router,
    private categoryService: CategoryCommonService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.id = +id;
    }
    this.setQuestions();
    this.setName();
  }

  setQuestions(): void {
    this.backendCallInProgress = true;
    if (this.id != null) {
      this.questionService.getQuestions(this.id)
        .subscribe(questions => {
          this.questions = questions;
          this.backendCallInProgress = false;
        });
    } else {
      this.questionService.getAllQuestions()
        .subscribe(questions => {
          this.questions = questions;
          this.backendCallInProgress = false;
        });
    }
  }

  setName() {
    if (this.id != null) {
      this.categoryService.getCategory(this.id).subscribe(category => {
        this.categoryName = category.name;
      });
    }
  }

  createQuestion(): void {
    if (this.id != null) {
      this.router.navigateByUrl('/question-new/' + this.id);
    } else {
      this.router.navigateByUrl('/question-new');
    }
  }

  deleteQuestion(question: Question): void {
    this.backendCallInProgress = true;
    this.questionService.delete(question).subscribe(answer => {
      setTimeout(30000);
      this.setQuestions();
      setTimeout(30000);
    });
  }

  editQuestion(question: Question): void {
    this.router.navigateByUrl('/question-edit/' + question.id);
  }

}
