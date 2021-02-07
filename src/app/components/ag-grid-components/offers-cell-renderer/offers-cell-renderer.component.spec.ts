import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersCellRendererComponent } from './offers-cell-renderer.component';

describe('OffersCellRendererComponent', () => {
  let component: OffersCellRendererComponent;
  let fixture: ComponentFixture<OffersCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffersCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
