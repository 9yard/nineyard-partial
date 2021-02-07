import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ItemOverflowDialogComponent } from "./item-overflow-dialog.component";

describe("ItemOverflowDialogComponent", () => {
  let component: ItemOverflowDialogComponent;
  let fixture: ComponentFixture<ItemOverflowDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemOverflowDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemOverflowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
