import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {
  public roleId: string;
  public allRoles: any[];

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<EditRoleComponent>) { }

  ngOnInit() {
    this.allRoles = this.data.allRoles;
    this.roleId = this.data.user.roleId;
  }

  closeDialog() {
    this.dialogRef.close({ roleId: parseInt(this.roleId, 10) });
  }

  closePopup() {
    this.dialogRef.close();
  }
}
