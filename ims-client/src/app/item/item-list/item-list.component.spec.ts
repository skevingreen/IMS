/**
 * Authors: Dua Hasan, Scott Green
 * Date: 4 July 2025
 * File: item-list.component.spec.ts
 * Description: Unit tests for item-list component.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemListComponent } from './item-list.component';
import { ItemService } from '../item.service';
import { of, throwError } from 'rxjs';
import { Item } from '../item';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;
  let itemService: ItemService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ItemListComponent],
      providers: [ItemService]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    itemService = TestBed.inject(ItemService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display records in the DOM', () => {
    const mockItems: Item[] = [
      { _id: '12345',
        categoryId: 1,
        supplierId: 3,
        name: 'Item 1',
        description: 'Description 1',
        quantity: 11,
        price: 9.99,
        dateCreated: '2024-09-04T21:39:36.605Z',
        dateModified: '2024-09-04T21:39:36.605Z'
      },
      { _id: '67890',
        categoryId: 2,
        supplierId: 4,
        name: 'Item 2',
        description: 'Description 2',
        quantity: 14,
        price: 19.99,
        dateCreated: '2024-09-05T25:35:56.605Z',
        dateModified: '2024-09-04T21:39:36.605Z'
      }
    ];

    component.items = mockItems;
    fixture.detectChanges();                  // Trigger change detection

    const itemRows = fixture.debugElement.queryAll(By.css('.item-page__table-body .item-page__table-row'));
    expect(itemRows.length).toBeGreaterThan(0); // Check that there are item rows in the DOM
  });

  it('should handle error when fetching items', () => {
    spyOn(itemService, 'getItems').and.returnValue(throwError('Error fetching items'));
    fixture.detectChanges(); // Trigger the component's constructor
    expect(component.items.length).toBe(0);
  });

  it('should render heading', () => {
    const fixture = TestBed.createComponent(ItemListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.item-page__title')?.textContent).toContain('Item List');
  });
});
