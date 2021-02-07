import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentsDetailComponent } from './shipments-detail.component';

describe('ShipmentsDetailComponent', () => {
  let component: ShipmentsDetailComponent;
  let fixture: ComponentFixture<ShipmentsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
