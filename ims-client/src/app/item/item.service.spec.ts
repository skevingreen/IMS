/**
 * Authors: Dua Hasan, Scott Green
 * Date: 4 July 2025
 * File: item-service.spec.ts
 * Description: Unit tests for item-list component.
 */

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ItemService } from './item.service';
import { Item } from './item';
import { environment } from '../../environments/environment';

describe('ItemService', () => {
  let service: ItemService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ItemService]
    });

    service = TestBed.inject(ItemService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a list of items from the API', () => {
    const mockItems: Item[] = [
      {
        _id: '1',
        categoryId: 1,
        supplierId: 1,
        name: 'test 1',
        description: 'test this one',
        quantity: 1,
        price: 1.11,
        dateCreated: '2021-01-01T00:00:00.000Z',
        dateModified: '2021-01-01T00:00:00.000Z'
      },
      {
        _id: '2',
        categoryId: 2,
        supplierId: 2,
        name: 'test 2',
        description: 'test that one',
        quantity: 2,
        price: 2.22,
        dateCreated: '2022-02-02T00:00:00.000Z',
        dateModified: '2022-02-02T00:00:00.000Z'
      }
    ];

    service.getItems().subscribe(items => {
      expect(items.length).toBe(2);
      expect(items).toEqual(mockItems);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/items`);
    expect(req.request.method).toBe('GET');
    req.flush(mockItems);
  });
});
