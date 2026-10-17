import React from 'react';

export interface KlaimInCbgCardProps {
  kelompokKasus?: string;
  kodeCbg: string;
  biayaTindakan?: number;
  biayaRawat?: number;
  totalBiaya: number;
}

export const KlaimInCbgCard: React.FC<KlaimInCbgCardProps> = ({
  kelompokKasus = 'Dengue Fever',
  kodeCbg,
  biayaTindakan = 250000,
  biayaRawat = 2000000,
  totalBiaya,
}) => {
  const formatNumber = (val: number): string => {
    try {
      return new Intl.NumberFormat('id-ID').format(val);
    } catch {
      return String(val);
    }
  };

  return (
    <section className="detail-simulasi-card incbg-card" id="incbg-card">
      <h3 className="detail-card-title">
        <span>KLAIM IN-CBG</span>
      </h3>

      <div className="incbg-metrics-grid">
        {/* KELOMPOK KASUS */}
        <div className="incbg-tile">
          <span className="incbg-tile__label">KELOMPOK KASUS</span>
          <div className="incbg-tile__val">{kelompokKasus}</div>
        </div>

        {/* KODE CBG */}
        <div className="incbg-tile">
          <span className="incbg-tile__label">KODE CBG</span>
          <div className="incbg-tile__val">
            <span className="incbg-tile__val--code">{kodeCbg}</span>
          </div>
        </div>

        {/* BIAYA TINDAKAN */}
        <div className="incbg-tile">
          <span className="incbg-tile__label">BIAYA TINDAKAN</span>
          <div className="incbg-tile__val">{formatNumber(biayaTindakan)}</div>
        </div>

        {/* BIAYA RAWAT */}
        <div className="incbg-tile">
          <span className="incbg-tile__label">BIAYA RAWAT</span>
          <div className="incbg-tile__val">{formatNumber(biayaRawat)}</div>
        </div>

        {/* TOTAL BIAYA */}
        <div className="incbg-tile incbg-tile--highlight">
          <span className="incbg-tile__label">TOTAL BIAYA</span>
          <div className="incbg-tile__val incbg-tile__val--total">
            {formatNumber(totalBiaya)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KlaimInCbgCard;
