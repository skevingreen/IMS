import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <h2>Welcome to the Inventory System</h2>
      <p>The idea of the Inventory Management System was inspired by the need for businesses to manage their inventory efficiently.
        whether you are a small business owner looking to keep track of stack levels or a warehouse manager needing to organize inventory,
        the Inventory management System is designed to cater your needs. </p>

      <div class="server-message-box" *ngIf="serverMessage">
        <strong>Server message:</strong>
        <span>{{ serverMessage }}</span>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 600px;
      margin: 60px auto;
      padding: 30px;
      background-color: #ffffff;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      border-radius: 12px;
      text-align: center;
    }

    h2 {
      font-size: 20px;
      margin-bottom: 16px;
      color: rgb(112, 177, 247);
    },
    
    .server-message-box {
      background-color: #f0f8ff;
      border-left: 4px solid #007bff;
      padding: 16px;
      font-size: 15px;
      color: #004085;
      border-radius: 6px;
    }
  `]
})
export class HomeComponent {
  serverMessage: string = '';

  constructor(private http: HttpClient) {
    setTimeout(() => {
      this.http.get(`${environment.apiBaseUrl}/api`).subscribe({
        next: (res: any) => this.serverMessage = res['message'],
        error: () => this.serverMessage = 'Error loading server message'
      });
    }, 2000);
  }
}
