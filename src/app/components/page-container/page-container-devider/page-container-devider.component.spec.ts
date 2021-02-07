import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PageContainerDeviderComponent } from "./page-container-devider.component";

describe("PageContainerDeviderComponent", () => {
  let component: PageContainerDeviderComponent;
  let fixture: ComponentFixture<PageContainerDeviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageContainerDeviderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageContainerDeviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
