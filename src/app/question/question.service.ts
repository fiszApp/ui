import { Injectable } from '@angular/core';
import { log, print } from 'util';
import { map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Question, CreateQuestion, EditQuestion } from './question';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class QuestionService {

  private getQuestionUrl = 'http://localhost:8080/questions';

  constructor(private http: HttpClient) {
  }

  getQuestions(categoryId: number): Observable<Question[]> {
    return this.http.get<any>(this.getQuestionUrl + '/byCategory/' + categoryId, httpOptions)
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
    return this.http.post<Question>(this.getQuestionUrl, question, httpOptions)
      .pipe(
        map(response => <Question>JSON.parse(JSON.stringify(response)))
      );
  }

  delete(question: Question): Observable<any> {
    return this.http.delete(this.getQuestionUrl + '/' + question.id, httpOptions);
  }


  getQuestion(id: number): Observable<Question> {
    return this.http.get<any>(this.getQuestionUrl + '/' + id, httpOptions)
      .pipe(
        map(response => <Question>JSON.parse(JSON.stringify(response)))
      );
  }

  editQuestion(id: number, request: EditQuestion): Observable<any> {
    return this.http.put<any>(this.getQuestionUrl + '/' + id, request, httpOptions);
  }

}
