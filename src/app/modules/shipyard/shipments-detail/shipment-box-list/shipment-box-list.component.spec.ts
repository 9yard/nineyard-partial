import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ShipmentBoxListComponent } from "./shipment-box-list.component";

describe("ShipmentBoxListComponent", () => {
  let component: ShipmentBoxListComponent;
  let fixture: ComponentFixture<ShipmentBoxListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShipmentBoxListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentBoxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
