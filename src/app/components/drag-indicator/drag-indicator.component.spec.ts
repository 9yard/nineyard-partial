import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragIndicatorComponent } from './drag-indicator.component';

describe('DragIndicatorComponent', () => {
  let component: DragIndicatorComponent;
  let fixture: ComponentFixture<DragIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragIndicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
