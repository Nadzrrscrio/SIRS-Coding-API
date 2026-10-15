/**
 * Type definitions for Admin Login module
 */

export interface AdminLoginFormValues {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface AdminLoginFormErrors {
  username?: string;
  password?: string;
  general?: string;
}

export type AuthStatus = 'idle' | 'loading' | 'success' | 'error' | 'locked';

export interface AdminLoginState {
  status: AuthStatus;
  errors: AdminLoginFormErrors;
  errorMessage: string;
  successMessage: string;
  failedAttempts: number;
  lockoutSeconds: number;
}

export interface AdminLoginPageProps {
  onLoginSuccess?: () => void;
  onNavigateSimulasi?: () => void;
  onNavigateLanding?: () => void;
  onNavigateRegister?: () => void;
  onNavigateDocs?: () => void;
  onNavigateRedoc?: () => void;
}
