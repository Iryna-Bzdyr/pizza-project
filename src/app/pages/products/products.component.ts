import { Basket } from './../../shared/classes/basket.model';
import { ProductService } from 'src/app/shared/services/product.service';
import { Component, OnInit, Inject } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AosToken } from '../../aos';
import { IBasket } from 'src/app/shared/interfaces/basket.inteface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products:Array<IProduct> = []
  productBasket:Array<IBasket> = []
  count:number
  productIndex:number
  sum:number
  constructor(private prs:ProductService , 
              private route: ActivatedRoute,
              private router: Router,
              @Inject(AosToken) aos) {
                aos.init();
                this.router.events.subscribe(event => {
                  if (event instanceof NavigationEnd) {
                    this.getProducts();
                  }
              });
            }


  ngOnInit() {
    this.getProducts
    console.log(localStorage.length)
  }

addProduct(product:IProduct){
  // debugger
  this.count = 1
  if (product.discountPrice>0){
    this.sum = product.discountPrice * this.count
    
  }
  else{
    this.sum = product.price * this.count
   
  }
  const newBacketProduct:IBasket = new Basket(
    product.name,
    product.id,
    product.price,
    this.count,
    product.image,
    product.discountPrice, 
    this.sum   
  )
  
   if(localStorage.length>0&&localStorage.getItem('productBasket')){
     this.productBasket = JSON.parse(localStorage.getItem('productBasket'))
     this.findIndex(product.id)
     if(this.productIndex>=0){
      this.productBasket[this.productIndex].orderProductsCount = this.productBasket[this.productIndex].orderProductsCount + 1 
      if (this.productBasket[this.productIndex].orderProductsDiscountPrice>0){
        this.productBasket[this.productIndex].orderProductsSum =  this.productBasket[this.productIndex].orderProductsDiscountPrice* this.productBasket[this.productIndex].orderProductsCount
      }
      else{
        this.productBasket[this.productIndex].orderProductsSum =  this.productBasket[this.productIndex].orderProductsPrice* this.productBasket[this.productIndex].orderProductsCount
      }   
     }
    else{
      this.productBasket.push(newBacketProduct)
    }
   }
   else{
    if (product.discountPrice>0){
      this.sum = product.discountPrice * this.count
    }
    else{
      this.sum = product.price * this.count
    }
    this.productBasket.push(newBacketProduct)
   
   }  
   localStorage.setItem('productBasket',JSON.stringify(this.productBasket))
}
findIndex(id:number) {
  this.productIndex = this.productBasket.findIndex(index => index.orderProductsID === id)
  return this.productIndex 
}

  private getProducts(): void {
    const category = this.route.snapshot.paramMap.get('category')
    this.prs.getJSONProduct().subscribe(
      data => {
        this.products = data.filter(p=> p.categoryName===category);        
      },
      err => {
        console.log(err);
      }
    );
  }
}

