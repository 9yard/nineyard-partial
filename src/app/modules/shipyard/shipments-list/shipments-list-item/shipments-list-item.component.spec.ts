import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ShipmentsListItemComponent } from "./shipments-list-item.component";

describe("ShipmentsListItemComponent", () => {
  let component: ShipmentsListItemComponent;
  let fixture: ComponentFixture<ShipmentsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShipmentsListItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
