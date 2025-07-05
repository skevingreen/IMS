import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { InventoryComponent } from './inventory.component';
import { ApiService } from '../services/api.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const apiSpy = jasmine.createSpyObj('ApiService', [
      'createInventoryItem',
      'getInventoryItems',
    ]);

    await TestBed.configureTestingModule({
      imports: [InventoryComponent, FormsModule],
      providers: [{ provide: ApiService, useValue: apiSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryComponent);
    component = fixture.componentInstance;
    mockApiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  // Test 1: Should call createInventoryItem with form data
  it('should call ApiService.createInventoryItem with new item data', () => {
    const testItem = {
      name: 'Test Item',
      description: 'Description',
      categoryId: 1,
      supplierId: 1,
      quantity: 10,
      price: 99.99,
    };

    component.newItem = { ...testItem };
    mockApiService.createInventoryItem.and.returnValue(of(testItem));
    mockApiService.getInventoryItems.and.returnValue(of([]));

    component.createItem();

    expect(mockApiService.createInventoryItem).toHaveBeenCalledWith(testItem);
  });

  //  Test 2: Should reset form and reload data on success
  it('should reset newItem and reload data on successful creation', () => {
    spyOn(component as any, 'resetItemForm');
    spyOn(component as any, 'closeModal');
    spyOn(component, 'loadData');

    const testItem = {
      name: 'Test Item',
      description: 'Description',
      categoryId: 1,
      supplierId: 1,
      quantity: 10,
      price: 99.99,
    };

    mockApiService.createInventoryItem.and.returnValue(of(testItem));
    mockApiService.getInventoryItems.and.returnValue(of([]));

    component.newItem = { ...testItem };
    component.createItem();

    expect(component['resetItemForm']).toHaveBeenCalled();
    expect(component['closeModal']).toHaveBeenCalledWith('createItemModal');
    expect(component.loadData).toHaveBeenCalled();
  });

  // Test 3: Should show alert on error
  it('should show alert on creation error', () => {
    spyOn(window, 'alert');
    const error = { message: 'Something went wrong' };

    mockApiService.createInventoryItem.and.returnValue(throwError(() => error));
    component.newItem = {
      name: 'Fail Item',
      description: 'error test',
      categoryId: 1,
      supplierId: 1,
      quantity: 5,
      price: 15,
    };

    component.createItem();

    expect(window.alert).toHaveBeenCalledWith('Error creating item: ' + error.message);
  });
});

