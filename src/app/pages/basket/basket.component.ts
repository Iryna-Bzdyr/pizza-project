import { Order } from './../../shared/classes/order.model';
import { IOrder } from './../../shared/interfaces/order.interface';
import { OrderService } from './../../shared/services/order.service';
import { Product } from 'src/app/shared/classes/product.model';
import { Component, OnInit, TemplateRef  } from '@angular/core';
import { IBasket } from 'src/app/shared/interfaces/basket.inteface';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  productBasket:Array<IBasket> = []
  ordersAdmin: Array<IOrder> = [];
  sumArr = []
  orderSum:number
  productIndex:number
  modalRef: BsModalRef;
  items: any[];

  deliveryForm = new FormGroup({
    // orderID:  new FormControl ('',[ Validators.required]),
    city:  new FormControl ('Львів',[ Validators.required]),
    street:  new FormControl ('',[ Validators.required]),
    streetNumber:  new FormControl ('',[ Validators.required]),
    clientName:  new FormControl ('',[ Validators.required]),
    clientPhone:  new FormControl ('',[ Validators.required]),
    deliveryTime:  new FormControl ('',),
    coment:  new FormControl ('',),
  })




  constructor(private modalService: BsModalService, private orderService: OrderService) {
    this.items = Array(15).fill(0);
   }
  



  ngOnInit() {
    this.productBasket = JSON.parse(localStorage.getItem('productBasket'))
    this.getSum()
    this.getOrders
    // console.log(this.deliveryForm.controls.city.value)
  }

  private getOrders(): void {
    
    this.orderService.getJSONOrder().subscribe(
      data => {
        this.ordersAdmin = data;
      
      },
      err => {
        console.log(err);
      }
    );
  }


  addOrders(): void {
    const newOrder: IOrder = new Order(
      1,
      this.productBasket,
      this.deliveryForm.controls.city.value,
      this.deliveryForm.controls.street.value,
      this.deliveryForm.controls.streetNumber.value,
      this.deliveryForm.controls.clientName.value,
      this.deliveryForm.controls.clientPhone.value,
      this.deliveryForm.controls.deliveryTime.value,
      this.deliveryForm.controls.coment.value,
      this.orderSum

    );
    if (this.ordersAdmin.length > 0) {
      const id = this.ordersAdmin.slice(-1)[0].orderID + 1;
      newOrder.orderID = id;
    }
    this.orderService.addJSONOrder(newOrder).subscribe(
            () => {
              this.getOrders();
            }
          );
    localStorage.clear();
    this.modalRef.hide()
    this.deliveryForm.reset()
    }  




  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
   
  }

getSum():number{
  this.sumArr = this.productBasket.map(p=>p.orderProductsSum)
  this.orderSum = this.sumArr.reduce((a,b)=>a+b)
  return  this.orderSum
}
addProduct(product:IBasket){
  
this.findIndex(product.orderProductsID)
this.productBasket[this.productIndex].orderProductsCount = this.productBasket[this.productIndex].orderProductsCount + 1 
if(this.productBasket[this.productIndex].orderProductsDiscountPrice){
  this.productBasket[this.productIndex].orderProductsSum = this.productBasket[this.productIndex].orderProductsCount * this.productBasket[this.productIndex].orderProductsDiscountPrice
}
else{
  this.productBasket[this.productIndex].orderProductsSum = this.productBasket[this.productIndex].orderProductsCount * this.productBasket[this.productIndex].orderProductsPrice
}
this.getSum()
localStorage.setItem('productBasket',JSON.stringify(this.productBasket))
}

delProduct(product:IBasket){
    this.findIndex(product.orderProductsID)
  if(this.productBasket[this.productIndex].orderProductsCount>1){
    this.productBasket[this.productIndex].orderProductsCount = this.productBasket[this.productIndex].orderProductsCount - 1 
    if(this.productBasket[this.productIndex].orderProductsDiscountPrice){
      this.productBasket[this.productIndex].orderProductsSum = this.productBasket[this.productIndex].orderProductsCount * this.productBasket[this.productIndex].orderProductsDiscountPrice
    }
    else{
      this.productBasket[this.productIndex].orderProductsSum = this.productBasket[this.productIndex].orderProductsCount * this.productBasket[this.productIndex].orderProductsPrice
    }
  }
 else{
  this.productBasket.splice(this.productIndex, 1)
 }
 this.getSum()
  localStorage.setItem('productBasket',JSON.stringify(this.productBasket))
  }

  delAllProduct(product:IBasket){
    this.findIndex(product.orderProductsID)
    this.productBasket.splice(this.productIndex, 1)
    this.getSum()
    localStorage.setItem('productBasket',JSON.stringify(this.productBasket))
  }

findIndex(id:number) {
  this.productIndex = this.productBasket.findIndex(index => index.orderProductsID === id)
  return this.productIndex 
}
}


