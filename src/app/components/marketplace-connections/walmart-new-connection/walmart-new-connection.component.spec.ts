import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalmartNewConnectionComponent } from './walmart-new-connection.component';

describe('WalmartNewConnectionComponent', () => {
  let component: WalmartNewConnectionComponent;
  let fixture: ComponentFixture<WalmartNewConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalmartNewConnectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalmartNewConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
