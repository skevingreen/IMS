
/**
 * Author: Scott Green, Dua Hasan
 * Date: 07/04/2025
 * File: inventory.component.ts
 * Description: Main inventory management component
 */

import { Component, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import type {
  InventoryItem,
  Category,
  Supplier,
  DashboardStats,
  CreateInventoryItemRequest,
  CreateSupplierRequest,
  CreateCategoryRequest,
} from '../models/interfaces';

declare var bootstrap: any;

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container-fluid">
      <!-- Header -->
      <div class="row mb-4">
        <div class="col-12">
          <h1 class="display-4 text-primary">
            <i class="fas fa-boxes me-3"></i>
            Inventory Management System
          </h1>
          <p class="lead text-muted">
            Manage your inventory items, suppliers, and categories efficiently
          </p>
        </div>
      </div>

      <!-- Statistics Cards -->
      <div class="row mb-4">
        <div class="col-lg-3 col-md-6 mb-3">
          <div class="card stats-card bg-primary text-white">
            <div class="card-body text-center">
              <i class="fas fa-boxes fa-3x mb-3"></i>
              <h2 class="card-title">{{ stats.totalItems }}</h2>
              <p class="card-text">Total Items</p>
            </div>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 mb-3">
          <div class="card stats-card bg-success text-white">
            <div class="card-body text-center">
              <i class="fas fa-truck fa-3x mb-3"></i>
              <h2 class="card-title">{{ stats.totalSuppliers }}</h2>
              <p class="card-text">Suppliers</p>
            </div>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 mb-3">
          <div class="card stats-card bg-warning text-white">
            <div class="card-body text-center">
              <i class="fas fa-tags fa-3x mb-3"></i>
              <h2 class="card-title">{{ stats.totalCategories }}</h2>
              <p class="card-text">Categories</p>
            </div>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 mb-3">
          <div class="card stats-card bg-info text-white">
            <div class="card-body text-center">
              <i class="fas fa-dollar-sign fa-3x mb-3"></i>
              <h2 class="card-title">
                \${{ stats.totalValue | number : '1.0-0' }}
              </h2>
              <p class="card-text">Total Value</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Tabs -->
      <div class="card">
        <div class="card-header">
          <ul
            class="nav nav-tabs card-header-tabs"
            id="mainTabs"
            role="tablist"
          >
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="inventory-tab"
                data-bs-toggle="tab"
                data-bs-target="#inventory"
                type="button"
                role="tab"
              >
                <i class="fas fa-boxes me-2"></i>Inventory Items
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="suppliers-tab"
                data-bs-toggle="tab"
                data-bs-target="#suppliers"
                type="button"
                role="tab"
              >
                <i class="fas fa-truck me-2"></i>Suppliers
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="categories-tab"
                data-bs-toggle="tab"
                data-bs-target="#categories"
                type="button"
                role="tab"
              >
                <i class="fas fa-tags me-2"></i>Categories
              </button>
            </li>
          </ul>
        </div>

        <div class="card-body">
          <div class="tab-content" id="mainTabsContent">
            <!-- Inventory Items Tab -->
            <div
              class="tab-pane fade show active"
              id="inventory"
              role="tabpanel"
            >
              <!-- Search and Add Button -->
              <div class="row mb-3">
                <div class="col-md-6">
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="fas fa-search"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search items..."
                      [(ngModel)]="searchTerm"
                      (input)="onSearchChange()"
                    />
                  </div>
                </div>
                <div class="col-md-6 text-end">
                  <button
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#createItemModal"
                  >
                    <i class="fas fa-plus me-2"></i>Add Item
                  </button>
                </div>
              </div>

              <!-- Items Table -->
              <div class="table-responsive">
                <table class="table table-striped table-hover">
                  <thead class="table-dark">
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Supplier</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let item of items">
                      <td class="fw-bold">{{ item.name }}</td>
                      <td>{{ getCategoryName(item.categoryId) }}</td>
                      <td>{{ getSupplierName(item.supplierId) }}</td>
                      <td>{{ item.quantity }}</td>
                      <td>\${{ item.price | number : '1.2-2' }}</td>
                      <td>
                        <span
                          class="badge"
                          [ngClass]="getStatusBadgeClass(item.quantity)"
                        >
                          {{ getStatusText(item.quantity) }}
                        </span>
                      </td>
                      <td>
                        <button
                          class="btn btn-sm btn-outline-primary me-1"
                          (click)="viewItem(item)"
                          data-bs-toggle="modal"
                          data-bs-target="#viewItemModal"
                        >
                          <i class="fas fa-eye"></i>
                        </button>
                        <button
                          class="btn btn-sm btn-outline-danger"
                          (click)="deleteItem(item._id)"
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                    <tr *ngIf="items.length === 0">
                      <td colspan="7" class="text-center text-muted">
                        No items found
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Suppliers Tab -->
            <div class="tab-pane fade" id="suppliers" role="tabpanel">
              <!-- Add Supplier Button -->
              <div class="row mb-3">
                <div class="col-12 text-end">
                  <button
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#createSupplierModal"
                  >
                    <i class="fas fa-plus me-2"></i>Add Supplier
                  </button>
                </div>
              </div>

              <!-- Suppliers Table -->
              <div class="table-responsive">
                <table class="table table-striped table-hover">
                  <thead class="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Contact</th>
                      <th>Address</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let supplier of suppliers">
                      <td class="fw-bold">{{ supplier.supplierId }}</td>
                      <td>{{ supplier.supplierName }}</td>
                      <td>{{ supplier.contactInformation }}</td>
                      <td>
                        {{
                          supplier.address.length > 50
                            ? (supplier.address | slice : 0 : 50) + '...'
                            : supplier.address
                        }}
                      </td>
                      <td>
                        <button
                          class="btn btn-sm btn-outline-danger"
                          (click)="deleteSupplier(supplier._id)"
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                    <tr *ngIf="suppliers.length === 0">
                      <td colspan="5" class="text-center text-muted">
                        No suppliers found
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Categories Tab -->
            <div class="tab-pane fade" id="categories" role="tabpanel">
              <!-- Add Category Button -->
              <div class="row mb-3">
                <div class="col-12 text-end">
                  <button
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#createCategoryModal"
                  >
                    <i class="fas fa-plus me-2"></i>Add Category
                  </button>
                </div>
              </div>

              <!-- Categories Table -->
              <div class="table-responsive">
                <table class="table table-striped table-hover">
                  <thead class="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let category of categories">
                      <td class="fw-bold">{{ category.categoryId }}</td>
                      <td>{{ category.categoryName }}</td>
                      <td>
                        {{
                          category.description.length > 50
                            ? (category.description | slice : 0 : 50) + '...'
                            : category.description
                        }}
                      </td>
                      <td>
                        <button
                          class="btn btn-sm btn-outline-danger"
                          (click)="deleteCategory(category._id)"
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                    <tr *ngIf="categories.length === 0">
                      <td colspan="4" class="text-center text-muted">
                        No categories found
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Item Modal -->
    <div class="modal fade" id="createItemModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="fas fa-plus me-2"></i>Create New Inventory Item
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <form #createItemForm="ngForm">
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label"
                      >Item Name <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      class="form-control"
                      [(ngModel)]="newItem.name"
                      name="name"
                      required
                      #nameField="ngModel"
                    />
                    <div
                      *ngIf="nameField.invalid && nameField.touched"
                      class="text-danger"
                    >
                      Item name is required
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label"
                      >Category <span class="text-danger">*</span></label
                    >
                    <select
                      class="form-select"
                      [(ngModel)]="newItem.categoryId"
                      name="categoryId"
                      required
                      #categoryField="ngModel"
                    >
                      <option value="0">Select Category</option>
                      <option
                        *ngFor="let category of categories"
                        [value]="category.categoryId"
                      >
                        {{ category.categoryName }}
                      </option>
                    </select>
                    <div
                      *ngIf="categoryField.invalid && categoryField.touched"
                      class="text-danger"
                    >
                      Category is required
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label"
                      >Supplier <span class="text-danger">*</span></label
                    >
                    <select
                      class="form-select"
                      [(ngModel)]="newItem.supplierId"
                      name="supplierId"
                      required
                      #supplierField="ngModel"
                    >
                      <option value="0">Select Supplier</option>
                      <option
                        *ngFor="let supplier of suppliers"
                        [value]="supplier.supplierId"
                      >
                        {{ supplier.supplierName }}
                      </option>
                    </select>
                    <div
                      *ngIf="supplierField.invalid && supplierField.touched"
                      class="text-danger"
                    >
                      Supplier is required
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label"
                      >Quantity <span class="text-danger">*</span></label
                    >
                    <input
                      type="number"
                      class="form-control"
                      [(ngModel)]="newItem.quantity"
                      name="quantity"
                      min="0"
                      required
                      #quantityField="ngModel"
                    />
                    <div
                      *ngIf="quantityField.invalid && quantityField.touched"
                      class="text-danger"
                    >
                      Valid quantity is required
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label"
                      >Price <span class="text-danger">*</span></label
                    >
                    <input
                      type="number"
                      class="form-control"
                      [(ngModel)]="newItem.price"
                      name="price"
                      min="0"
                      step="0.01"
                      required
                      #priceField="ngModel"
                    />
                    <div
                      *ngIf="priceField.invalid && priceField.touched"
                      class="text-danger"
                    >
                      Valid price is required
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Description</label>
                    <textarea
                      class="form-control"
                      [(ngModel)]="newItem.description"
                      name="description"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary"
              (click)="createItem()"
              [disabled]="!createItemForm.valid"
            >
              Create Item
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Supplier Modal -->
    <div class="modal fade" id="createSupplierModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="fas fa-plus me-2"></i>Create New Supplier
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <form #createSupplierForm="ngForm">
              <div class="mb-3">
                <label class="form-label"
                  >Supplier Name <span class="text-danger">*</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  [(ngModel)]="newSupplier.supplierName"
                  name="supplierName"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label"
                  >Contact Information <span class="text-danger">*</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  [(ngModel)]="newSupplier.contactInformation"
                  name="contactInformation"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label"
                  >Address <span class="text-danger">*</span></label
                >
                <textarea
                  class="form-control"
                  [(ngModel)]="newSupplier.address"
                  name="address"
                  rows="3"
                  required
                ></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary"
              (click)="createSupplier()"
              [disabled]="!createSupplierForm.valid"
            >
              Create Supplier
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Category Modal -->
    <div class="modal fade" id="createCategoryModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="fas fa-plus me-2"></i>Create New Category
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <form #createCategoryForm="ngForm">
              <div class="mb-3">
                <label class="form-label"
                  >Category Name <span class="text-danger">*</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  [(ngModel)]="newCategory.categoryName"
                  name="categoryName"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label"
                  >Description <span class="text-danger">*</span></label
                >
                <textarea
                  class="form-control"
                  [(ngModel)]="newCategory.description"
                  name="description"
                  rows="3"
                  required
                ></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary"
              (click)="createCategory()"
              [disabled]="!createCategoryForm.valid"
            >
              Create Category
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- View Item Modal -->
    <div class="modal fade" id="viewItemModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="fas fa-eye me-2"></i>Item Details
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body" *ngIf="selectedItem">
            <div class="row mb-3">
              <div class="col-sm-4"><strong>Name:</strong></div>
              <div class="col-sm-8">{{ selectedItem.name }}</div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-4"><strong>Description:</strong></div>
              <div class="col-sm-8">
                {{ selectedItem.description || 'No description' }}
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-4"><strong>Category:</strong></div>
              <div class="col-sm-8">
                {{ getCategoryName(selectedItem.categoryId) }}
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-4"><strong>Supplier:</strong></div>
              <div class="col-sm-8">
                {{ getSupplierName(selectedItem.supplierId) }}
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-4"><strong>Quantity:</strong></div>
              <div class="col-sm-8">{{ selectedItem.quantity }}</div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-4"><strong>Price:</strong></div>
              <div class="col-sm-8">
                \${{ selectedItem.price | number : '1.2-2' }}
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-4"><strong>Total Value:</strong></div>
              <div class="col-sm-8">
                \${{
                  selectedItem.price * selectedItem.quantity | number : '1.2-2'
                }}
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-4"><strong>Status:</strong></div>
              <div class="col-sm-8">
                <span
                  class="badge"
                  [ngClass]="getStatusBadgeClass(selectedItem.quantity)"
                >
                  {{ getStatusText(selectedItem.quantity) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .stats-card {
        transition: transform 0.2s ease-in-out;
        border: none;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .stats-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
      }

      .display-4 {
        font-weight: 600;
      }

      .nav-tabs .nav-link {
        color: #495057;
        font-weight: 500;
      }

      .nav-tabs .nav-link.active {
        color: #007bff;
        font-weight: 600;
      }

      .card {
        border: none;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .table th {
        background-color: #343a40;
        color: white;
        font-weight: 600;
      }

      .table-hover tbody tr:hover {
        background-color: #f8f9fa;
      }

      .btn-sm {
        padding: 0.25rem 0.5rem;
      }

      .modal-header {
        background-color: #f8f9fa;
        border-bottom: 1px solid #dee2e6;
      }

      .form-label {
        font-weight: 500;
      }

      .text-danger {
        font-size: 0.875rem;
      }

      .badge {
        font-size: 0.75rem;
      }
    `,
  ],
})
export class InventoryComponent implements OnInit {
  items: InventoryItem[] = [];
  categories: Category[] = [];
  suppliers: Supplier[] = [];
  stats: DashboardStats = {
    totalItems: 0,
    totalSuppliers: 0,
    totalCategories: 0,
    totalValue: 0,
  };

  searchTerm = '';
  selectedItem: InventoryItem | null = null;

  newItem: CreateInventoryItemRequest = {
    name: '',
    description: '',
    categoryId: 0,
    supplierId: 0,
    quantity: 0,
    price: 0,
  };
 

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // Load all data
    this.apiService.getInventoryItems().subscribe({
      next: (items) => (this.items = items),
      error: (error) => console.error('Error loading items:', error),
    });

  createItem(): void {
    this.apiService.createInventoryItem(this.newItem).subscribe({
      next: (item) => {
        this.resetItemForm();
        this.closeModal('createItemModal');
        this.loadData();
        alert('Item created successfully!');
      },
      error: (error) => {
        alert('Error creating item: ' + error.message);
      },
    });
  }

 

  private resetItemForm(): void {
    this.newItem = {
      name: '',
      description: '',
      categoryId: 0,
      supplierId: 0,
      quantity: 0,
      price: 0,
    };
  }



 
