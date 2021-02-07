import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UpdateSkuQtyComponent } from "./update-sku-qty.component";

describe("UpdateSkuQtyComponent", () => {
  let component: UpdateSkuQtyComponent;
  let fixture: ComponentFixture<UpdateSkuQtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateSkuQtyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSkuQtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
