import { IBasket } from './../interfaces/basket.inteface';

export class Basket implements IBasket {
    constructor(
      public  orderProductsName: string,
      public  orderProductsID: number,
      public  orderProductsPrice: number,
      public  orderProductsCount: number,
      public  orderImage?:string,
      public  orderProductsDiscountPrice?: number,
      public  orderProductsSum?:number
    ) { }
}