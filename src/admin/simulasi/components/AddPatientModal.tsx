import React, { useState } from 'react';
import { Patient, JalurPasien, TriasePasien } from '../types/simulasi';

export interface AddPatientModalProps {
  onClose: () => void;
  onAdd: (patient: Patient) => void;
  nextMrNumber: string;
}

export const AddPatientModal: React.FC<AddPatientModalProps> = ({
  onClose,
  onAdd,
  nextMrNumber,
}) => {
  const [noMr, setNoMr] = useState(nextMrNumber);
  const [nama, setNama] = useState('');
  const [usia, setUsia] = useState<number | ''>(35);
  const [jalur, setJalur] = useState<JalurPasien>('Rawat inap');
  const [triase, setTriase] = useState<TriasePasien>('Berat');
  const [diagnosis, setDiagnosis] = useState('');
  const [icd10, setIcd10] = useState('');
  const [inCbg, setInCbg] = useState('');
  const [total, setTotal] = useState<number | ''>(3500000);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    try {
      if (!nama.trim()) {
        setErrorMsg('Nama pasien wajib diisi.');
        return;
      }
      if (!diagnosis.trim()) {
        setErrorMsg('Diagnosis pasien wajib diisi.');
        return;
      }
      if (!icd10.trim()) {
        setErrorMsg('Kode ICD-10 wajib diisi.');
        return;
      }

      const newPatient: Patient = {
        id: String(Date.now()),
        noMr: noMr.trim() || `RM-00${Math.floor(Math.random() * 90 + 10)}`,
        nama: nama.trim(),
        usia: Number(usia) || 30,
        jalur,
        triase,
        diagnosis: diagnosis.trim(),
        icd10: icd10.trim().toUpperCase(),
        inCbg: (inCbg.trim() || 'A-1-01-I').toUpperCase(),
        total: Number(total) || 2500000,
        lamaRawatDays: jalur === 'Rawat inap' ? 3 : 1,
        tanggalMasuk: new Date().toISOString().split('T')[0],
      };

      onAdd(newPatient);
      onClose();
    } catch (err) {
      console.error('Error adding new patient:', err);
      setErrorMsg('Gagal menambahkan data pasien. Periksa kembali format input.');
    }
  };

  return (
    <div className="simulasi-modal-backdrop" onClick={onClose}>
      <div className="simulasi-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="simulasi-modal-header">
          <div>
            <span className="simulasi-modal-eyebrow">INPUT PASIEN BARU</span>
            <h2 className="simulasi-modal-title">Simulasi Kode Pasien</h2>
          </div>
          <button type="button" className="simulasi-modal-close-btn" onClick={onClose} aria-label="Tutup modal">
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="simulasi-modal-body">
          {errorMsg && (
            <div className="simulasi-alert simulasi-alert--error">
              {errorMsg}
            </div>
          )}

          <div className="simulasi-form-grid">
            <div className="simulasi-form-field">
              <label className="simulasi-form-field__label">NO MR</label>
              <input
                type="text"
                className="simulasi-input"
                value={noMr}
                onChange={(e) => setNoMr(e.target.value)}
                required
              />
            </div>

            <div className="simulasi-form-field">
              <label className="simulasi-form-field__label">NAMA PASIEN</label>
              <input
                type="text"
                className="simulasi-input"
                placeholder="Contoh: Rahma Melati"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
              />
            </div>

            <div className="simulasi-form-field">
              <label className="simulasi-form-field__label">USIA (TAHUN)</label>
              <input
                type="number"
                className="simulasi-input"
                value={usia}
                onChange={(e) => setUsia(e.target.value ? Number(e.target.value) : '')}
                min={0}
                max={120}
                required
              />
            </div>

            <div className="simulasi-form-field">
              <label className="simulasi-form-field__label">JALUR RAWAT</label>
              <select
                className="simulasi-select"
                value={jalur}
                onChange={(e) => setJalur(e.target.value as JalurPasien)}
              >
                <option value="Rawat inap">Rawat inap</option>
                <option value="Rawat jalan">Rawat jalan</option>
              </select>
            </div>

            <div className="simulasi-form-field">
              <label className="simulasi-form-field__label">STATUS TRIASE</label>
              <select
                className="simulasi-select"
                value={triase}
                onChange={(e) => setTriase(e.target.value as TriasePasien)}
              >
                <option value="Sangat Berat">Sangat Berat</option>
                <option value="Berat">Berat</option>
                <option value="Sedang">Sedang</option>
                <option value="Ringan">Ringan</option>
              </select>
            </div>

            <div className="simulasi-form-field">
              <label className="simulasi-form-field__label">ESTIMASI TOTAL BIAYA (RP)</label>
              <input
                type="number"
                className="simulasi-input"
                value={total}
                onChange={(e) => setTotal(e.target.value ? Number(e.target.value) : '')}
                placeholder="3500000"
              />
            </div>
          </div>

          <div className="simulasi-form-field">
            <label className="simulasi-form-field__label">DIAGNOSIS KLINIS</label>
            <input
              type="text"
              className="simulasi-input"
              placeholder="Contoh: Acute bronchitis, unspecified"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              required
            />
          </div>

          <div className="simulasi-form-grid">
            <div className="simulasi-form-field">
              <label className="simulasi-form-field__label">KODE ICD-10</label>
              <input
                type="text"
                className="simulasi-input"
                placeholder="J20.9"
                value={icd10}
                onChange={(e) => setIcd10(e.target.value)}
                required
              />
            </div>

            <div className="simulasi-form-field">
              <label className="simulasi-form-field__label">KODE IN-CBG</label>
              <input
                type="text"
                className="simulasi-input"
                placeholder="J-4-16-I"
                value={inCbg}
                onChange={(e) => setInCbg(e.target.value)}
              />
            </div>
          </div>

          <div className="simulasi-modal-footer">
            <button
              type="button"
              className="simulasi-button simulasi-button--secondary"
              onClick={onClose}
            >
              Batal
            </button>
            <button
              type="submit"
              className="simulasi-button simulasi-button--primary"
            >
              Simpan &amp; Proses Simulasi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatientModal;
