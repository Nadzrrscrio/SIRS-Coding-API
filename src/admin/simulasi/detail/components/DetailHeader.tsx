import React from 'react';

export interface DetailHeaderProps {
  onBackToSimulasi?: () => void;
  onNavigateLanding?: () => void;
}

export const DetailHeader: React.FC<DetailHeaderProps> = ({
  onBackToSimulasi,
  onNavigateLanding,
}) => {
  const navItems = [
    { key: 'Simulasi', label: 'Simulasi', active: true },
    { key: 'Dokumentasi', label: 'Dokumentasi', active: false },
    { key: 'Redoc', label: 'Redoc', active: false },
    { key: 'Manajemen', label: 'Manajemen', active: false },
    { key: 'Keluar', label: 'Keluar', active: false },
  ];

  const handleNavClick = (key: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (key === 'Simulasi' && onBackToSimulasi) {
      onBackToSimulasi();
      return;
    }
    if (key === 'Keluar') {
      window.location.hash = '#login';
      return;
    }
    if (key === 'Manajemen') {
      window.location.hash = '#manajemen';
      return;
    }
    if (key === 'Dokumentasi' || key === 'Redoc') {
      // Empty action
      return;
    }
  };

  return (
    <header className="detail-simulasi-header" id="detail-simulasi-header">
      <div className="detail-simulasi-header__top-bar">
        <div className="detail-simulasi-brand">
          <span className="detail-simulasi-brand__logo">UMM</span>
        </div>

        <nav className="detail-simulasi-nav" aria-label="Menu Utama Simulasi Detail">
          {navItems.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`detail-simulasi-nav__item ${item.active ? 'detail-simulasi-nav__item--active' : ''}`}
              onClick={(e) => handleNavClick(item.key, e)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="detail-simulasi-header__hero">
        <div className="detail-simulasi-header__eyebrow">Pusat Simulasi &amp; Data Kodifikasi Klinis</div>
        <h1 className="detail-simulasi-header__title">
          SIRS <span className="detail-simulasi-header__title--accent">Coding Service</span>
        </h1>
        <p className="detail-simulasi-header__subtitle">
          Simulasi nyata: alur pasien end to end, coding ICD-10, klaim IN-CBG, dan rekap rumah sakit.
        </p>
      </div>
    </header>
  );
};

export default DetailHeader;
