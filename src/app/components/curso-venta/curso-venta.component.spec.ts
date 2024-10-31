import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoVentaComponent } from './curso-venta.component';

describe('CursoVentaComponent', () => {
  let component: CursoVentaComponent;
  let fixture: ComponentFixture<CursoVentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CursoVentaComponent]
    });
    fixture = TestBed.createComponent(CursoVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
