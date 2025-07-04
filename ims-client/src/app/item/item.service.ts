/**
 * Authors: Dua Hasan, Scott Green
 * Date: 4 July 2025
 * File: item.service.ts
 * Description: Service for performing actions on Items.
 */

import { /*AddItemDTO, UpdateItemDTO,*/ Item } from './item';
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

  /*
  getItem(itemId: number) {
    return this.http.get<Item>(`${environment.apiBaseUrl}/api/items/${itemId}`);
  }

  addItem(item: AddItemDTO) {
    return this.http.post<Item>(`${environment.apiBaseUrl}/api/items`, item);
  }

  updateItem(item: UpdateItemDTO, itemId: number) {
    return this.http.patch<Item>(`${environment.apiBaseUrl}/api/items/${itemId}`, item);
  }
  */

  deleteItem(itemId: number) {
    return this.http.delete(`${environment.apiBaseUrl}/api/gardens/${itemId}`);
  }
}
