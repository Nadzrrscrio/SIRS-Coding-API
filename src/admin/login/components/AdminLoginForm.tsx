/**
 * AdminLoginForm component
 * Main card containing the "Masuk SIRS" authentication interface.
 * Implements strict accessibility, validation, and design patterns from Register page.
 */

import React, { useRef, useEffect } from 'react';
import { useAdminLogin } from '../hooks/useAdminLogin';
import AdminLoginAlert from './AdminLoginAlert';

export interface AdminLoginFormProps {
  onSuccess?: () => void;
  onNavigateRegister?: () => void;
}

export const AdminLoginForm: React.FC<AdminLoginFormProps> = ({
  onSuccess,
  onNavigateRegister,
}) => {
  const {
    values,
    errors,
    status,
    errorMessage,
    successMessage,
    showPassword,
    lockoutSeconds,
    isSubmitting,
    isLocked,
    handleChange,
    togglePasswordVisibility,
    handleSubmit,
  } = useAdminLogin(onSuccess);

  const usernameInputRef = useRef<HTMLInputElement>(null);

  // Autofocus username on mount
  useEffect(() => {
    try {
      if (!values.username && usernameInputRef.current) {
        usernameInputRef.current.focus();
      }
    } catch (err) {
      console.warn('Autofocus error:', err);
    }
  }, []);

  return (
    <div className="admin-login-card" id="admin-login-card">
      {/* Card Header */}
      <div className="admin-login-card__header">
        <div className="admin-login-card__badge-row">
          <span className="admin-login-card__role-pill">PORTAL AKSES</span>
        </div>
        <h2 className="admin-login-card__title">Masuk SIRS</h2>
        <p className="admin-login-card__subtitle">Admin &amp; manajer user</p>
      </div>

      {/* Notifications / Exception Alerts */}
      {status === 'success' && successMessage && (
        <AdminLoginAlert type="success" message={successMessage} />
      )}

      {status === 'locked' && errorMessage && (
        <AdminLoginAlert
          type="warning"
          message={errorMessage}
          countdown={lockoutSeconds}
        />
      )}

      {status === 'error' && errorMessage && !isLocked && (
        <AdminLoginAlert type="error" message={errorMessage} />
      )}

      {/* Login Form */}
      <form
        className="admin-login-form"
        onSubmit={handleSubmit}
        noValidate
        id="admin-form"
      >
        {/* Field: USERNAME */}
        <div className="admin-login-field" id="field-username-container">
          <label className="admin-login-field__label" htmlFor="admin-username">
            USERNAME
          </label>
          <div className="admin-login-field__input-wrap">
            <span className="admin-login-field__icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E20D20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <input
              ref={usernameInputRef}
              id="admin-username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder="username"
              className={`admin-login-field__input ${errors.username ? 'admin-login-field__input--error' : ''}`}
              value={values.username}
              onChange={(e) => handleChange('username', e.target.value)}
              disabled={isSubmitting || isLocked}
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? 'username-error-msg' : undefined}
            />
          </div>
          {errors.username && (
            <span
              className="admin-login-field__error"
              id="username-error-msg"
              role="alert"
            >
              {errors.username}
            </span>
          )}
        </div>

        {/* Field: PASSWORD */}
        <div className="admin-login-field" id="field-password-container">
          <label className="admin-login-field__label" htmlFor="admin-password">
            PASSWORD
          </label>
          <div className="admin-login-field__input-wrap">
            <span className="admin-login-field__icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E20D20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <input
              id="admin-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="password"
              className={`admin-login-field__input ${errors.password ? 'admin-login-field__input--error' : ''}`}
              value={values.password}
              onChange={(e) => handleChange('password', e.target.value)}
              disabled={isSubmitting || isLocked}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error-msg' : undefined}
            />
            <button
              type="button"
              className="admin-login-field__toggle-pw"
              onClick={togglePasswordVisibility}
              tabIndex={-1}
              aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              disabled={isSubmitting || isLocked}
            >
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#62748E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#62748E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          {errors.password && (
            <span
              className="admin-login-field__error"
              id="password-error-msg"
              role="alert"
            >
              {errors.password}
            </span>
          )}
        </div>

        {/* Remember Me Checkbox */}
        <div className="admin-login-options">
          <label className="admin-login-checkbox-label">
            <input
              type="checkbox"
              className="admin-login-checkbox"
              checked={values.rememberMe}
              onChange={(e) => handleChange('rememberMe', e.target.checked)}
              disabled={isSubmitting || isLocked}
            />
            <span>Ingat username saya</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`admin-login-submit-btn ${isSubmitting ? 'admin-login-submit-btn--loading' : ''}`}
          disabled={isSubmitting || isLocked}
          id="admin-login-submit"
        >
          {isSubmitting ? (
            <span className="admin-login-submit-btn__content">
              <svg className="admin-login-spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" />
                <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
              </svg>
              <span>Memproses...</span>
            </span>
          ) : (
            <span>Masuk</span>
          )}
        </button>

        {/* Footer Note From Mockup: "Login admin = password adalah nilai SIRS_ADMIN_TOKEN di .env" */}
        <div className="admin-login-env-hint" id="admin-env-hint">
          <p className="admin-login-env-hint__text">
            Login admin = password adalah nilai <code className="admin-login-env-code">SIRS_ADMIN_TOKEN</code> di <code className="admin-login-env-code">.env</code>
          </p>
        </div>
      </form>
    </div>
  );
};

export default AdminLoginForm;
