import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceOverrideCellEditorComponent } from './price-override-cell-editor.component';

describe('PriceOverrideCellEditorComponent', () => {
  let component: PriceOverrideCellEditorComponent;
  let fixture: ComponentFixture<PriceOverrideCellEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceOverrideCellEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceOverrideCellEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
