/**
 * VendorErrorBoundary component
 * Catches runtime exceptions in Vendor/Management module and displays recovery UI.
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class VendorErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error inside Vendor module:', error, errorInfo);
  }

  private handleReload = () => {
    try {
      this.setState({ hasError: false, error: null });
      window.location.reload();
    } catch {
      window.location.href = window.location.href;
    }
  };

  private handleGoSimulasi = () => {
    try {
      window.location.hash = '#simulasi';
    } catch {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="vendor-error-fallback" role="alert">
          <div className="vendor-error-card">
            <div className="vendor-error-icon" aria-hidden="true">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#E20D20" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h2 className="vendor-error-title">Gagal Memuat Manajemen Registrasi</h2>
            <p className="vendor-error-desc">
              Terjadi kesalahan tak terduga pada komponen tabel pendaftar:
              <br />
              <code className="vendor-error-code">
                {this.state.error?.message || 'Unknown render exception'}
              </code>
            </p>
            <div className="vendor-error-actions">
              <button
                type="button"
                className="simulasi-button simulasi-button--primary"
                onClick={this.handleReload}
              >
                Muat Ulang Halaman
              </button>
              <button
                type="button"
                className="simulasi-button simulasi-button--secondary"
                onClick={this.handleGoSimulasi}
              >
                Kembali ke Simulasi
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default VendorErrorBoundary;
