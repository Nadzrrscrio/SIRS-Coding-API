/**
 * AdminLoginHeader component
 * Displays the top navigation bar and title based on the design mockup:
 * - Brand: "SIRS Coding Service" with UMM badge
 * - Subtitle: "Simulasi nyata: alur pasien end to end, coding ICD-10, klaim IN-CBG, dan rekap rumah sakit."
 * - Navigation pills: "Simulasi", "Dokumentasi", "Redoc"
 */

import React from 'react';

export interface AdminLoginHeaderProps {
  onNavigateSimulasi?: () => void;
  onNavigateDocs?: () => void;
  onNavigateRedoc?: () => void;
  onNavigateLanding?: () => void;
}

export const AdminLoginHeader: React.FC<AdminLoginHeaderProps> = ({
  onNavigateSimulasi,
  onNavigateDocs,
  onNavigateRedoc,
  onNavigateLanding,
}) => {
  const handleNavClick = (
    target: 'simulasi' | 'docs' | 'redoc' | 'landing',
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    try {
      if (target === 'simulasi') {
        if (onNavigateSimulasi) onNavigateSimulasi();
        else window.location.hash = '#simulasi';
      } else if (target === 'docs' || target === 'redoc') {
        // Tombol kosong tanpa fungsi perpindahan
        return;
      } else if (target === 'landing') {
        if (onNavigateLanding) onNavigateLanding();
        else {
          window.location.hash = '';
          window.location.pathname = '/';
        }
      }
    } catch (err) {
      console.error(`Navigation error for target "${target}":`, err);
    }
  };

  return (
    <header className="admin-login-header" id="admin-login-header">
      <div className="admin-login-header__container">
        {/* Left Side: Brand & Subtitle */}
        <div className="admin-login-header__brand-block">
          <div className="admin-login-header__brand-row">
            <button
              type="button"
              className="admin-login-header__umm-logo"
              onClick={(e) => handleNavClick('landing', e)}
              title="Kembali ke Beranda"
            >
              UMM
            </button>
            <h1 className="admin-login-header__title">
              SIRS <span className="admin-login-header__title--accent">Coding Service</span>
            </h1>
          </div>
          <p className="admin-login-header__subtitle">
            Simulasi nyata: alur pasien end to end, coding ICD-10, klaim IN-CBG, dan rekap rumah sakit.
          </p>
        </div>

        {/* Right Side: Navigation Pills */}
        <nav className="admin-login-header__nav" aria-label="Menu Layanan SIRS">
          <button
            type="button"
            className="admin-login-nav-pill"
            id="nav-simulasi-btn"
            onClick={(e) => handleNavClick('simulasi', e)}
          >
            Simulasi
          </button>
          <button
            type="button"
            className="admin-login-nav-pill"
            id="nav-docs-btn"
            onClick={(e) => handleNavClick('docs', e)}
          >
            Dokumentasi
          </button>
          <button
            type="button"
            className="admin-login-nav-pill"
            id="nav-redoc-btn"
            onClick={(e) => handleNavClick('redoc', e)}
          >
            Redoc
          </button>
        </nav>
      </div>
    </header>
  );
};

export default AdminLoginHeader;
