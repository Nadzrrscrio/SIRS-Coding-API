import React from 'react';

interface DetailHeaderProps {
  onNavigateLanding?: () => void;
  onNavigateSimulasi?: () => void;
  onNavigateVendor?: () => void;
  lastUpdated: string;
}

const DetailHeader: React.FC<DetailHeaderProps> = ({
  onNavigateLanding,
  onNavigateSimulasi,
  onNavigateVendor,
  lastUpdated,
}) => {
  return (
    <header className="detail-header" id="detail-header">
      {/* Top bar */}
      <div className="detail-header__topbar">
        <button
          type="button"
          className="detail-header__back-btn"
          onClick={onNavigateLanding}
          aria-label="Kembali ke halaman utama"
        >
          ← Beranda
        </button>
        <div className="detail-header__breadcrumb">
          <span>Admin</span>
          <span className="detail-header__breadcrumb-sep">›</span>
          <span className="detail-header__breadcrumb-active">Detail Dashboard</span>
        </div>
        <span className="detail-header__timestamp">
          🕐 Diperbarui: {lastUpdated}
        </span>
      </div>

      {/* Title section */}
      <div className="detail-header__main">
        <div className="detail-header__title-group">
          <div className="detail-header__eyebrow">ADMIN PANEL · SIRS.ID</div>
          <h1 className="detail-header__title">
            Detail <em>Dashboard</em>
          </h1>
          <p className="detail-header__subtitle">
            Ringkasan lengkap data pasien, vendor, dan performa sistem koding klinis.
          </p>
        </div>

        {/* Quick nav tabs */}
        <nav className="detail-header__tabs" aria-label="Navigasi admin">
          <button
            type="button"
            className="detail-header__tab detail-header__tab--active"
            aria-current="page"
          >
            📊 Overview
          </button>
          <button
            type="button"
            className="detail-header__tab"
            onClick={onNavigateSimulasi}
          >
            🏥 Simulasi
          </button>
          <button
            type="button"
            className="detail-header__tab"
            onClick={onNavigateVendor}
          >
            🏢 Vendor
          </button>
        </nav>
      </div>
    </header>
  );
};

export default DetailHeader;
