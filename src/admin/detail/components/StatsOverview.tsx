import React from 'react';
import { DashboardStats } from '../types/detail';

interface StatsOverviewProps {
  stats: DashboardStats;
  isRefreshing: boolean;
  onRefresh: () => void;
}

const formatCurrency = (val: number): string => {
  try {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  } catch {
    return `Rp ${val}`;
  }
};

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats, isRefreshing, onRefresh }) => {
  const mainCards = [
    {
      id: 'total-pasien',
      icon: '👤',
      label: 'Total Pasien',
      value: stats.totalPasien.toString(),
      sub: `${stats.rawatInap} Inap · ${stats.rawatJalan} Jalan`,
      accent: 'red',
    },
    {
      id: 'total-biaya',
      icon: '💰',
      label: 'Total Klaim BPJS',
      value: formatCurrency(stats.totalBiaya),
      sub: `Rata lama rawat: ${stats.rataLamaRawat.toFixed(1)} hari`,
      accent: 'green',
    },
    {
      id: 'total-vendor',
      icon: '🏢',
      label: 'Total Vendor',
      value: stats.totalVendor.toString(),
      sub: `${stats.vendorApproved} Approved · ${stats.vendorPending} Pending`,
      accent: 'blue',
    },
    {
      id: 'total-api-key',
      icon: '🔑',
      label: 'API Key Aktif',
      value: stats.totalApiKey.toString(),
      sub: `${stats.vendorRejected} Ditolak`,
      accent: 'purple',
    },
  ];

  return (
    <section className="stats-overview" aria-labelledby="stats-title" id="stats-overview">
      <div className="stats-overview__header">
        <h2 className="stats-overview__title" id="stats-title">
          Ringkasan Sistem
        </h2>
        <button
          type="button"
          className={`stats-overview__refresh-btn ${isRefreshing ? 'stats-overview__refresh-btn--spinning' : ''}`}
          onClick={onRefresh}
          aria-label="Perbarui data"
          disabled={isRefreshing}
        >
          ↻ {isRefreshing ? 'Memperbarui...' : 'Perbarui'}
        </button>
      </div>

      {/* Main stat cards */}
      <div className="stats-overview__cards" role="list">
        {mainCards.map((card) => (
          <article
            key={card.id}
            id={card.id}
            className={`stat-card stat-card--${card.accent}`}
            role="listitem"
          >
            <div className="stat-card__icon" aria-hidden="true">{card.icon}</div>
            <div className="stat-card__body">
              <span className="stat-card__label">{card.label}</span>
              <strong className="stat-card__value">{card.value}</strong>
              <span className="stat-card__sub">{card.sub}</span>
            </div>
          </article>
        ))}
      </div>

      {/* Triase distribution bar */}
      <div className="triase-distribution" aria-label="Distribusi triase pasien">
        <div className="triase-distribution__header">
          <span className="triase-distribution__label">Distribusi Triase Pasien</span>
          <span className="triase-distribution__total">{stats.totalPasien} pasien</span>
        </div>
        <div className="triase-distribution__bar" role="img" aria-label="Bar distribusi triase">
          {stats.distribusiTriase.map((d) => (
            <div
              key={d.triase}
              className="triase-distribution__segment"
              style={{
                width: `${(d.jumlah / stats.totalPasien) * 100}%`,
                backgroundColor: d.warna,
              }}
              title={`${d.triase}: ${d.jumlah} pasien`}
            />
          ))}
        </div>
        <div className="triase-distribution__legend">
          {stats.distribusiTriase.map((d) => (
            <div key={d.triase} className="triase-distribution__legend-item">
              <span
                className="triase-distribution__legend-dot"
                style={{ backgroundColor: d.warna }}
                aria-hidden="true"
              />
              <span className="triase-distribution__legend-text">
                {d.triase} <strong>({d.jumlah})</strong>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Biaya trend mini chart */}
      <div className="biaya-trend" aria-label="Tren biaya per bulan">
        <div className="biaya-trend__header">
          <span className="biaya-trend__label">Tren Klaim Biaya (4 Bulan Terakhir)</span>
        </div>
        <div className="biaya-trend__bars">
          {stats.biayaPerBulan.map((b, i) => {
            const maxBiaya = Math.max(...stats.biayaPerBulan.map((x) => x.totalBiaya));
            const heightPct = (b.totalBiaya / maxBiaya) * 100;
            return (
              <div key={b.bulan} className="biaya-trend__bar-col">
                <span className="biaya-trend__bar-val">
                  {(b.totalBiaya / 1_000_000).toFixed(1)}jt
                </span>
                <div className="biaya-trend__bar-wrap">
                  <div
                    className={`biaya-trend__bar ${i === stats.biayaPerBulan.length - 1 ? 'biaya-trend__bar--current' : ''}`}
                    style={{ height: `${heightPct}%` }}
                    title={`${b.bulan}: ${formatCurrency(b.totalBiaya)}`}
                  />
                </div>
                <span className="biaya-trend__bar-bulan">{b.bulan}</span>
                <span className="biaya-trend__bar-pasien">{b.jumlahPasien}p</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsOverview;
