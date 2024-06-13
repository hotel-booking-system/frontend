export interface LoginResponse {
  token: string;
  tokenType: string;
  expiresAt: Date;
  username: string;
  email: string;
  roles: string[];
}
