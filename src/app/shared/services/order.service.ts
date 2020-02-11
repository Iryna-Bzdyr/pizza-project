import { Order } from './../classes/order.model';
import { Injectable } from '@angular/core';
import { IOrder } from '../interfaces/order.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
orders:Array<IOrder>=[]
private url: string
  constructor(private http:HttpClient) {
    this.url = 'http://localhost:3000/orders'
   }

   getOrder(): Array<IOrder> {
    return this.orders
  }
  getJSONOrder(): Observable<Array<IOrder>>{
    return this.http.get<Array<IOrder>>(this.url)
  }
  addJSONOrder(orders:Order): Observable<Array<IOrder>>{
    return this.http.post<Array<IOrder>>(this.url, orders)
  }
}




