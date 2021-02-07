import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureExplenationComponent } from './feature-explenation.component';

describe('FeatureExplenationComponent', () => {
  let component: FeatureExplenationComponent;
  let fixture: ComponentFixture<FeatureExplenationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureExplenationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureExplenationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
