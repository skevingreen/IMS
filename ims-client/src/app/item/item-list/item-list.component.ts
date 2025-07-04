/**
 * Authors: Dua Hasan, Scott Green
 * Date: 4 July 2025
 * File: item-list.component.ts
 * Description: Component to display and change Items.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
//import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../item.service';
import { Item } from '../item';
import { Category } from '../../category/category';

@Component({
  selector: 'app-item-list-component',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  template: `
    <div class="item-page">
      <h1 class="item-page__title">Item List</h1>

      <div class="item-page__filter-container">
        <select [(ngModel)]="filterType" class="item-page__filter">
          <option value="" disabled>All</option>
          @for(category of categories; track category) {
            <option value="{{ category }}">{{ category }}</option>
          }
        </select>

        <input type="button" (click)="filterItems()" value="Filter Items" class="item-page__button" />  <!-- TODO: fix button float for smaller viewport -->
      </div>

      <!-- button class="item-page__button" routerLink="/items">Add Item</button -->
      <input type="button" (click)="filterItems()" value="Add Items" class="item-page__button" />

      @if (items && items.length > 0) {
        <table class="item-page__table">
          <thead class="item-page__table-head">
              <tr class="item-page__table-row">
              <th class="item-page__table-header">Item Id</th>
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
                <td class="item-page__table-cell">{{ item.price }}</td> <!-- TODO: always show cents? -->
                <td class="item-page__table-cell">{{ item.dateCreated }}</td>
                <td class="item-page__table-cell item-page table-cell--functions">
                  <!-- a routerLink="/item/{{item._id}}" class="item-page__icon- link"><i class="fas fa-edit"></i></a -->
                  <a (click)="deleteItem(item._id)" class="item-page__icon-link"><i class="fas fa-edit"></i></a> <!-- TODO: css to center icons? -->
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
    /* TODO: make all hover colors same */
    select {
      width: 90%;
      border: 1px solid rgb(112, 177, 247);
      color: rgb(112, 177, 247);
      background-color: #FFF;
    }

    .item-page {
      max-width: 80%;
      margin: 0 auto; /* top/bottom, right/left */
      padding: 20px;
    }

    .item-page__title {
      text-align: center;
      color:rgb(112, 177, 247);
    }

    .item-page__table {
      margin-top: 3rem;
      width: 98%;
      border-collapse: collapse;
    }

    .item-page__table-header {
      background-color: rgb(112, 177, 247);
      color: #FFF;
      border: 1px solid white;
      padding: 5px;
      text-align: left;
    }

    .item-page__table-cell {
      border: 1px solid rgb(112, 177, 247);
      padding: 5px;
      text-align: left;
      color: rgb(112, 177, 247);
    }

    .item-page__table-cell--functions {
      text-align: center;
    }

    .item-page__icon-link {
      cursor: pointer;
      /*color: #6c757d;*/
      color: rgb(112, 177, 247);
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

    .item-page__filter-container {
      display: ﬂex;
      align-items: center;
      margin-bottom: 0rem;
    }

    .item-page__filter {
      flex: 1;
      padding: 0.5rem;
      margin-right: 0.5rem;
    }

    .item-page__button {
      background-color:rgb(112, 177, 247);
      color: #fff;
      border: none;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      margin: 10px 2px;
      cursor: pointer;
      border-radius: 5px;
      transition: background-color 0.3s;
    }

    .item-page__filter-button:hover {
      background-color: #6c757d;
    }

    .item-page__highlight-info { text-align: center;
      color: #6c757d;
      margin-bottom: 1rem;
    }
  `
})
export class ItemListComponent {
  // TODO: Add comments
  // TODO: Add validators
  items: Item[] = [];
  categories: Category[] = [];
  filterType: string  = '';
  serverMessage: string | null = null;
  serverMessageType: 'success' | 'error' | null = null;

  constructor(private itemService: ItemService) {
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
    /*
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }
    */

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
