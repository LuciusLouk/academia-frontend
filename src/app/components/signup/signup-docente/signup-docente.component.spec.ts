import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupDocenteComponent } from './signup-docente.component';

describe('SignupDocenteComponent', () => {
  let component: SignupDocenteComponent;
  let fixture: ComponentFixture<SignupDocenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupDocenteComponent]
    });
    fixture = TestBed.createComponent(SignupDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
