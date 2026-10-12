import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class DetailErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Detail Dashboard Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="detail-error-boundary">
          <div className="detail-error-boundary__icon">⚠️</div>
          <h2 className="detail-error-boundary__title">Terjadi Kesalahan</h2>
          <p className="detail-error-boundary__message">
            Dashboard detail tidak dapat dimuat. Silakan muat ulang halaman.
          </p>
          <button
            type="button"
            className="detail-error-boundary__btn"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Coba Lagi
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default DetailErrorBoundary;
