import React, { useState, useMemo } from 'react';
import { PatientSummary, TriasePasien } from '../types/detail';

interface PatientSummaryTableProps {
  patients: PatientSummary[];
}

const TRIASE_ORDER: Record<TriasePasien, number> = {
  'Sangat Berat': 0,
  'Berat': 1,
  'Sedang': 2,
  'Ringan': 3,
};

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

const PatientSummaryTable: React.FC<PatientSummaryTableProps> = ({ patients }) => {
  const [search, setSearch] = useState('');
  const [jalurFilter, setJalurFilter] = useState('Semua');
  const [triaseFilter, setTriaseFilter] = useState('Semua');
  const [sortBy, setSortBy] = useState<'total' | 'triase' | 'tanggal'>('triase');

  const filtered = useMemo(() => {
    let result = patients.filter((p) => {
      const matchSearch =
        search === '' ||
        p.nama.toLowerCase().includes(search.toLowerCase()) ||
        p.noMr.toLowerCase().includes(search.toLowerCase()) ||
        p.icd10.toLowerCase().includes(search.toLowerCase()) ||
        p.diagnosis.toLowerCase().includes(search.toLowerCase());
      const matchJalur = jalurFilter === 'Semua' || p.jalur === jalurFilter;
      const matchTriase = triaseFilter === 'Semua' || p.triase === triaseFilter;
      return matchSearch && matchJalur && matchTriase;
    });

    result = [...result].sort((a, b) => {
      if (sortBy === 'total') return b.total - a.total;
      if (sortBy === 'triase') return TRIASE_ORDER[a.triase] - TRIASE_ORDER[b.triase];
      if (sortBy === 'tanggal') return a.tanggalMasuk.localeCompare(b.tanggalMasuk);
      return 0;
    });

    return result;
  }, [patients, search, jalurFilter, triaseFilter, sortBy]);

  const totalFilteredBiaya = useMemo(
    () => filtered.reduce((acc, p) => acc + p.total, 0),
    [filtered]
  );

  return (
    <section className="patient-table-section" aria-labelledby="patient-table-title" id="patient-table-section">
      <div className="patient-table-section__header">
        <div className="patient-table-section__title-group">
          <h2 className="patient-table-section__title" id="patient-table-title">
            📋 Data Pasien
          </h2>
          <span className="patient-table-section__count">
            {filtered.length} dari {patients.length} pasien
          </span>
        </div>
        <span className="patient-table-section__biaya-total">
          Total: <strong>{formatCurrency(totalFilteredBiaya)}</strong>
        </span>
      </div>

      {/* Filters */}
      <div className="patient-table-section__filters">
        <input
          id="patient-search"
          type="search"
          className="detail-input"
          placeholder="🔍 Cari nama, MR, ICD-10..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Cari pasien"
        />
        <select
          id="jalur-filter"
          className="detail-select"
          value={jalurFilter}
          onChange={(e) => setJalurFilter(e.target.value)}
          aria-label="Filter jalur rawat"
        >
          <option value="Semua">Semua Jalur</option>
          <option value="Rawat inap">Rawat Inap</option>
          <option value="Rawat jalan">Rawat Jalan</option>
        </select>
        <select
          id="triase-filter"
          className="detail-select"
          value={triaseFilter}
          onChange={(e) => setTriaseFilter(e.target.value)}
          aria-label="Filter triase"
        >
          <option value="Semua">Semua Triase</option>
          <option value="Sangat Berat">Sangat Berat</option>
          <option value="Berat">Berat</option>
          <option value="Sedang">Sedang</option>
          <option value="Ringan">Ringan</option>
        </select>
        <select
          id="sort-filter"
          className="detail-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          aria-label="Urutkan"
        >
          <option value="triase">Urut: Triase</option>
          <option value="total">Urut: Biaya Tertinggi</option>
          <option value="tanggal">Urut: Tanggal Masuk</option>
        </select>
      </div>

      {/* Table */}
      <div className="detail-table-wrap">
        <table className="detail-table" id="patient-detail-table">
          <thead>
            <tr>
              <th scope="col">No. MR</th>
              <th scope="col">Nama Pasien</th>
              <th scope="col">Usia</th>
              <th scope="col">Jalur</th>
              <th scope="col">Triase</th>
              <th scope="col">Diagnosis</th>
              <th scope="col">ICD-10</th>
              <th scope="col">IN-CBG</th>
              <th scope="col">Lama Rawat</th>
              <th scope="col">Total Klaim</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={10} className="detail-table__empty">
                  Tidak ada data pasien yang sesuai filter.
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.id} className="detail-table__row">
                  <td className="detail-table__mr">{p.noMr}</td>
                  <td className="detail-table__nama">{p.nama}</td>
                  <td>{p.usia} thn</td>
                  <td>
                    <span className={`jalur-badge jalur-badge--${p.jalur === 'Rawat inap' ? 'inap' : 'jalan'}`}>
                      {p.jalur}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`triase-badge triase-badge--${p.triase.toLowerCase().replace(' ', '-')}`}
                    >
                      {p.triase}
                    </span>
                  </td>
                  <td className="detail-table__diag" title={p.diagnosis}>
                    {p.diagnosis.length > 28 ? p.diagnosis.slice(0, 28) + '…' : p.diagnosis}
                  </td>
                  <td>
                    <code className="code-chip code-chip--icd10">{p.icd10}</code>
                  </td>
                  <td>
                    <code className="code-chip code-chip--incbg">{p.inCbg}</code>
                  </td>
                  <td className="detail-table__days">{p.lamaRawatDays}h</td>
                  <td className="detail-table__biaya">
                    {formatCurrency(p.total)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PatientSummaryTable;
