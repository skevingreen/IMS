import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ItemService } from '../item.service';
import { Item } from '../item';

@Component({
  selector: 'app-item-details', standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  template: `
    <!--
    <div class="item-details-page">
      <h1 class="item-details-page title">Item Details</h1>
      <h4 class="item-details-page subtitle">Explore the detailed information about your selected item, including its category and supplier.</h4>

      <div class="item-details-page__card">
        <form [formGroup]="itemForm" class="item-details-page__form">
          <div class="item-details-page__form-group">
            <label for="category" class="item-details-page form-label">Category</label>
            <select id="category" class="item-details-page form-control" formControlName="category">
               @for(category of categories; track category) {
                  <option value="{{ category }}">{{ category }}</option>
                }
            </select>
          </div>

          <div class="item-details-page__form-group">
            <label for="supplier" class="item-details-page form-label">Supplier</label>
            <select id="supplier" class="item-details-page form-control" formControlName="supplier">
               @for(supplier of suppliers; track supplier) {
                  <option value="{{ supplier }}">{{ supplier }}</option>
                }
            </select>
          </div>

          <div class="item-details-page__form-group">
            <label for="name" class="item-details-page__form-label">Name/label>
            <input type="text" id="name" class="item-details-page__form-control" formControlName="name">
          </div>

          <div class="item-details-page__form-group">
            <label for="description" class="item-details-page__form-label">Description/label>
            <input type="text" id="description" class="item-details-page__form-control" formControlName="description">
          </div>

          <div class="item-details-page__form-group">
            <label for="quantity" class="item-details-page__form-label">Quantity/label>
            <input type="text" id="quantity" class="item-details-page__form-control" formControlName="quantity">
          </div>

          <div class="item-details-page__form-group">
            <label for="price" class="item-details-page__form-label">Price/label>
            <input type="text" id="price" class="item-details-page__form-control" formControlName="price">
          </div>

          <button type="submit" class="item-details-page__btn">Save Changes</button>
        </form>
      </div>

      <br />
      <a class="item-details-page__link" routerLink="/items">Return</a>
    </div>
    -->
  `,
  styles: `
  `
})
 export class ItemDetailsComponent {
  inventoryItemId: string;
  item: Item;

  itemForm: FormGroup = this.fb.group({
    category: [null, Validators.required],
    supplier: [null, Validators.required],
    name: [null, Validators.compose([Validators.required, Validators.minLength(1)])],
    description: [null, Validators.compose([Validators.required, Validators.minLength(1)])],
    quantity: [null, Validators.compose([Validators.required, Validators.minLength(1)])],
    price: [null, Validators.compose([Validators.required, Validators.minLength(1)])]
  });

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private itemService: ItemService) {
    this.inventoryItemId = this.route.snapshot.paramMap.get('inventoryItemId') || '';
    this.item = {} as Item;

    if (this.inventoryItemId === '') {
      this.router.navigate(['/items']);
      return;
    }

    this.itemService.getItem(this.inventoryItemId).subscribe({
      next: (item: Item) => {
        this.item = item; this.itemForm.setValue({
          name: item.categoryId,
          type: item.supplierId,
          status: item.name,
          description: item.description,
          quantity: item.quantity,
          price: item.price
        });
      }
    });
  }
}
