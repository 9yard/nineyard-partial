import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFactorVerificationComponent } from './two-factor-verification.component';

describe('TwoFactorVerificationComponent', () => {
  let component: TwoFactorVerificationComponent;
  let fixture: ComponentFixture<TwoFactorVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoFactorVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoFactorVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
