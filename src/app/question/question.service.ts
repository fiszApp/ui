import { Injectable } from '@angular/core';
import { log, print } from 'util';
import { map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Question, CreateQuestion } from './question';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class QuestionService {

  private getQuestionUrl = 'http://localhost:8080/questions';
  private getCreateQuestionUrl = 'http://localhost:8080/questions';
  private getDeleteQuestionUrl = 'http://localhost:8080/questions';

  constructor(private http: HttpClient) {
  }

  getQuestions(categoryId: number): Observable<Question[]> {
    return this.http.get<any>(this.getQuestionUrl + '/' + categoryId, httpOptions)
      .pipe(
        tap(r => log(r)),
        map(response => <Question[]>JSON.parse(JSON.stringify(response)))
      );
  }

  getAllQuestions(): Observable<Question[]> {
    return this.http.get<any>(this.getQuestionUrl, httpOptions)
      .pipe(
        tap(r => log(r)),
        map(response => <Question[]>JSON.parse(JSON.stringify(response)))
      );
  }

  save(question: CreateQuestion): Observable<Question> {
    return this.http.post<Question>(this.getCreateQuestionUrl, question, httpOptions)
      .pipe(
        map(response => <Question>JSON.parse(JSON.stringify(response)))
      );
  }

  delete(question: Question): Observable<any> {
    return this.http.delete(this.getDeleteQuestionUrl + '/' + question.id, httpOptions);
  }

}
