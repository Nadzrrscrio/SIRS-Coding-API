import React from 'react';
import { Patient } from '../../types/simulasi';

export interface PatientInfoCardProps {
  patient: Patient;
}

export const PatientInfoCard: React.FC<PatientInfoCardProps> = ({ patient }) => {
  const gender = patient.jenisKelamin || (patient.id === '1' ? 'Perempuan' : 'Laki-laki');
  const address = patient.alamat || 'Jl. Melati No. 12, Kota Surabaya';
  const nik = patient.nik || '0001234567890';
  const kelas = patient.kelas || (patient.jalur === 'Rawat inap' ? 'Kelas 2' : '-');
  const hariRawat = patient.lamaRawatDays || 4;
  const status = patient.status || 'selesai';

  return (
    <section className="detail-simulasi-card patient-info-card" id="patient-info-card">
      <div className="patient-info-header">
        <div className="patient-info-main">
          <h2 className="patient-info-name">{patient.nama}</h2>
          <div className="patient-info-meta">
            {patient.noMr} · {patient.usia} th · {gender}
          </div>
          <div className="patient-info-address">{address}</div>
        </div>

        <div className="patient-info-id" title="Nomor Induk Kependudukan / No. ID Pasien">
          {nik}
        </div>
      </div>

      <div className="stat-grid-5">
        {/* TRIASE */}
        <div className="stat-tile">
          <span className="stat-tile__label">TRIASE</span>
          <div className="stat-tile__value">
            <span className="badge-triase-berat">{patient.triase}</span>
          </div>
        </div>

        {/* JALUR */}
        <div className="stat-tile">
          <span className="stat-tile__label">JALUR</span>
          <div className="stat-tile__value">{patient.jalur}</div>
        </div>

        {/* KELAS */}
        <div className="stat-tile">
          <span className="stat-tile__label">KELAS</span>
          <div className="stat-tile__value">{kelas}</div>
        </div>

        {/* HARI RAWAT */}
        <div className="stat-tile">
          <span className="stat-tile__label">HARI RAWAT</span>
          <div className="stat-tile__value">{hariRawat}</div>
        </div>

        {/* STATUS */}
        <div className="stat-tile">
          <span className="stat-tile__label">STATUS</span>
          <div className="stat-tile__value">
            <span className="badge-status-selesai">{status}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientInfoCard;
