import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CreateMultipleBoxesDialogComponent } from "./create-multiple-boxes-dialog.component";

describe("CreateMultipleBoxesDialogComponent", () => {
  let component: CreateMultipleBoxesDialogComponent;
  let fixture: ComponentFixture<CreateMultipleBoxesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateMultipleBoxesDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMultipleBoxesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
