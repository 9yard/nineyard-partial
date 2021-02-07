import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannalIconComponent } from './channal-icon.component';

describe('ChannalIconComponent', () => {
  let component: ChannalIconComponent;
  let fixture: ComponentFixture<ChannalIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannalIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannalIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
