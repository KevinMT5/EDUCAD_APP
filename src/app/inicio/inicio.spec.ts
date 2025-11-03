import { ComponentFixture, TestBed } from '@angular/core/testing';

import { INICIO } from './inicio';

describe('INICIO', () => {
  let component: INICIO;
  let fixture: ComponentFixture<INICIO>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [INICIO]
    })
    .compileComponents();

    fixture = TestBed.createComponent(INICIO);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
