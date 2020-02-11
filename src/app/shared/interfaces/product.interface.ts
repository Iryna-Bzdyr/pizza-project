
export  interface IProduct {
    id:number,
    categoryID:number,
    categoryName:string,
    name:string,
    description:string,
    weight:string,
    price:number,
    image:string,
    discount: boolean,
    discountPrice?: number,
    size?:string
}
