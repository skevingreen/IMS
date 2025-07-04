import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemService } from '../item.service';
import { Item } from '../item';
import { Category } from '../../category/category';

@Component({
  selector: 'app-item-list-component',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  template: `
    <div class="item-page">
      <h1 class="item-page__title">Item List</h1>

      <!-- form class="form" [formGroup]="itemListForm" (ngSubmit)="onSubmit()" -->
        <div class="item-page__filter-container">
          <select required class="item-page__filter" formControlName="category" id="category" name="category">
            <option value="" disabled>Select Category</option>
            @for(category of categories; track category) {
              <option value="{{ category }}">{{ category }}</option>
            }
          </select>

          <input type="button" (click)="filterItems()" value="Filter Items" class="item-page__filter-button" />
        </div>


        <!-- div class="form__actions" -->
          <!-- button class="button button--primary" type="submit">Filter Items</button -->
        <!-- /div -->
      <!-- /form -->

      <button class="item-page__button" routerLink="/items/add">Add Item</button>

      @if (items && items.length > 0) {
        <table class="item-page__table">
          <thead class="item-page__table-head">
              <tr class="item-page__table-row">
              <th class="item-page__table-header">Item ID</th>
              <th class="item-page__table-header">Category Id</th>
              <th class="item-page__table-header">Supplier Id</th>
              <th class="item-page__table-header">Name</th>
              <th class="item-page__table-header">Description</th>
              <th class="item-page__table-header">Quantity</th>
              <th class="item-page__table-header">Price</th>
              <th class="item-page__table-header">Date Created</th>
              <th class="item-page__table-header">Functions</th>
            </tr>
          </thead>

          <tbody class="item-page__table-body">
            @for (item of items; track item) {
              <tr class="item-page__table-row">
                <td class="item-page__table-cell">{{ item._id }}</td>
                <td class="item-page__table-cell">{{ item.categoryId }}</td>
                <td class="item-page__table-cell">{{ item.supplierId }}</td>
                <td class="item-page__table-cell">{{ item.name }}</td>
                <td class="item-page__table-cell">{{ item.description }}</td>
                <td class="item-page__table-cell">{{ item.quantity }}</td>
                <td class="item-page__table-cell">{{ item.price }}</td>
                <td class="item-page__table-cell">{{ item.dateCreated }}</td>
                <td class="item-page__table-cell item-page table-cell--functions">
                  <a routerLink="/item/{{item._id}}" class="item-page__icon- link"><i class="fas fa-edit"></i></a>
                  <a (click)="deleteItem(item._id)" class="item-page__icon-link"><i class="fas fa-trash-alt"></i></a>
                </td>
              </tr>
            }
          </tbody>
        </table>
      } @else {
        <p class="item-page__no-items">No items found, consider adding one...</p>
      }
    </div>
  `,
  styles: `

    .item-page {
      max-width: 80%;
      margin: 0 auto;
      padding: 20px;
    }

    .item-page__title {
      text-align: center;
      color: #563d7c;
    }

    .item-page__table {
      width: 100%;
      border-collapse: collapse;
    }

    .item-page__table-header {
      background-color: #FFE484;
      color: #000;
      border: 1px solid black;
      padding: 5px;
      text-align: left;
    }

    .item-page__table-cell {
      border: 1px solid black;
      padding: 5px;
      text-align: left;
    }

    .item-page__table-cell--functions {
      text-align: center;
    }

    .item-page__icon-link {
      cursor: pointer;
      color: #6c757d;
      text-decoration: none;
      margin: 0 5px;
    }

    .item-page__icon-link:hover {
      color: #000;
    }

    .item-page__no-items {
      text-align: center;
      color: #6c757d;
    }

    .item-page__button {
      background-color: #563d7c;
      color: #ﬀf;
      border: none;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      margin: 10px 2px;
      cursor: pointer;
      border-radius: 5px
      transition: background-color 0.3s;
    }

    .item-page__button:hover {
      background-color: #6c757d;
    }

    .message-alert {
      padding: 15px;
      margin-bottom: 20px;
      border: 1px solid transparent;
      border-radius: 4px;
      color: #a94442;
      background-color: #f2dede;
      border-color: #ebccd1;
    }

    .message-success {
      padding: 15px;
      margin-bottom: 20px;
      border: 1px solid transparent;
      border-radius: 4px;
      color: #3c763d;
      background-color: #dﬀ0d8;
      border-color: #d6e9c6;
    }

    .message-success { padding: 15px; margin-bottom: 20px;
      border: 1px solid transparent; border-radius: 4px;
      color: #3c763d; background-color: #dﬀ0d8;
      border-color: #d6e9c6;
    }

    /*
    select {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1em;
      transition: border-color 0.3s ease;
      background-color: white;
    }

    .form {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 15px;
      display: flex;
      flex-direction: row;
      gap: 15px;
    }

    .form {
      display: flex;
    }

    .form__group {
      display: flex;
      flex-direction: row;
    }
    */
  `
})
export class ListItemComponent {
  items: Item[] = [];
  categories: Category[] = [];
  serverMessage: string | null = null;
  serverMessageType: 'success' | 'error' | null = null;

  itemListForm = this.fb.group({
    category: ['', Validators.compose([Validators.required])]
  })

  constructor(private itemService: ItemService, private fb: FormBuilder) {
    this.itemService.getItems().subscribe({
      next: (items: Item[]) => {
        this.items = items;
        console.log(`Items: ${JSON.stringify(this.items)}`);
      },
      error: (err: any) => {
        console.error(`Error occurred while retrieving items: ${err}`);
      }
    });
  }

  deleteItem(itemId: string) {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }

    alert("Method has not yet been implemented.\nTry again later.");

    /*
    this.itemService.deleteItem(itemId).subscribe({
      next: () => {
        console.log(`Item with ID ${itemId} deleted successfully`);
        this.items = this.items.filter(i => i.itemId !== itemId);
        this.serverMessageType = 'success';
        this.serverMessage = `Item with ID ${itemId} deleted successfully`;
        this.clearMessageAfterDelay();
      }, error: (err: any) => {
        console.error(`Error occurred while deleting item with ID ${itemId}: ${err}`);
        this.serverMessageType = 'error';
        this.serverMessage = `Error occurred while deleting item with ID ${itemId}. Please try again later.`;
        this.clearMessageAfterDelay();
      }
    });
    */
  }

  /*
  private clearMessageAfterDelay() {
    setTimeout(() => {
      this.serverMessage = null;
      this.serverMessageType = null;
    }, 3000)
  }
  */

  filterItems() {
    alert("Method has not yet been implemented.\nTry again later.");
  }

  onSubmit() {
    alert("Method has not yet been implemented.\nTry again later.");
  }
}
