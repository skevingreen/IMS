import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ItemAddComponent } from './item-add.component';
import { ItemService } from '../item.service';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AddItemDTO, Item } from '../item';

describe('ItemAddComponent', () => {
  let component: ItemAddComponent;
  let fixture: ComponentFixture<ItemAddComponent>;
  let itemService: ItemService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule, ItemAddComponent],
      providers: [
        ItemService,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemAddComponent);
    component = fixture.componentInstance;
    itemService = TestBed.inject(ItemService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when all fields are filled correctly', () => {
    component.itemForm.controls['category'].setValue('Electronics');
    component.itemForm.controls['supplier'].setValue('Tech Tonic');
    component.itemForm.controls['name'].setValue('Test');
    component.itemForm.controls['description'].setValue('Truly delightful');
    component.itemForm.controls['quantity'].setValue('88');
    component.itemForm.controls['price'].setValue('29.99');

    expect(component.itemForm.valid).toBeTrue();
  });

  it('should call addItem and navigate on successful form submission', () => {
    const date = new Date().toISOString();

    const addItemDTO: AddItemDTO = {
      categoryId: 11,
      supplierId: 12,
      name: 'whizgig',
      description: 'hot new item',
      quantity: 5,
      price: 15.45,
      dateCreated: date
    };

    const mockItem: Item = {
      _id: '1',
      categoryId: 11,
      supplierId: 12,
      name: 'whizgig',
      description: 'hot new item',
      quantity: 5,
      price: 15.45,
      dateCreated: date
    };

    spyOn(itemService, 'addItem').and.returnValue(of(mockItem));
    spyOn(router, 'navigate');

    component.itemForm.controls['category'].setValue(addItemDTO.categoryId);
    component.itemForm.controls['supplier'].setValue(addItemDTO.supplierId);
    component.itemForm.controls['name'].setValue(addItemDTO.name);
    component.itemForm.controls['description'].setValue(addItemDTO.description);
    component.itemForm.controls['quantity'].setValue(addItemDTO.quantity);
    component.itemForm.controls['price'].setValue(addItemDTO.price);
    component.onSubmit();

    expect(itemService.addItem).toHaveBeenCalledWith(addItemDTO);
    expect(router.navigate).toHaveBeenCalledWith(['/items']);
  });

  it('should handle error on form submission failure', () => {
    spyOn(itemService, 'addItem').and.returnValue(throwError('Error creating item'));
    spyOn(console, 'error');

    component.itemForm.controls['category'].setValue('Electronics');
    component.itemForm.controls['supplier'].setValue('Tech Tonic');
    component.itemForm.controls['name'].setValue('Test');
    component.itemForm.controls['description'].setValue('Truly delightful');
    component.itemForm.controls['quantity'].setValue('88');
    component.itemForm.controls['price'].setValue('29.99');
    component.onSubmit();

    expect(itemService.addItem).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error creating item', 'Error creating item');
  });
});
