/**
 * VendorFilterBar component
 * Search input and filter controls matching the Simulasi PatientTable pattern
 */

import React from 'react';
import { VendorFilterOptions } from '../types/vendor';

export interface VendorFilterBarProps {
  filter: VendorFilterOptions;
  onFilterChange: (updated: Partial<VendorFilterOptions>) => void;
  onReset: () => void;
  totalFiltered: number;
}

export const VendorFilterBar: React.FC<VendorFilterBarProps> = ({
  filter,
  onFilterChange,
  onReset,
  totalFiltered,
}) => {
  const isFiltered =
    Boolean(filter.searchTerm.trim()) ||
    filter.statusFilter !== 'Semua status' ||
    filter.jenisFilter !== 'Semua jenis';

  return (
    <div className="vendor-filter-bar">
      <div className="vendor-filter-bar__left">
        {/* Search Box */}
        <div className="vendor-search-wrap">
          <svg className="vendor-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6D7079" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="simulasi-input vendor-search-input"
            placeholder="Cari nama, email, organisasi, situs..."
            value={filter.searchTerm}
            onChange={(e) => onFilterChange({ searchTerm: e.target.value })}
            aria-label="Cari pendaftar"
          />
          {filter.searchTerm && (
            <button
              type="button"
              className="vendor-search-clear-btn"
              onClick={() => onFilterChange({ searchTerm: '' })}
              aria-label="Bersihkan pencarian"
            >
              &times;
            </button>
          )}
        </div>

        {/* Status Filter */}
        <div className="simulasi-select-wrapper vendor-select-wrapper">
          <select
            className="simulasi-select vendor-select"
            value={filter.statusFilter}
            onChange={(e) => onFilterChange({ statusFilter: e.target.value })}
            aria-label="Filter status pendaftaran"
          >
            <option value="Semua status">Semua Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <svg
            className="vendor-select-arrow"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#E20D20"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {/* Jenis Filter */}
        <div className="simulasi-select-wrapper vendor-select-wrapper">
          <select
            className="simulasi-select vendor-select"
            value={filter.jenisFilter}
            onChange={(e) => onFilterChange({ jenisFilter: e.target.value })}
            aria-label="Filter jenis organisasi"
          >
            <option value="Semua jenis">Semua Jenis</option>
            <option value="vendor">Vendor</option>
            <option value="rumah sakit">Rumah Sakit</option>
            <option value="klinik">Klinik</option>
            <option value="developer">Developer</option>
          </select>
          <svg
            className="vendor-select-arrow"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#E20D20"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      <div className="vendor-filter-bar__right">
        {isFiltered && (
          <button
            type="button"
            className="simulasi-button simulasi-button--secondary vendor-reset-btn"
            onClick={onReset}
          >
            Reset Filter
          </button>
        )}
        <span className="vendor-counter-badge">
          {totalFiltered} Pendaftar
        </span>
      </div>
    </div>
  );
};

export default VendorFilterBar;
