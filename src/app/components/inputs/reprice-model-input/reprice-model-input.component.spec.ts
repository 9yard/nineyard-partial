import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepriceModelInputComponent } from './reprice-model-input.component';

describe('RepriceModelInputComponent', () => {
  let component: RepriceModelInputComponent;
  let fixture: ComponentFixture<RepriceModelInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepriceModelInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepriceModelInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
