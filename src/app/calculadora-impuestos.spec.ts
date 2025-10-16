import { TestBed } from '@angular/core/testing';

import { CalculadoraImpuestos } from './calculadora-impuestos';

describe('CalculadoraImpuestos', () => {
  let service: CalculadoraImpuestos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculadoraImpuestos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
