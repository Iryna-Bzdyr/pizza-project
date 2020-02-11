export interface IBasket {
    orderProductsName: string,
    orderProductsID: number,
    orderProductsPrice: number,
    orderProductsCount: number,
    orderImage?:string,
    orderProductsDiscountPrice?: number,
    orderProductsSum?:number
}