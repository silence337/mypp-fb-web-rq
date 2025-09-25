export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}
export interface AuthUserLogin {
  email: string;
  password: string;
}
export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
}
