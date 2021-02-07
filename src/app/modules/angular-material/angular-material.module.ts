import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRippleModule, MatNativeDateModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { ScrollingModule } from "@angular/cdk/scrolling";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatRippleModule,
    MatDialogModule,
    MatTooltipModule,
    MatRadioModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatExpansionModule,
    MatMenuModule,
    DragDropModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    ScrollingModule,
  ],
  providers: [
    MatDatepickerModule,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
  exports: [
    MatCheckboxModule,
    MatRippleModule,
    MatDialogModule,
    MatTooltipModule,
    MatRadioModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatExpansionModule,
    MatMenuModule,
    DragDropModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    ScrollingModule,
  ],
})
export class AngularMaterialModule {}
