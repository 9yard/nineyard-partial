import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserRole } from 'src/app/models/user-role.model';
import { AuthService } from 'src/app/services/auth.service';
import { InviteMembersModel, Member } from 'src/app/models/login.model';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-invite-team-members',
  templateUrl: './invite-team-members.component.html',
  styleUrls: ['./invite-team-members.component.scss']
})
export class InviteTeamMembersComponent implements OnInit, OnDestroy {

  public inviteTeamMemberForm: FormGroup;
  public items: FormArray;
  public userRoles: UserRole[];
  private destroy$ = new Subject<void>();

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.authService.getAllRoles().pipe(takeUntil(this.destroy$))
      .subscribe((value: UserRole[]) => this.userRoles = value);

    this.inviteTeamMemberForm = this.fb.group({
      items: this.fb.array([this.createItem()])
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  public verifyEmail(event: FormGroup) {
    const email = event.get('email').value;
    if (email) {
      if (event.get('email').valid) {
        this.authService.verifyMemberEmail(email)
          .pipe(takeUntil(this.destroy$))
          .subscribe((value: boolean) => {
            if (value) {
              event.get('email').setErrors({ exists: true });
            } else {
              event.get('email').setErrors(null);
            }
          });
      }

    } else {
      event.get('email').setErrors(null);
    }
  }

  public addItem(): void {
    this.items = this.inviteTeamMemberForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  public sendInvite() {
    const data = this.inviteTeamMemberForm.get('items') as FormArray;

    const inviteMembers: InviteMembersModel = {
      userId: this.authService.getUserInfo().userId,
      members: data.value as Member[]
    };

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < inviteMembers.members.length; i++) {
      inviteMembers.members[i].roleId = parseInt(inviteMembers.members[i].roleId.toString(), 10);
    }

    this.authService.inviteMembers(inviteMembers).pipe(takeUntil(this.destroy$))
      .subscribe(() => this.router.navigate(['/account/register-team-member']));

  }

  private createItem(): FormGroup {
    return this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      roleId: [2, Validators.required],
    });
  }

}
