export interface LoginModel {
  userId: number;
  tenantId: number;
  isShipyard: number;
  isPriceyard: number;
  roleId: number;
  username: string;
  tenantName: string;
  role: string;
  phone: string;
  email: string;
  company: string;
  website: string;
  token: string;
  created?: string;
  onboardingSteps: any;
  onboardingStep: number;
}

export interface ResetPasswordModel {
  password: string;
  code: string;
}

export interface ChangePasswordModel {
  password: string;
  oldPassword: string;
  userId: number;
}

export interface InviteMembersModel {
  userId: number;
  members: Member[];
}
export interface Member {
  email: string;
  roleId: number;
}

export interface RegisterMemberModel {
  username: string;
  email: string;
  password: string;
  tenantId: number;
  roleId: number;
}
