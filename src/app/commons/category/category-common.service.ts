import { Category } from './category';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class CategoryCommonService {

  private getCategoriesUrl = 'http://localhost:8080/categories';

  constructor(private http: HttpClient) { }

  getCategory(id: number): Observable<Category> {
    return this.http.get<any>(this.getCategoriesUrl + '/' + id, httpOptions)
      .pipe(
        map(response => <Category>JSON.parse(JSON.stringify(response)))
      );
  }
}
