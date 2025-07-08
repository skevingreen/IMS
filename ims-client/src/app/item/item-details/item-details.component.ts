import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ItemService } from '../item.service';
import { Item, UpdateItemDTO } from '../item';
import { Category } from '../../category/category';
import { Supplier } from '../../supplier/supplier';
import { CategoryService } from '../../category/category.service';
import { SupplierService } from '../../supplier/supplier.service';
@Component({
  selector: 'app-item-details', standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  template: `
    <div class="item-details-page">
      <h1 class="item-details-page__title">Item Details</h1>
      <h4 class="item-details-page__subtitle">Explore the detailed information about your selected item, including its category and supplier.</h4>

      <div class="item-details-page__card">
        <form [formGroup]="itemForm" class="item-details-page__form">
          <div class="item-details-page__form-group">
            <label for="category" class="item-details-page__form-label">Category</label>
            <select id="category" class="item-details-page__form-control" formControlName="category">
               @for(category of categories; track category) {
                  <option value="{{ category.categoryId }}">{{ category.categoryName }}</option>
                }
            </select>
          </div>

          <div class="item-details-page__form-group">
            <label for="supplier" class="item-details-page__form-label">Supplier</label>
            <select id="supplier" class="item-details-page__form-control" formControlName="supplier">
               @for(supplier of suppliers; track supplier) {
                  <option value="{{ supplier.supplierId }}">{{ supplier.supplierName }}</option>
                }
            </select>
          </div>

          <div class="item-details-page__form-group">
            <label for="name" class="item-details-page__form-label">Name</label>
            <input type="text" id="name" class="item-details-page__form-control" formControlName="name">
          </div>

          <div class="item-details-page__form-group">
            <label for="description" class="item-details-page__form-label">Description</label>
            <input type="text" id="description" class="item-details-page__form-control" formControlName="description">
          </div>

          <div class="item-details-page__form-group">
            <label for="quantity" class="item-details-page__form-label">Quantity</label>
            <input type="text" id="quantity" class="item-details-page__form-control" formControlName="quantity">
          </div>

          <div class="item-details-page__form-group">
            <label for="price" class="item-details-page__form-label">Price</label>
            <input type="text" id="price" class="item-details-page__form-control" formControlName="price">
          </div>

          <button type="submit" (click)="onSubmit()" class="item-details-page__btn">Save Changes</button>
        </form>
      </div>

      <br />
      <a class="item-details-page__link" routerLink="/items">Return</a>
    </div>
  `,
  styles: `
    select {
      border: 1px solid rgb(112, 177, 247);
      color: rgb(112, 177, 247);
      background-color: #FFF;
      width: 10%;
    }

    .item-page__icon-link:hover {
      color: rgb(28, 11, 153);
    }

    .item-details-page {
      max-width: 80%;
      margin: 0 auto;
      padding: 20px;
    }

    .item-details-page__title {
      text-align: center;
      color: rgb(112, 177, 247);
    }

    .item-details-page__subtitle {
      text-align: center;
      color: rgb(112, 177, 247);;
      font-size: 0.9rem;
      font-style: italic;
      margin-bottom: 20px;
    }

    .item-details-page__form {
      display: ﬂex;
      ﬂex-direction: column;
    }

    .item-details-page__form-group {
      margin-bottom: 15px;
    }

    .item-details-page__form-label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: rgb(112, 177, 247);
    }

    .item-details-page__form-control {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
      color: rgb(112, 177, 247);
    }

    .item-details-page__btn {
      padding: 10px 15px;
      background-color: rgb(112, 177, 247);
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      align-self: ﬂex-start;
    }

    .item-details-page__btn:hover {
      background-color: rgb(28, 11, 153);
    }

    .item-details-page__link {
      color: rgb(112, 177, 247);
      text-decoration: none;
      display: block;
    }

    .item-details-page__link:hover {
      text-decoration: underline;
    }
  `
})
 export class ItemDetailsComponent {
  categories: Category[] = [];
  suppliers: Supplier[] = [];
  inventoryItemId: string;
  item: Item;
  dateCreated: string = '';

  itemForm: FormGroup = this.fb.group({
    category: [null, Validators.required],
    supplier: [null, Validators.required],
    name: [null, Validators.compose([Validators.required, Validators.minLength(1)])],
    description: [null, Validators.required],
    quantity: [null, Validators.required],
    price: [null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private categoryService: CategoryService,
    private supplierService: SupplierService
  ) {
    this.inventoryItemId = this.route.snapshot.paramMap.get('inventoryItemId') || '';
    this.item = {} as Item;

    this.categoryService.getCategories().subscribe({
      next: (categories: any) => {
        this.categories = categories;
      }
    });

    this.supplierService.getSuppliers().subscribe({
      next: (suppliers: any) => {
        this.suppliers = suppliers;
      }
    });

    if (this.inventoryItemId === '') {
      this.router.navigate(['/items']);
      return;
    }

    this.itemService.getItem(this.inventoryItemId).subscribe({
      next: (item: Item) => {
        //console.log("item-details item.categoryId: " + item.categoryId);
        this.item = item;
        this.dateCreated = item.dateCreated;
        this.itemForm.setValue({
          category: item.categoryId,
          supplier: item.supplierId,
          name: item.name,
          description: item.description,
          quantity: item.quantity,
          price: item.price
        });
      }
    });
  }

  onSubmit() {
    if (this.itemForm.valid) {
      const updateItemDTO = {
        categoryId: parseInt(this.itemForm.controls['category'].value),
        supplierId: parseInt(this.itemForm.controls['supplier'].value),
        name: this.itemForm.controls['name'].value,
        description: this.itemForm.controls['description'].value,
        quantity: this.itemForm.controls['quantity'].value,
        price: this.itemForm.controls['price'].value,
        dateCreated: this.dateCreated,
        dateModified: new Date().toISOString()
      };

      //console.log('Update Item DTO:', updateItemDTO);
      //console.log('this.inventoryId: ' + this.inventoryItemId);
      this.itemService.updateItem(this.inventoryItemId, updateItemDTO).subscribe({
        next: (result: any) => {
          //console.log(`ItemId: ${result.ItemId} ${result.message}`);
          this.router.navigate(['/items']);
        }
      });
    }
  }
}
