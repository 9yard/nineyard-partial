import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepricingModelCellRendererComponent } from './repricing-model-cell-renderer.component';

describe('RepricingModelCellRendererComponent', () => {
  let component: RepricingModelCellRendererComponent;
  let fixture: ComponentFixture<RepricingModelCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepricingModelCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepricingModelCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
