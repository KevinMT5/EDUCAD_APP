import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ubicanos } from './ubicanos';

describe('Ubicanos', () => {
  let component: Ubicanos;
  let fixture: ComponentFixture<Ubicanos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ubicanos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ubicanos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
