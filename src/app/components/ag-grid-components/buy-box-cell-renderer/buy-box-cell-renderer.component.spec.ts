import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyBoxCellRendererComponent } from './buy-box-cell-renderer.component';

describe('BuyBoxCellRendererComponent', () => {
  let component: BuyBoxCellRendererComponent;
  let fixture: ComponentFixture<BuyBoxCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyBoxCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyBoxCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
