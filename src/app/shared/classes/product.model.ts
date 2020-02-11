import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { IProduct } from '../interfaces/product.interface';

export class Product implements IProduct, ICategory{
    constructor(
        public id:number,
        public categoryID:number,
        public categoryName:string,
        public name:string,
        public description:string,
        public weight:string,
        public price:number,
        public image:string,
        public discount: boolean,
        public discountPrice?:number,
        public size?:string
    ){}
}

