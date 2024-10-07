export interface RecoverPasswordRequest {
  newPassword: string;
  confirmNewPassword: string;
  token: string;
}
