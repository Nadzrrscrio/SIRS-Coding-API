import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class SimulasiErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Simulasi Page Exception Caught:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="simulasi-error-container">
          <div className="simulasi-error-card">
            <h2 className="simulasi-error-title">Terjadi Kesalahan pada Halaman Simulasi</h2>
            <p className="simulasi-error-message">
              {this.state.error?.message || 'Terjadi masalah yang tidak terduga saat memproses data simulasi.'}
            </p>
            <button
              type="button"
              className="simulasi-button simulasi-button--primary"
              onClick={this.handleReset}
            >
              Coba Lagi
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SimulasiErrorBoundary;
