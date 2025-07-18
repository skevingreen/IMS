/**
 * Authors: Dua Hasan, Scott Green
 * Date: 4 July 2025
 * File: item.service.ts
 * Description: Service for performing actions on Items.
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Supplier } from './supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  constructor(private http: HttpClient) { }

  // Retrieve all suppliers from the database.
  getSuppliers() {
    return this.http.get<Supplier[]>(`${environment.apiBaseUrl}/api/suppliers`);
  }
}
