import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourCartPageComponent } from './your-cart-page.component';

describe('YourCartPageComponent', () => {
  let component: YourCartPageComponent;
  let fixture: ComponentFixture<YourCartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourCartPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourCartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
