import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PlanShipmentDialogComponent } from "./plan-shipment-dialog.component";

describe("PlanShipmentDialogComponent", () => {
  let component: PlanShipmentDialogComponent;
  let fixture: ComponentFixture<PlanShipmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanShipmentDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanShipmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
