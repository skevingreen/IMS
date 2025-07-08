/**
 * Authors: Dua Hasan, Scott Green
 * Date: 4 July 2025
 * File: item.service.ts
 * Description: Service for performing actions on Items.
 */

import { AddItemDTO, Item, UpdateItemDTO } from './item';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private http: HttpClient) { }

  // Retrieve all items from the database.
  getItems() {
    return this.http.get<Item[]>(`${environment.apiBaseUrl}/api/items`);
  }

  // Retrieves a particular item from the database
  getItem(inventoryItemId: string) {
    return this.http.get<Item>(`${environment.apiBaseUrl}/api/items/${inventoryItemId}`);
  }

  addItem(item: AddItemDTO) {
    return this.http.post<Item>(`${environment.apiBaseUrl}/api/items`, item);
  }

  updateItem(inventoryItemId: string, updateItem: UpdateItemDTO) {
    return this.http.patch<Item>(`${environment.apiBaseUrl}/api/items/${inventoryItemId}`, updateItem);
  }

  deleteItem(inventoryItemId: string) {
    return this.http.delete(`${environment.apiBaseUrl}/api/items/${inventoryItemId}`);
  }
}
