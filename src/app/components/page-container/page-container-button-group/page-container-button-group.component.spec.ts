import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageContainerButtonGroupComponent } from './page-container-button-group.component';

describe('PageContainerButtonGroupComponent', () => {
  let component: PageContainerButtonGroupComponent;
  let fixture: ComponentFixture<PageContainerButtonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageContainerButtonGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageContainerButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
