import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AddSkuToCurrentShipmentComponent } from "./add-sku-to-current-shipment.component";

describe("AddSkuToCurrentShipmentComponent", () => {
  let component: AddSkuToCurrentShipmentComponent;
  let fixture: ComponentFixture<AddSkuToCurrentShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSkuToCurrentShipmentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSkuToCurrentShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
