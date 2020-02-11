import { OrderService } from './../../shared/services/order.service';
import { IOrder } from './../../shared/interfaces/order.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})

export class AdminOrdersComponent implements OnInit {
  orderAdmin:Array<IOrder> = []
  productList:Array<any>=[]
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.getAdminOrders()
  }
  private getAdminOrders(): void {
    this.orderService.getJSONOrder().subscribe(
      data=>{
        this.orderAdmin = data
      },
      err => {
        console.log(err)
      }
    )
    }


}
