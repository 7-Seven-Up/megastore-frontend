export interface RecoverPasswordRequest {
  userId: string,
  newPassword: string,
  token: string
}