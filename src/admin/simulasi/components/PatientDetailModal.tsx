import React, { useState } from 'react';
import { Patient } from '../types/simulasi';

export interface PatientDetailModalProps {
  patient: Patient | null;
  onClose: () => void;
  onSave?: (updatedPatient: Patient) => void;
}

export const PatientDetailModal: React.FC<PatientDetailModalProps> = ({
  patient,
  onClose,
  onSave,
}) => {
  if (!patient) return null;

  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationSuccess, setSimulationSuccess] = useState<string | null>(null);
  const [editedDiagnosis, setEditedDiagnosis] = useState(patient.diagnosis);
  const [simulatedIcd10, setSimulatedIcd10] = useState(patient.icd10);
  const [simulatedInCbg, setSimulatedInCbg] = useState(patient.inCbg);

  const formatCurrency = (val: number): string => {
    try {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
    } catch {
      return `Rp ${val}`;
    }
  };

  const handleSimulateCoding = () => {
    setIsSimulating(true);
    setSimulationSuccess(null);

    // Exception handling inside async process simulation
    try {
      setTimeout(() => {
        setIsSimulating(false);
        setSimulationSuccess('Pengkodean ICD-10 & IN-CBG berhasil diverifikasi ulang oleh SIRS AI Pipeline!');
        
        if (onSave) {
          onSave({
            ...patient,
            diagnosis: editedDiagnosis,
            icd10: simulatedIcd10,
            inCbg: simulatedInCbg,
          });
        }
      }, 700);
    } catch (err) {
      console.error('Error simulating API coding:', err);
      setIsSimulating(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <span className="modal-eyebrow">DETAIL SIMULASI KODIFIKASI</span>
            <h2 className="modal-title">{patient.nama}</h2>
            <div className="modal-subtext">No. MR: <strong>{patient.noMr}</strong></div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Tutup modal">
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="modal-body">
          {simulationSuccess && (
            <div className="simulasi-alert simulasi-alert--success">
              <span>✅</span> {simulationSuccess}
            </div>
          )}

          {/* Quick Info Grid */}
          <div className="patient-info-grid">
            <div className="info-box">
              <span className="info-box__label">Usia</span>
              <span className="info-box__val">{patient.usia} Tahun</span>
            </div>
            <div className="info-box">
              <span className="info-box__label">Jalur Rawat</span>
              <span className="info-box__val">{patient.jalur}</span>
            </div>
            <div className="info-box">
              <span className="info-box__label">Triase</span>
              <span className={`triase-badge triase-badge--${patient.triase.toLowerCase().replace(' ', '-')}`}>
                {patient.triase}
              </span>
            </div>
            <div className="info-box">
              <span className="info-box__label">Total Biaya Klaim</span>
              <span className="info-box__val font-bold text-red">
                {formatCurrency(patient.total)}
              </span>
            </div>
          </div>

          {/* Diagnosis & Coding Section */}
          <div className="coding-section">
            <h3 className="coding-section__title">Hasil Mapping SIRS AI Pipeline</h3>
            
            <div className="form-field">
              <label className="form-field__label">DIAGNOSIS KLINIS DOKTER</label>
              <textarea
                className="simulasi-textarea"
                value={editedDiagnosis}
                onChange={(e) => setEditedDiagnosis(e.target.value)}
                placeholder="Masukkan diagnosis dokter..."
              />
            </div>

            <div className="coding-cards-grid">
              {/* ICD-10 Card */}
              <div className="code-result-card">
                <div className="code-result-card__header">
                  <span className="code-result-card__type">ICD-10 Code</span>
                  <span className="code-result-card__confidence">98.5% Match</span>
                </div>
                <div className="code-result-card__badge code-badge--icd10">
                  <input
                    type="text"
                    className="code-input"
                    value={simulatedIcd10}
                    onChange={(e) => setSimulatedIcd10(e.target.value)}
                  />
                </div>
                <p className="code-result-card__desc">
                  {patient.icd10Desc || patient.diagnosis}
                </p>
              </div>

              {/* IN-CBG Card */}
              <div className="code-result-card">
                <div className="code-result-card__header">
                  <span className="code-result-card__type">IN-CBG Group</span>
                  <span className="code-result-card__confidence">Verified</span>
                </div>
                <div className="code-result-card__badge code-badge--incbg">
                  <input
                    type="text"
                    className="code-input"
                    value={simulatedInCbg}
                    onChange={(e) => setSimulatedInCbg(e.target.value)}
                  />
                </div>
                <p className="code-result-card__desc">
                  {patient.inCbgDesc || 'Kelompok Tarif IN-CBG Regional I'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button
            type="button"
            className="simulasi-button simulasi-button--secondary"
            onClick={onClose}
          >
            Tutup
          </button>
          <button
            type="button"
            className={`simulasi-button simulasi-button--primary ${isSimulating ? 'simulasi-button--loading' : ''}`}
            onClick={handleSimulateCoding}
            disabled={isSimulating}
          >
            {isSimulating ? 'Memproses SIRS API...' : '⚡ Jalankan Re-Simulasi API'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailModal;
