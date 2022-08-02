import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopByCategoryPageComponent } from './shop-by-category-page.component';

describe('ShopByCategoryPageComponent', () => {
  let component: ShopByCategoryPageComponent;
  let fixture: ComponentFixture<ShopByCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopByCategoryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopByCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
