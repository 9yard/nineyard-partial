import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AmountInShipmentCellRendererComponent } from "./amount-in-shipment-cell-renderer.component";

describe("AmountInShipmentCellRendererComponent", () => {
  let component: AmountInShipmentCellRendererComponent;
  let fixture: ComponentFixture<AmountInShipmentCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AmountInShipmentCellRendererComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountInShipmentCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
