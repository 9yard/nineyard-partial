import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ShipmentSkuComponent } from "./shipment-sku.component";

describe("ShipmentSkuComponent", () => {
  let component: ShipmentSkuComponent;
  let fixture: ComponentFixture<ShipmentSkuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShipmentSkuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentSkuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
