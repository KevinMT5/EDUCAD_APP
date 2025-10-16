import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lab4inventario } from './lab4inventario';

describe('Lab4inventario', () => {
  let component: Lab4inventario;
  let fixture: ComponentFixture<Lab4inventario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lab4inventario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lab4inventario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
