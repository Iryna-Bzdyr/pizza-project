import { IBasket } from './basket.inteface';


export interface IOrder {
    orderID: number
    products?: IBasket[],
    city?: string,
    street?: string,
    streetNumber?: string
    clientName?: string,
    clientPhone?: string,
    deliveryTime?: string,
    coment?: string,
    orderSum?:number
}