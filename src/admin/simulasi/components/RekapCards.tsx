import React from 'react';
import { RekapRumahSakit } from '../types/simulasi';

export interface RekapCardsProps {
  rekap: RekapRumahSakit;
  onRefresh: () => void;
  isRefreshing?: boolean;
  lastUpdated?: string;
}

export const RekapCards: React.FC<RekapCardsProps> = ({
  rekap,
  onRefresh,
  isRefreshing = false,
  lastUpdated,
}) => {
  const formatCurrency = (val: number): string => {
    try {
      if (isNaN(val) || val === null || val === undefined) return '0';
      return new Intl.NumberFormat('id-ID').format(val);
    } catch (err) {
      console.error('Error formatting currency:', err);
      return String(val || 0);
    }
  };

  const formatDecimal = (val: number): string => {
    try {
      if (isNaN(val) || val === null || val === undefined) return '0';
      return val % 1 === 0 ? val.toString() : val.toFixed(1);
    } catch (err) {
      console.error('Error formatting decimal:', err);
      return String(val || 0);
    }
  };

  const metrics = [
    {
      id: 'total-pasien',
      label: 'TOTAL PASIEN',
      value: formatCurrency(rekap.totalPasien),
      unit: '',
    },
    {
      id: 'rawat-inap',
      label: 'RAWAT INAP',
      value: formatCurrency(rekap.rawatInap),
      unit: '',
    },
    {
      id: 'rawat-jalan',
      label: 'RAWAT JALAN',
      value: formatCurrency(rekap.rawatJalan),
      unit: '',
    },
    {
      id: 'total-biaya',
      label: 'TOTAL BIAYA',
      value: formatCurrency(rekap.totalBiaya),
      unit: '',
    },
    {
      id: 'rata-lama-rawat',
      label: 'RATA2 LAMA RAWAT',
      value: formatDecimal(rekap.rataLamaRawat),
      unit: 'hr',
    },
    {
      id: 'rata-biaya-rawat-inap',
      label: 'RATA2 BIAYA RAWAT INAP',
      value: formatCurrency(rekap.rataBiayaRawatInap),
      unit: '',
    },
  ];

  return (
    <section className="simulasi-card rekap-section" id="rekap-section">
      <div className="rekap-section__header">
        <div className="rekap-section__title-group">
          <h2 className="rekap-section__title">Rekap rumah sakit</h2>
          {lastUpdated && (
            <span className="rekap-section__timestamp">Diperbarui: {lastUpdated}</span>
          )}
        </div>

        <button
          type="button"
          className={`rekap-section__refresh-btn ${isRefreshing ? 'rekap-section__refresh-btn--loading' : ''}`}
          onClick={onRefresh}
          disabled={isRefreshing}
          aria-label="Refresh Data Rekap"
        >
          <span className={`refresh-indicator ${isRefreshing ? 'refresh-indicator--spin' : ''}`} />
          <span>{isRefreshing ? 'Memperbarui...' : 'Refresh'}</span>
        </button>
      </div>

      <div className="rekap-grid">
        {metrics.map((metric) => (
          <div key={metric.id} className="metric-card">
            <div className="metric-card__header">
              <span className="metric-card__label">{metric.label}</span>
            </div>
            <div className="metric-card__body">
              <span className="metric-card__value">{metric.value}</span>
              {metric.unit && <span className="metric-card__unit">{metric.unit}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RekapCards;
