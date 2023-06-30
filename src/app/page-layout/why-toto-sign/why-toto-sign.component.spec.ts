import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyTotoSignComponent } from './why-toto-sign.component';

describe('WhyTotoSignComponent', () => {
  let component: WhyTotoSignComponent;
  let fixture: ComponentFixture<WhyTotoSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhyTotoSignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhyTotoSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
