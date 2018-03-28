import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {Category} from './category';
import {log, print} from 'util';
import {map, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class CategoryService {

  private getCategoriesUrl = 'http://localhost:8080/categories';

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<any>(this.getCategoriesUrl, httpOptions)
      .pipe(
        tap(r => log(r)),
        map(response => <Category[]> JSON.parse(JSON.stringify(response)))
      );
  }

}