export interface RecoverPasswordRequest {
  email: string;
  newPassword: string;
  confirmNewPassword: string;
  token: string;
}
