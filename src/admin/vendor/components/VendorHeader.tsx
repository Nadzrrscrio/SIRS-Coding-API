/**
 * VendorHeader component
 * Follows the design pattern of SimulasiHeader:
 * - UMM brand logo
 * - Nav pills: Simulasi, Dokumentasi, Redoc, Manajemen (ACTIVE), Keluar
 * - Hero header with title and subtitle
 */

import React from 'react';

export interface VendorHeaderProps {
  onNavigateSimulasi?: () => void;
  onNavigateLogin?: () => void;
  onNavigateLanding?: () => void;
}

export const VendorHeader: React.FC<VendorHeaderProps> = ({
  onNavigateSimulasi,
  onNavigateLogin,
  onNavigateLanding,
}) => {
  const navItems = [
    { key: 'Simulasi', label: 'Simulasi' },
    { key: 'Dokumentasi', label: 'Dokumentasi' },
    { key: 'Redoc', label: 'Redoc' },
    { key: 'Manajemen', label: 'Manajemen' },
    { key: 'Keluar', label: 'Keluar' },
  ];

  const handleNavClick = (key: string, e: React.MouseEvent) => {
    e.preventDefault();
    try {
      if (key === 'Simulasi') {
        if (onNavigateSimulasi) onNavigateSimulasi();
        else window.location.hash = '#simulasi';
        return;
      }
      if (key === 'Keluar') {
        if (onNavigateLogin) onNavigateLogin();
        else window.location.hash = '#login';
        return;
      }
      if (key === 'Dokumentasi' || key === 'Redoc') {
        // Tombol kosong tanpa perpindahan sesuai instruksi
        return;
      }
      if (key === 'Manajemen') {
        // Sudah di halaman manajemen
        return;
      }
    } catch (err) {
      console.error(`Navigation error for key "${key}":`, err);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateLanding) onNavigateLanding();
    else {
      window.location.hash = '';
      window.location.pathname = '/';
    }
  };

  return (
    <header className="vendor-header" id="vendor-header">
      {/* Top Bar with Brand & Nav Pills */}
      <div className="vendor-header__top-bar">
        <div className="vendor-brand" onClick={handleLogoClick} role="button" tabIndex={0}>
          <span className="vendor-brand__logo">UMM</span>
        </div>

        <nav className="vendor-nav" aria-label="Menu Utama Layanan">
          {navItems.map((item) => {
            const isActive = item.key === 'Manajemen';
            return (
              <button
                key={item.key}
                type="button"
                className={`vendor-nav__item ${isActive ? 'vendor-nav__item--active' : ''}`}
                onClick={(e) => handleNavClick(item.key, e)}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Hero Header */}
      <div className="vendor-header__hero">
        <div className="vendor-header__eyebrow">Pusat Verifikasi &amp; Manajemen Akses</div>
        <h1 className="vendor-header__title">
          SIRS <span className="vendor-header__title--accent">Coding Service</span>
        </h1>
        <p className="vendor-header__subtitle">
          Simulasi nyata: alur pasien end to end, coding ICD-10, klaim IN-CBG, dan rekap rumah sakit.
        </p>
      </div>
    </header>
  );
};

export default VendorHeader;
