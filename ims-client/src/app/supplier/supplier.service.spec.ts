import { TestBed } from '@angular/core/testing';
import { SupplierService } from './supplier.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('SupplierService', () => {
  let service: SupplierService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SupplierService]
    });

    service = TestBed.inject(SupplierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
