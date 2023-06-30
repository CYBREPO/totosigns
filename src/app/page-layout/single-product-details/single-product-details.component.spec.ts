import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProductDetailsComponent } from './single-product-details.component';

describe('SingleProductDetailsComponent', () => {
  let component: SingleProductDetailsComponent;
  let fixture: ComponentFixture<SingleProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleProductDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
