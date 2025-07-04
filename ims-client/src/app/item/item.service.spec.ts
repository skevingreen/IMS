/**
 * Authors: Dua Hasan, Scott Green
 * Date: 4 July 2025
 * File: item-service.spec.ts
 * Description: Unit tests for item-list component.
 */

import { TestBed } from '@angular/core/testing';
import { ItemService } from './item.service';

describe('ItemService', () => {
  let service: ItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
