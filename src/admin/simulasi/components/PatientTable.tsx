import React, { useState, useMemo } from 'react';
import { Patient, TriasePasien } from '../types/simulasi';

export interface PatientTableProps {
  patients: Patient[];
  onAddPatient?: () => void;
}

export const PatientTable: React.FC<PatientTableProps> = ({
  patients,
  onAddPatient,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJalur, setSelectedJalur] = useState<string>('Semua jalur');
  const [selectedTriase, setSelectedTriase] = useState<string>('Semua status');

  const filteredPatients = useMemo(() => {
    try {
      return patients.filter((patient) => {
        const query = searchTerm.trim().toLowerCase();
        const matchesSearch =
          !query ||
          (patient.noMr && patient.noMr.toLowerCase().includes(query)) ||
          (patient.nama && patient.nama.toLowerCase().includes(query)) ||
          (patient.diagnosis && patient.diagnosis.toLowerCase().includes(query)) ||
          (patient.icd10 && patient.icd10.toLowerCase().includes(query)) ||
          (patient.inCbg && patient.inCbg.toLowerCase().includes(query));

        const matchesJalur =
          selectedJalur === 'Semua jalur' || patient.jalur === selectedJalur;

        const matchesTriase =
          selectedTriase === 'Semua status' || patient.triase === selectedTriase;

        return matchesSearch && matchesJalur && matchesTriase;
      });
    } catch (err) {
      console.error('Error filtering patients list:', err);
      return patients;
    }
  }, [patients, searchTerm, selectedJalur, selectedTriase]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedJalur('Semua jalur');
    setSelectedTriase('Semua status');
  };

  const getTriaseBadgeClass = (triase: TriasePasien): string => {
    switch (triase) {
      case 'Sangat Berat':
        return 'simulasi-triase-badge simulasi-triase-badge--sangat-berat';
      case 'Berat':
        return 'simulasi-triase-badge simulasi-triase-badge--berat';
      case 'Sedang':
        return 'simulasi-triase-badge simulasi-triase-badge--sedang';
      case 'Ringan':
        return 'simulasi-triase-badge simulasi-triase-badge--ringan';
      default:
        return 'simulasi-triase-badge';
    }
  };

  const formatCurrency = (val: number): string => {
    try {
      return new Intl.NumberFormat('id-ID').format(val);
    } catch (err) {
      return String(val);
    }
  };

  return (
    <section className="simulasi-card patient-section" id="patient-section">
      <div className="patient-section__header">
        <div className="patient-section__title-group">
          <h2 className="patient-section__title">Daftar pasien</h2>
          <span className="patient-section__count-badge">
            {filteredPatients.length} Pasien
          </span>
        </div>

        <div className="patient-controls">
          {/* Search Box */}
          <div className="patient-controls__search">
            <input
              type="text"
              className="simulasi-input simulasi-input--search"
              placeholder="Cari No MR, nama, diagnosis, ICD..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                className="simulasi-search-clear-btn"
                onClick={() => setSearchTerm('')}
                aria-label="Hapus pencarian"
              >
                Clear
              </button>
            )}
          </div>

          {/* Jalur Filter */}
          <div className="simulasi-select-wrapper">
            <select
              className="simulasi-select"
              value={selectedJalur}
              onChange={(e) => setSelectedJalur(e.target.value)}
              aria-label="Filter Jalur Pasien"
            >
              <option value="Semua jalur">Semua jalur</option>
              <option value="Rawat inap">Rawat inap</option>
              <option value="Rawat jalan">Rawat jalan</option>
            </select>
          </div>

          {/* Status/Triase Filter */}
          <div className="simulasi-select-wrapper">
            <select
              className="simulasi-select"
              value={selectedTriase}
              onChange={(e) => setSelectedTriase(e.target.value)}
              aria-label="Filter Status Triase Pasien"
            >
              <option value="Semua status">Semua status</option>
              <option value="Sangat Berat">Sangat Berat</option>
              <option value="Berat">Berat</option>
              <option value="Sedang">Sedang</option>
              <option value="Ringan">Ringan</option>
            </select>
          </div>

          {/* Add Patient Button */}
          {onAddPatient && (
            <button
              type="button"
              className="simulasi-button simulasi-button--primary"
              onClick={onAddPatient}
            >
              <span>+ Pasien Baru</span>
            </button>
          )}
        </div>
      </div>

      {/* Patient Table */}
      <div className="simulasi-table-responsive">
        {filteredPatients.length > 0 ? (
          <table className="simulasi-patient-table">
            <thead>
              <tr>
                <th>NO MR</th>
                <th>NAMA</th>
                <th>USIA</th>
                <th>JALUR</th>
                <th>TRIASE</th>
                <th>DIAGNOSIS</th>
                <th>ICD-10</th>
                <th>IN-CBG</th>
                <th className="simulasi-text-right">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="simulasi-patient-table__row">
                  <td className="simulasi-font-mono simulasi-font-bold simulasi-text-black">{patient.noMr}</td>
                  <td className="simulasi-font-semibold simulasi-text-black">{patient.nama}</td>
                  <td className="simulasi-text-muted">{patient.usia}</td>
                  <td>
                    <span className="simulasi-jalur-pill">{patient.jalur}</span>
                  </td>
                  <td>
                    <span className={getTriaseBadgeClass(patient.triase)}>
                      {patient.triase}
                    </span>
                  </td>
                  <td className="simulasi-diagnosis-cell" title={patient.diagnosis}>
                    {patient.diagnosis}
                  </td>
                  <td>
                    <span
                      className="simulasi-code-badge simulasi-code-badge--icd10"
                      title={patient.icd10Desc || patient.icd10}
                    >
                      {patient.icd10}
                    </span>
                  </td>
                  <td>
                    <span
                      className="simulasi-code-badge simulasi-code-badge--incbg"
                      title={patient.inCbgDesc || patient.inCbg}
                    >
                      {patient.inCbg}
                    </span>
                  </td>
                  <td className="simulasi-text-right simulasi-font-mono simulasi-font-bold simulasi-text-black">
                    {formatCurrency(patient.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="simulasi-empty-state">
            <h3 className="simulasi-empty-state__title">Data pasien tidak ditemukan</h3>
            <p className="simulasi-empty-state__desc">
              Tidak ada pasien yang sesuai dengan kata kunci atau filter yang Anda pilih.
            </p>
            <button
              type="button"
              className="simulasi-button simulasi-button--secondary"
              onClick={handleResetFilters}
            >
              Reset Filter &amp; Pencarian
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PatientTable;
