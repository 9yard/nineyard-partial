import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepricingModelCellEditorComponent } from './repricing-model-cell-editor.component';

describe('RepricingModelCellEditorComponent', () => {
  let component: RepricingModelCellEditorComponent;
  let fixture: ComponentFixture<RepricingModelCellEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepricingModelCellEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepricingModelCellEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
