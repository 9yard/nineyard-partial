import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PrintLablesDialogComponent } from "./print-lables-dialog.component";

describe("PrintLablesDialogComponent", () => {
  let component: PrintLablesDialogComponent;
  let fixture: ComponentFixture<PrintLablesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrintLablesDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintLablesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
