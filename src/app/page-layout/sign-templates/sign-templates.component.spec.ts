import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignTemplatesComponent } from './sign-templates.component';

describe('SignTemplatesComponent', () => {
  let component: SignTemplatesComponent;
  let fixture: ComponentFixture<SignTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignTemplatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
