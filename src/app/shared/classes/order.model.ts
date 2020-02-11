import { IOrder } from './../interfaces/order.interface';
import { IBasket } from '../interfaces/basket.inteface';

export class Order implements IOrder {
    constructor(
        public orderID: number,
        public products?: IBasket[],

        public city?: string,
        public street?: string,
        public streetNumber?: string,
        public clientName?: string,
        public clientPhone?: string,
        public deliveryTime?: string,
        public coment?: string,
        public orderSum?:number
    ) { }
}