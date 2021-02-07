import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceOverrideCellRendererComponent } from './price-override-cell-renderer.component';

describe('PriceOverrideCellRendererComponent', () => {
  let component: PriceOverrideCellRendererComponent;
  let fixture: ComponentFixture<PriceOverrideCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceOverrideCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceOverrideCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
