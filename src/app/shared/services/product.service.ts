import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
products: Array<IProduct> = []
private url: string
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/products'
   }
  getProducts(): Array<IProduct> {
    return this.products
  }
  getJSONProduct(): Observable<Array<IProduct>>{
    return this.http.get<Array<IProduct>>(this.url)
  }
  addJSONProducts(product:IProduct): Observable<Array<IProduct>>{
    return this.http.post<Array<IProduct>>(this.url, product)
  }
  deleteJSONProducts(id: number): Observable<Array<IProduct>>{
    return this.http.delete<Array<IProduct>>(`${this.url}/${id}`)
  }
  updateJSONProducts(product:IProduct): Observable<Array<IProduct>>{
    return this.http.put<Array<IProduct>>(`${this.url}/${product.id}`, product)
  }
  getJSONOneProduct(id:number):Observable<IProduct>{
    return this.http.get<IProduct>(`${this.url}/${id}`)
  } 
}
