/**
 * Author: Scott Green, Dua Hasan
 * Date: 07/04/2025
 * File: api.service.ts
 * Description: API service for communicating with the IMS backend
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { type Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import type {
  InventoryItem,
  Supplier,
  Category,
  DashboardStats,
  ApiResponse,
  CreateInventoryItemRequest,
  CreateCategoryRequest,
} from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // ==================== INVENTORY ITEMS API ====================

  getInventoryItems(searchTerm?: string): Observable<InventoryItem[]> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('search', searchTerm);
    }

    return this.http
      .get<ApiResponse<InventoryItem[]>>(`${this.baseUrl}/inventory`, {
        params,
      })
      .pipe(
        map((response) => response.data),
        catchError(this.handleError)
      );
  }


  createInventoryItem(
    item: CreateInventoryItemRequest
  ): Observable<InventoryItem> {
    return this.http
      .post<ApiResponse<InventoryItem>>(`${this.baseUrl}/inventory`, item)
      .pipe(
        map((response) => response.data),
        catchError(this.handleError)
      );
  }

  // ==================== SUPPLIERS API ====================

  getSuppliers(): Observable<Supplier[]> {
    return this.http
      .get<ApiResponse<Supplier[]>>(`${this.baseUrl}/suppliers`)
      .pipe(
        map((response) => response.data),
        catchError(this.handleError)
      );
  }

  // ==================== CATEGORIES API ====================

  getCategories(): Observable<Category[]> {
    return this.http
      .get<ApiResponse<Category[]>>(`${this.baseUrl}/categories`)
      .pipe(
        map((response) => response.data),
        catchError(this.handleError)
      );
  }

  createCategory(category: CreateCategoryRequest): Observable<Category> {
    return this.http
      .post<ApiResponse<Category>>(`${this.baseUrl}/categories`, category)
      .pipe(
        map((response) => response.data),
        catchError(this.handleError)
      );
  }

  deleteCategory(id: string): Observable<Category> {
    return this.http
      .delete<ApiResponse<Category>>(`${this.baseUrl}/categories/${id}`)
      .pipe(
        map((response) => response.data),
        catchError(this.handleError)
      );
  }

  // ==================== DASHBOARD API ====================

  getDashboardStats(): Observable<DashboardStats> {
    return this.http
      .get<ApiResponse<DashboardStats>>(`${this.baseUrl}/dashboard/stats`)
      .pipe(
        map((response) => response.data),
        catchError(this.handleError)
      );
  }

  // ==================== HELPER METHODS ====================

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error?.error) {
      errorMessage = error.error.error;
    } else if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    console.error('API Error:', error);
    return throwError(() => new Error(errorMessage));
  }
}

