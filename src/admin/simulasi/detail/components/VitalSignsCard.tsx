import React from 'react';
import { VitalSigns } from '../../types/simulasi';
import { DEFAULT_VITAL_SIGNS } from '../constants';

export interface VitalSignsCardProps {
  vitalSigns?: VitalSigns;
}

export const VitalSignsCard: React.FC<VitalSignsCardProps> = ({ vitalSigns = DEFAULT_VITAL_SIGNS }) => {
  return (
    <section className="detail-simulasi-card vital-signs-card" id="vital-signs-card">
      <h3 className="detail-card-title">
        <span>VITAL SIGN</span>
      </h3>

      <div className="stat-grid-5">
        {/* TD */}
        <div className="stat-tile">
          <span className="stat-tile__label">TD</span>
          <div className="stat-tile__value">
            <span className="vital-val">{vitalSigns.td}</span>
            <span className="vital-unit">mmHg</span>
          </div>
        </div>

        {/* HR */}
        <div className="stat-tile">
          <span className="stat-tile__label">HR</span>
          <div className="stat-tile__value">
            <span className="vital-val">{vitalSigns.hr}</span>
            <span className="vital-unit">bpm</span>
          </div>
        </div>

        {/* RR */}
        <div className="stat-tile">
          <span className="stat-tile__label">RR</span>
          <div className="stat-tile__value">
            <span className="vital-val">{vitalSigns.rr}</span>
            <span className="vital-unit">x/mnt</span>
          </div>
        </div>

        {/* SUHU */}
        <div className="stat-tile">
          <span className="stat-tile__label">SUHU</span>
          <div className="stat-tile__value">
            <span className="vital-val">{vitalSigns.suhu}</span>
          </div>
        </div>

        {/* SPO2 */}
        <div className="stat-tile">
          <span className="stat-tile__label">SPO2</span>
          <div className="stat-tile__value">
            <span className="vital-val">{vitalSigns.spo2}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VitalSignsCard;
