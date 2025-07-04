import { /*AddItemDTO, UpdateItemDTO,*/ Item } from './item';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get<Item[]>(`${environment.apiBaseUrl}/api/items`);
  }

  /*
  getItem(gardenId: number) {
    return this.http.get<Item>(`${environment.apiBaseUrl}/api/items/${itemId}`);
  }

  addGarden(garden: AddItemDTO) {
    return this.http.post<Item>(`${environment.apiBaseUrl}/api/items`, item);
  }

  updateItem(item: UpdateItemDTO, itemId: number) {
    return this.http.patch<Item>(`${environment.apiBaseUrl}/api/items/${itemId}`, item);
  }
  */

  deleteGarden(gardenId: number) {
    return this.http.delete(`${environment.apiBaseUrl}/api/gardens/${gardenId}`);
  }
}
