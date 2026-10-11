/**
 * AdminLoginAlert component
 * Renders dismissible or locked error/success alerts matching Register design patterns.
 */

import React from 'react';

export interface AdminLoginAlertProps {
  type: 'error' | 'success' | 'warning';
  message: string;
  onDismiss?: () => void;
  countdown?: number;
}

export const AdminLoginAlert: React.FC<AdminLoginAlertProps> = ({
  type,
  message,
  onDismiss,
  countdown,
}) => {
  if (!message) return null;

  return (
    <div
      className={`admin-login-alert admin-login-alert--${type}`}
      role="alert"
      aria-live="polite"
    >
      <div className="admin-login-alert__icon" aria-hidden="true">
        {type === 'success' && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        )}
        {type === 'error' && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E20D20" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        )}
        {type === 'warning' && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        )}
      </div>

      <div className="admin-login-alert__content">
        <span className="admin-login-alert__text">{message}</span>
        {typeof countdown === 'number' && countdown > 0 && (
          <span className="admin-login-alert__badge">
            {countdown}s
          </span>
        )}
      </div>

      {onDismiss && (
        <button
          type="button"
          className="admin-login-alert__close"
          onClick={onDismiss}
          aria-label="Tutup notifikasi"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default AdminLoginAlert;
