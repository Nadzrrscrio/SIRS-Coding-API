/**
 * AdminLoginErrorBoundary component
 * Catches any unexpected rendering errors and presents a recovery fallback.
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class AdminLoginErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error inside AdminLogin:', error, errorInfo);
  }

  private handleReload = () => {
    try {
      this.setState({ hasError: false, error: null });
      window.location.reload();
    } catch {
      window.location.href = window.location.href;
    }
  };

  private handleGoHome = () => {
    try {
      window.location.hash = '';
      window.location.pathname = '/';
    } catch {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="admin-login-error-fallback" role="alert">
          <div className="admin-login-error-card">
            <div className="admin-login-error-icon" aria-hidden="true">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#E20D20" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h2 className="admin-login-error-title">Terjadi Kesalahan Sistem</h2>
            <p className="admin-login-error-desc">
              Halaman login admin mengalami gangguan saat memuat komponen:
              <br />
              <code className="admin-login-error-code">
                {this.state.error?.message || 'Unknown render exception'}
              </code>
            </p>
            <div className="admin-login-error-actions">
              <button
                type="button"
                className="admin-login-btn admin-login-btn--primary"
                onClick={this.handleReload}
              >
                Muat Ulang Halaman
              </button>
              <button
                type="button"
                className="admin-login-btn admin-login-btn--secondary"
                onClick={this.handleGoHome}
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AdminLoginErrorBoundary;
