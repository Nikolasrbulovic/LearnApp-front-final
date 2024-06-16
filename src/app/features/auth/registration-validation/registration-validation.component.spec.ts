import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationValidationComponent } from './registration-validation.component';

describe('RegistrationValidationComponent', () => {
  let component: RegistrationValidationComponent;
  let fixture: ComponentFixture<RegistrationValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationValidationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
