import { ICategory } from './../interfaces/category.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
 categories: Array<ICategory> = [
   {
     categoryID: 1,
     categoryName: "Pizza"
  
   }
 ]
 private url: string
  constructor(private http:HttpClient) {
    this.url = 'http://localhost:3000/category'
   }
   getCategory(): Array<ICategory> {
    return this.categories
  }
  getJSONCategory(): Observable<Array<ICategory>>{
    return this.http.get<Array<ICategory>>(this.url)
  }
  addJSONPCategory(category:ICategory): Observable<Array<ICategory>>{
    return this.http.post<Array<ICategory>>(this.url, category)
  }
  deleteJSONCategory(id: number): Observable<Array<ICategory>>{
    return this.http.delete<Array<ICategory>>(`${this.url}/${id}`)
  }
  updateJSONCategory(category:ICategory): Observable<Array<ICategory>>{
    return this.http.put<Array<ICategory>>(`${this.url}/${category.categoryID}`, category)
  }
}
