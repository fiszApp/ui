import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Category } from './category';
import { log, print } from 'util';
import { map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CategoryService {

  private getCategoriesUrl = 'http://localhost:8080/categories';
  private getCreateCategoryUrl = 'http://localhost:8080/categories';
  private getDeleteCategoryUrl = 'http://localhost:8080/categories';

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<any>(this.getCategoriesUrl, httpOptions)
      .pipe(
        tap(r => log(r)),
        map(response => <Category[]>JSON.parse(JSON.stringify(response)))
      );
  }

  save(category: Category): Observable<Category> {
    return this.http.post<Category>(this.getCreateCategoryUrl, category, httpOptions)
      .pipe(
        map(response => <Category>JSON.parse(JSON.stringify(response)))
      );
  }

  delete(category: Category): Observable<any> {
    return this.http.delete(this.getDeleteCategoryUrl + '/' + category.id, httpOptions);
  }

}
