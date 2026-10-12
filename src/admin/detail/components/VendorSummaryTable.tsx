import React, { useState, useMemo } from 'react';
import { VendorSummary, RegistrationStatus } from '../types/detail';

interface VendorSummaryTableProps {
  vendors: VendorSummary[];
}

const STATUS_LABEL: Record<RegistrationStatus, string> = {
  approved: 'Disetujui',
  pending: 'Menunggu',
  rejected: 'Ditolak',
};

const VendorSummaryTable: React.FC<VendorSummaryTableProps> = ({ vendors }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');

  const filtered = useMemo(() => {
    return vendors.filter((v) => {
      const matchSearch =
        search === '' ||
        v.nama.toLowerCase().includes(search.toLowerCase()) ||
        v.org.toLowerCase().includes(search.toLowerCase()) ||
        v.email.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'Semua' || v.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [vendors, search, statusFilter]);

  return (
    <section className="vendor-table-section" aria-labelledby="vendor-table-title" id="vendor-table-section">
      <div className="vendor-table-section__header">
        <div className="vendor-table-section__title-group">
          <h2 className="vendor-table-section__title" id="vendor-table-title">
            🏢 Data Vendor & Registrasi
          </h2>
          <span className="vendor-table-section__count">
            {filtered.length} dari {vendors.length} vendor
          </span>
        </div>

        {/* Status summary pills */}
        <div className="vendor-status-pills">
          {(['approved', 'pending', 'rejected'] as RegistrationStatus[]).map((s) => {
            const count = vendors.filter((v) => v.status === s).length;
            return (
              <span key={s} className={`vendor-status-pill vendor-status-pill--${s}`}>
                {STATUS_LABEL[s]}: {count}
              </span>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="vendor-table-section__filters">
        <input
          id="vendor-search"
          type="search"
          className="detail-input"
          placeholder="🔍 Cari nama, organisasi, email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Cari vendor"
        />
        <select
          id="vendor-status-filter"
          className="detail-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          aria-label="Filter status vendor"
        >
          <option value="Semua">Semua Status</option>
          <option value="approved">Disetujui</option>
          <option value="pending">Menunggu</option>
          <option value="rejected">Ditolak</option>
        </select>
      </div>

      {/* Table */}
      <div className="detail-table-wrap">
        <table className="detail-table" id="vendor-detail-table">
          <thead>
            <tr>
              <th scope="col">Nama</th>
              <th scope="col">Email</th>
              <th scope="col">Jenis</th>
              <th scope="col">Organisasi</th>
              <th scope="col">Status</th>
              <th scope="col">API Key</th>
              <th scope="col">Tanggal Daftar</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="detail-table__empty">
                  Tidak ada data vendor yang sesuai filter.
                </td>
              </tr>
            ) : (
              filtered.map((v) => (
                <tr key={v.id} className="detail-table__row">
                  <td className="detail-table__nama">{v.nama}</td>
                  <td className="detail-table__email">
                    <a href={`mailto:${v.email}`} className="detail-link">{v.email}</a>
                  </td>
                  <td>
                    <span className="jenis-badge">{v.jenis}</span>
                  </td>
                  <td>{v.org}</td>
                  <td>
                    <span className={`vendor-status-badge vendor-status-badge--${v.status}`}>
                      {STATUS_LABEL[v.status]}
                    </span>
                  </td>
                  <td>
                    {v.apiKey ? (
                      <code className="api-key-chip">{v.apiKey}</code>
                    ) : (
                      <span className="api-key-none">—</span>
                    )}
                  </td>
                  <td className="detail-table__date">{v.tanggalDaftar}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default VendorSummaryTable;
