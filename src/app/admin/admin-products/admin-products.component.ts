
import { CategoryService } from './../../shared/services/category.service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/classes/product.model';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import {Sort} from '@angular/material/sort';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { database } from 'firebase';
// import {AngularFireDatabaseModule}




@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  productsAdmin: Array<IProduct> = [];
  categoriesAdmin: Array<ICategory>=[]
  productName: string;
  productDescription: string;
  productWeight: string;
  productPrice: number;
  productID: number;
  productImage:string
  editStatus: boolean;
  selectedCategory: string;
  productDiscount:boolean = false;
  productDiscontPrice:number = null
  productIndex:number;
  productSize:string
  
  step:number = 0


  productForm = new FormGroup({
    selectedCategory:  new FormControl ('',[ Validators.required]),
    productName:  new FormControl ('',[ Validators.required]),
    productDescription:  new FormControl ('',[ Validators.required]),
    productWeight:  new FormControl ('',[ Validators.required]),
    productPrice:  new FormControl ('',[ Validators.required]),
    productSize:  new FormControl ('',),
    // productImage:  new FormControl ('',[ Validators.required]),
  })

  sortedData: IProduct[]
 ;

 // Upload image variables
 ref: AngularFireStorageReference;
 task: AngularFireUploadTask;
 uploadState: Observable<string>;
 uploadProgress: Observable<number>;
 downloadURL: Observable<string>;

 


  constructor(private productsService: ProductService, private categoryService: CategoryService, private afStorage: AngularFireStorage) {
    this.sortedData  = this.productsAdmin.slice();
   }

  ngOnInit() {
    this.getAdminProducts();
    this.getAdminCategories();
    this.step = 1
   
   
  }
  
  /*------------------------------------------------*/
  






  private getAdminCategories(): void {
    this.categoryService.getJSONCategory().subscribe(
      data=>{
        this.categoriesAdmin = data
      },
      err => {
        console.log(err)
      }
    )
    }

  private getAdminProducts(): void {
    
    this.productsService.getJSONProduct().subscribe(
      data => {
        this.productsAdmin = data;
        this.sortData({active: 'categoryName', direction: 'asc'})
      },
      err => {
        console.log(err);
      }
    );
  }

  addProduct(): void {
    const newProduct: IProduct = new Product(
      1,
      1,
      this.selectedCategory,
      this.productName,
      this.productDescription,
      this.productWeight,
      this.productPrice,
      this.productImage,
      this.productDiscount,
      this.productDiscontPrice,
      this.productSize  
    );
    
    if (this.productsAdmin.length > 0) {
      const id = this.productsAdmin.slice(-1)[0].id + 1;
      newProduct.id = id;
    }
    if (this.editStatus) {
    
      newProduct.id = this.productID;
      this.productsService.updateJSONProducts(newProduct).subscribe(
        () => {
          this.getAdminProducts();
        }
      );
    } 
    else {
      this.productsService.addJSONProducts(newProduct).subscribe(
        () => {
          this.getAdminProducts();
        }
      );
    }

    this.resetForm();
    this.editStatus = false;
    this.step = 1
    this.setStep(1)
  }

  deleteProduct(product: IProduct): void {
    this.productsService.deleteJSONProducts(product.id).subscribe(
      () => {
        this.getAdminProducts();
      }
    );
  }

  editProduct(product: IProduct, step:number): void { 
    this.productName = product.name;
    this.productDescription = product.description;
    this.productWeight = product.weight;
    this.productPrice = product.price;
    this.productID = product.id;
    this.selectedCategory = product.categoryName
    this.editStatus = true;
    this.productSize = product.size
    this.setStep(step)
    
  }

  setStep(index: number) {
    this.step = index;
    console.log(index)
  }
  
  resetForm(): void {
    this.productName = '';
    this.productDescription = '';
    this.productWeight = '';
    this.productPrice = null;
    this.selectedCategory = ''
    this.productForm.markAsUntouched()
  }

  onChange(event: any, index:number, productCheck: { checked: boolean; }, product: IProduct) {
  
  productCheck.checked = productCheck.checked
  this.findIndex(index)
  this.productsAdmin[this.productIndex].discount = productCheck.checked

    if(!this.productsAdmin[this.productIndex].discount){
    this.productsAdmin[this.productIndex].discountPrice = null
  }
  this.productDiscontPrice=null
  this.productsService.updateJSONProducts(this.productsAdmin[this.productIndex]).subscribe(
    () => {
      this.getAdminProducts();
    }
  );
} 

onChangePrise(event:any, index:number,   product: IProduct){

  this.findIndex(index)
  
  // this.productsAdmin[this.productIndex].discountPrice = productChange.productDiscontPrice
  this.productsService.updateJSONProducts(this.productsAdmin[this.productIndex]).subscribe(
    () => {
      this.getAdminProducts();
    }
  );
}

   findIndex(id:number) {
    this.productIndex = this.productsAdmin.findIndex(index => index.id === id)
    return this.productIndex 
  }

    sortData(sort: Sort) {
    const data = this.productsAdmin.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return ;
    }
    
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'categoryName': return compare(a.categoryName, b.categoryName, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'description': return compare(a.description, b.description, isAsc);
        case 'weight': return compare(a.weight, b.weight, isAsc);
        case 'price': return compare(a.price, b.price, isAsc);
        case 'discount': return compare(a.price, b.price, isAsc);
        default: return 0;
      }
    });
  }

  public upload(event: any): void {
   
    const file = event.target.files[0];
    const filePath = `images/${this.createUUID()}.${file.type.split('/')[1]}`;
    this.task = this.afStorage.upload(filePath, file);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
   
    
    this.task.snapshotChanges()
    .pipe(finalize(() => this.downloadURL = this.afStorage.ref(filePath).getDownloadURL()))
    .subscribe();
    this.task.then((e) => {
      this.afStorage.ref(`images/${e.metadata.name}`).getDownloadURL().subscribe(data => {
        this.productImage = data;
      return this.productImage
      
      });
    });
  }

  
 deleteEl():void{
  this.afStorage.storage.refFromURL(this.productImage).delete()
  document.getElementById('alert').innerHTML = 'File was deleted'
 }
  
  public createUUID(): string {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // tslint:disable-next-line:no-bitwise
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      // tslint:disable-next-line:no-bitwise
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}