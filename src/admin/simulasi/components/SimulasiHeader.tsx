import React from 'react';

export interface SimulasiHeaderProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onNavigateLanding?: () => void;
}

export const SimulasiHeader: React.FC<SimulasiHeaderProps> = ({
  activeTab = 'Simulasi',
  onTabChange,
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
    if (key === 'Keluar') {
      if (onNavigateLanding) {
        onNavigateLanding();
      } else {
        window.location.hash = '';
        window.location.pathname = '/';
      }
      return;
    }
    if (onTabChange) {
      onTabChange(key);
    }
  };

  return (
    <header className="simulasi-header" id="simulasi-header">
      <div className="simulasi-header__top-bar">
        <div className="simulasi-brand">
          <span className="simulasi-brand__logo">UMM</span>
        </div>

        <nav className="simulasi-nav" aria-label="Menu Utama Simulasi">
          {navItems.map((item) => {
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                type="button"
                className={`simulasi-nav__item ${isActive ? 'simulasi-nav__item--active' : ''}`}
                onClick={(e) => handleNavClick(item.key, e)}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="simulasi-header__hero">
        <div className="simulasi-header__eyebrow">Pusat Simulasi &amp; Data Kodifikasi Klinis</div>
        <h1 className="simulasi-header__title">
          SIRS <span className="simulasi-header__title--accent">Coding Service</span>
        </h1>
        <p className="simulasi-header__subtitle">
          Simulasi nyata: alur pasien end to end, coding ICD-10, klaim IN-CBG, dan rekap rumah sakit.
        </p>
      </div>
    </header>
  );
};

export default SimulasiHeader;
