import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsBillingComponent } from './settings-billing.component';

describe('SettingsBillingComponent', () => {
  let component: SettingsBillingComponent;
  let fixture: ComponentFixture<SettingsBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
