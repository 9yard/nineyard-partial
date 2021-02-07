import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ShipmentSkuListComponent } from "./shipment-sku-list.component";

describe("ShipmentSkuListComponent", () => {
  let component: ShipmentSkuListComponent;
  let fixture: ComponentFixture<ShipmentSkuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShipmentSkuListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentSkuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
