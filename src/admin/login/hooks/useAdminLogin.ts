/**
 * useAdminLogin hook
 * Manages form state, validation, authentication lifecycle,
 * brute-force lockout, and error boundaries.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  AdminLoginFormErrors,
  AdminLoginFormValues,
  AuthStatus,
} from '../types/login';
import {
  authenticateAdmin,
  validateLoginForm,
  sanitizeInput,
  AuthException,
  ValidationException,
  RateLimitException,
  safeStorage,
} from '../utils/loginValidation';

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_SECONDS = 30;

export function useAdminLogin(onSuccessCallback?: () => void) {
  const [values, setValues] = useState<AdminLoginFormValues>(() => {
    const savedUser = safeStorage.get('sirs_remembered_username') || '';
    return {
      username: savedUser,
      password: '',
      rememberMe: Boolean(savedUser),
    };
  });

  const [errors, setErrors] = useState<AdminLoginFormErrors>({});
  const [status, setStatus] = useState<AuthStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [lockoutSeconds, setLockoutSeconds] = useState<number>(0);

  const lockoutTimerRef = useRef<number | null>(null);

  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (lockoutTimerRef.current) {
        clearInterval(lockoutTimerRef.current);
      }
    };
  }, []);

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutSeconds > 0) {
      lockoutTimerRef.current = window.setInterval(() => {
        setLockoutSeconds((prev) => {
          if (prev <= 1) {
            if (lockoutTimerRef.current) clearInterval(lockoutTimerRef.current);
            setStatus('idle');
            setErrorMessage('');
            setFailedAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (lockoutTimerRef.current) clearInterval(lockoutTimerRef.current);
      };
    }
  }, [lockoutSeconds]);

  const handleChange = useCallback((field: keyof AdminLoginFormValues, value: any) => {
    try {
      setValues((prev) => ({ ...prev, [field]: value }));
      // Clear field error on change
      setErrors((prev) => {
        if (!prev[field as keyof AdminLoginFormErrors]) return prev;
        const next = { ...prev };
        delete next[field as keyof AdminLoginFormErrors];
        return next;
      });
      // Clear general error if user starts typing
      if (errorMessage) {
        setErrorMessage('');
        if (status === 'error') setStatus('idle');
      }
    } catch (err) {
      console.error(`Error updating field "${field}":`, err);
    }
  }, [errorMessage, status]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleFillDemo = useCallback(() => {
    try {
      setValues({
        username: 'admin',
        password: 'SIRS_ADMIN_TOKEN',
        rememberMe: true,
      });
      setErrors({});
      setErrorMessage('');
    } catch (err) {
      console.error('Error filling demo credentials:', err);
    }
  }, []);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    // 1. Guard against submission during lockout
    if (lockoutSeconds > 0 || status === 'locked') {
      setErrorMessage(
        `Akun terkunci sementara karena terlalu banyak percobaan. Silakan tunggu ${lockoutSeconds} detik.`
      );
      return;
    }

    if (status === 'loading') return;

    try {
      setStatus('loading');
      setErrorMessage('');
      setSuccessMessage('');

      // 2. Client-side field validation
      const validationErrors = validateLoginForm(values);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setStatus('error');
        setErrorMessage('Mohon lengkapi data login dengan benar.');
        return;
      }

      // 3. Attempt authentication
      const result = await authenticateAdmin(values);

      if (result.success) {
        setStatus('success');
        setSuccessMessage('Login berhasil! Mengalihkan ke Pusat Simulasi SIRS...');
        setFailedAttempts(0);

        // Remember me logic
        if (values.rememberMe) {
          safeStorage.set('sirs_remembered_username', sanitizeInput(values.username));
        } else {
          safeStorage.remove('sirs_remembered_username');
        }

        // Delay slight redirect for smooth feedback
        setTimeout(() => {
          if (onSuccessCallback) {
            onSuccessCallback();
          } else {
            // Default hash or path navigation
            window.location.hash = '#simulasi';
          }
        }, 800);
      }
    } catch (err: any) {
      console.warn('Admin login exception caught:', err);

      const nextAttempts = failedAttempts + 1;
      setFailedAttempts(nextAttempts);

      if (err instanceof ValidationException) {
        setErrors(err.errors);
        setStatus('error');
        setErrorMessage(err.message || 'Validasi formulir gagal.');
      } else if (err instanceof RateLimitException) {
        setStatus('locked');
        setLockoutSeconds(err.remainingSeconds);
        setErrorMessage(err.message);
      } else if (err instanceof AuthException) {
        setStatus('error');
        setErrorMessage(err.message);
      } else {
        setStatus('error');
        setErrorMessage('Gagal menghubungi server. Periksa koneksi Anda dan coba lagi.');
      }

      // Trigger lockout if attempts reach limit
      if (nextAttempts >= MAX_ATTEMPTS) {
        setStatus('locked');
        setLockoutSeconds(LOCKOUT_DURATION_SECONDS);
        setErrorMessage(
          `Terlalu banyak percobaan gagal (${nextAttempts}/${MAX_ATTEMPTS}). Formulir dibekukan selama ${LOCKOUT_DURATION_SECONDS} detik untuk keamanan.`
        );
      }
    }
  };

  return {
    values,
    errors,
    status,
    errorMessage,
    successMessage,
    showPassword,
    failedAttempts,
    lockoutSeconds,
    isSubmitting: status === 'loading',
    isLocked: status === 'locked' || lockoutSeconds > 0,
    handleChange,
    togglePasswordVisibility,
    handleFillDemo,
    handleSubmit,
  };
}
