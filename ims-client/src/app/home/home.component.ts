/**
 * Authors: Dua Hasan, Scott Green
 * Date: 4 July 2025
 * File: home.component.ts
 * Description: Component to display Home page content.
 */

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="text-center mb-5">
            <h1 class="display-4 fw-bold text-primary mb-3">
              <i class="fas fa-boxes me-3"></i>
              Inventory Management System
            </h1>
            <p class="lead text-muted">
              Efficiently manage your inventory items, suppliers, and categories
              with our comprehensive management system.
            </p>
          </div>

          <div class="row g-4 mb-5">
            <div class="col-md-4">
              <div class="card h-100 shadow-sm">
                <div class="card-body text-center">
                  <i class="fas fa-boxes fa-3x text-primary mb-3"></i>
                  <h5 class="card-title">Inventory Items</h5>
                  <p class="card-text">
                    Track and manage all your inventory items with detailed
                    information including quantities, prices, and descriptions.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card h-100 shadow-sm">
                <div class="card-body text-center">
                  <i class="fas fa-truck fa-3x text-success mb-3"></i>
                  <h5 class="card-title">Suppliers</h5>
                  <p class="card-text">
                    Maintain a comprehensive database of your suppliers with
                    contact information and addresses.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card h-100 shadow-sm">
                <div class="card-body text-center">
                  <i class="fas fa-tags fa-3x text-warning mb-3"></i>
                  <h5 class="card-title">Categories</h5>
                  <p class="card-text">
                    Organize your inventory with custom categories for better
                    management and reporting.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center">
            <a routerLink="/inventory" class="btn btn-primary btn-lg">
              <i class="fas fa-arrow-right me-2"></i>
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .card {
        transition: transform 0.2s ease-in-out;
        border: none;
      }

      .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
      }

      .display-4 {
        font-weight: 700;
      }

      .btn-lg {
        padding: 12px 30px;
        font-size: 1.1rem;
      }
    `,
  ],
})export class HomeComponent {
  serverMessage: string = '';

  constructor(private http: HttpClient) {}
}
