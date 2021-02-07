import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AddSkuToShipmentComponent } from "./add-sku-to-shipment.component";

describe("AddSkuToShipmentComponent", () => {
  let component: AddSkuToShipmentComponent;
  let fixture: ComponentFixture<AddSkuToShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSkuToShipmentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSkuToShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
