import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ShipmentPlanItemComponent } from "./shipment-plan-item.component";

describe("ShipmentPlanItemComponent", () => {
  let component: ShipmentPlanItemComponent;
  let fixture: ComponentFixture<ShipmentPlanItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShipmentPlanItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentPlanItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
