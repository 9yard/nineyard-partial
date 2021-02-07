import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceConnectionsComponent } from './marketplace-connections.component';

describe('MarketplaceConnectionsComponent', () => {
  let component: MarketplaceConnectionsComponent;
  let fixture: ComponentFixture<MarketplaceConnectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketplaceConnectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
