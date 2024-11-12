import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbohidratosComponent } from './carbohidratos.component';

describe('CarbohidratosComponent', () => {
  let component: CarbohidratosComponent;
  let fixture: ComponentFixture<CarbohidratosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarbohidratosComponent]
    });
    fixture = TestBed.createComponent(CarbohidratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
