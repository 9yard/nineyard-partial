import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoginModel, ResetPasswordModel, InviteMembersModel, RegisterMemberModel, ChangePasswordModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StorageKeyEnum } from '../core/StorageKeyEnum';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userInfo$ = new BehaviorSubject<LoginModel>(this.getUserInfo());
  private url = 'api/user';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  options = { headers: this.headers };

  constructor(private http: HttpClient) { }

  public login(username: string, password: string) {
    const data = JSON.stringify({ username, password });
    return this.http.post(`/${this.url}/authenticate`, data, this.options)
      .pipe(tap((usr: any) => {
        this.userInfo$.next(usr);
      }));
  }

  public loginByAdmin(adminCode: string) {
    const data = JSON.stringify({ adminCode });
    return this.http.post(`/${this.url}/authenticatebyadmin`, data, this.options)
      .pipe(tap((usr: any) => {
        this.userInfo$.next(usr);
      }));
  }

  public register(register: RegisterModel) {
    const data = JSON.stringify(register);
    return this.http.post(`/${this.url}/register`, data, this.options);
  }

  public registerMember(register: RegisterMemberModel) {
    const data = JSON.stringify(register);
    return this.http.post(`/${this.url}/register/member`, data, this.options);
  }

  public forgotPassword(email: string) {
    return this.http.get(`/${this.url}/forgotpassword/${email}/${encodeURIComponent(document.location.origin)}`,
      this.options);
  }

  public resetPassword(model: ResetPasswordModel) {
    return this.http.post(`/${this.url}/resetpassword`, model, this.options);
  }

  public changePassword(model: ChangePasswordModel) {
    return this.http.post(`/${this.url}/changepassword`, model, this.options);
  }

  public getAllRoles() {
    return this.http.get(`/${this.url}/getallroles`, this.options);
  }

  public inviteMembers(inviteMembersModel: InviteMembersModel) {
    return this.http.post(`/${this.url}/invite/members`, inviteMembersModel, this.options);
  }

  public verifyUsername(username: string) {
    return this.http.get(`/${this.url}/getuserbyname/${username}`, this.options);
  }

  public verifyEmail(email: string) {
    return this.http.get(`/${this.url}/getuserbyemail/${email}`, this.options);
  }

  public verifyMemberEmail(email: string) {
    return this.http.get(`/${this.url}/getmemberbyemail/${email}`, this.options);
  }

  public getUsersByTenantId(tenantId: number) {
    return this.http.get(`/${this.url}/getusersbytenantid/${tenantId}`, this.options);
  }

  public deleteUser(id: number) {
    return this.http.delete(`/${this.url}/deleteuser/${id}`, this.options);
  }

  public updateUser(request: any) {
    const data = JSON.stringify(request);
    return this.http.put(`/${this.url}/updateuser`, data, this.options);
  }

  public logout() {
    this.userInfo$.next({} as LoginModel);
    localStorage.removeItem(StorageKeyEnum.User);
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem(StorageKeyEnum.User);
  }

  public getToken(): string {
    const tokenData = JSON.parse(localStorage.getItem(StorageKeyEnum.User)) as LoginModel;
    if (tokenData) {
      return tokenData.token;
    } else {
      return null;
    }
  }

  public getUserInfo(): LoginModel {
    const tokenData = JSON.parse(localStorage.getItem(StorageKeyEnum.User)) as LoginModel;
    if (tokenData) {
      return tokenData;
    } else {
      return null;
    }
  }

  public getTenantId() {
    const tokenData = JSON.parse(localStorage.getItem(StorageKeyEnum.User)) as LoginModel;
    if (tokenData) {
      return tokenData.tenantId;
    } else {
      return null;
    }
  }

  public submitTicket(ticket: any) {
    return this.http.post(`/${this.url}/submitticket`, ticket,
      { headers: this.headers, observe: 'response', responseType: 'text' });
  }
}
