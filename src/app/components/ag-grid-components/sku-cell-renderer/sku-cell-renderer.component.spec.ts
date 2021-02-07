import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuCellRendererComponent } from './sku-cell-renderer.component';

describe('SkuCellRendererComponent', () => {
  let component: SkuCellRendererComponent;
  let fixture: ComponentFixture<SkuCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkuCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
