import { CategoryService } from './../../shared/services/category.service.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { Category } from 'src/app/shared/classes/category.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  categoriesAdmin: Array<ICategory> = []
  categoryName: string = ''
  category: ICategory

  categoryForm = new FormGroup({
    categoryName: new FormControl('', [Validators.required])
  })

  modalRef: BsModalRef;
  constructor(private categoryService: CategoryService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getAdminCategories()
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.categoryName = ''
  }
 
  private getAdminCategories(): void {
    this.categoryService.getJSONCategory().subscribe(
      data => {
        this.categoriesAdmin = data
      },
      err => {
        console.log(err)
      }
    )
  }
  addCategory(): void {
    const newCategory: ICategory = new Category(
      1,
      this.categoryName
    )
    if (this.categoriesAdmin.length > 0) {
      newCategory.categoryID = this.categoriesAdmin.slice(-1)[0].categoryID + 1;
    }
    this.categoryService.addJSONPCategory(newCategory).subscribe(
      () => {
        this.getAdminCategories();
      } 
    );
    this.modalRef.hide() 
    this.resetForm()
  }
 
  resetForm():void{
    this.categoryName = ''
    this.categoryForm.markAsUntouched()
  }
}
