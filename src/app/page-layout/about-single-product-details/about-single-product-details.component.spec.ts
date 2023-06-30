import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSingleProductDetailsComponent } from './about-single-product-details.component';

describe('AboutSingleProductDetailsComponent', () => {
  let component: AboutSingleProductDetailsComponent;
  let fixture: ComponentFixture<AboutSingleProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutSingleProductDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutSingleProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
