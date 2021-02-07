import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PageContainerGroupComponent } from "./page-container-group.component";

describe("PageContainerGroupComponent", () => {
  let component: PageContainerGroupComponent;
  let fixture: ComponentFixture<PageContainerGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageContainerGroupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageContainerGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
