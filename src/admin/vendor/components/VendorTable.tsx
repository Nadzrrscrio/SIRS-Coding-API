/**
 * VendorTable component
 * Renders the responsive table displaying all registrations with sorting & empty states
 */

import React from 'react';
import { VendorRegistration } from '../types/vendor';
import VendorTableRow from './VendorTableRow';

export interface VendorTableProps {
  items: VendorRegistration[];
  copiedId: number | null;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  onCopyKey: (id: number, key?: string) => void;
  onOpenDoc: (item: VendorRegistration) => void;
  onOpenApproveModal: (item: VendorRegistration) => void;
  onOpenRejectModal: (item: VendorRegistration) => void;
  onResetFilters: () => void;
}

export const VendorTable: React.FC<VendorTableProps> = ({
  items,
  copiedId,
  onApprove,
  onReject,
  onCopyKey,
  onOpenDoc,
  onOpenApproveModal,
  onOpenRejectModal,
  onResetFilters,
}) => {
  return (
    <div className="simulasi-table-responsive vendor-table-container">
      {items.length > 0 ? (
        <table className="simulasi-patient-table vendor-table" id="vendor-registrations-table">
          <thead>
            <tr>
              <th className="vendor-th-id">ID</th>
              <th>NAMA</th>
              <th>EMAIL</th>
              <th>JENIS</th>
              <th>ORG</th>
              <th>SITUS</th>
              <th>STATUS</th>
              <th>DOK</th>
              <th className="vendor-th-kirim">KIRIM</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <VendorTableRow
                key={item.id}
                item={item}
                copiedId={copiedId}
                onApprove={onApprove}
                onReject={onReject}
                onCopyKey={onCopyKey}
                onOpenDoc={onOpenDoc}
                onOpenApproveModal={onOpenApproveModal}
                onOpenRejectModal={onOpenRejectModal}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="simulasi-empty-state vendor-empty-state">
          <div className="vendor-empty-state__icon" aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E20D20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </div>
          <h3 className="simulasi-empty-state__title">Data pendaftar tidak ditemukan</h3>
          <p className="simulasi-empty-state__desc">
            Tidak ada pendaftar yang cocok dengan filter atau kata kunci pencarian Anda.
          </p>
          <button
            type="button"
            className="simulasi-button simulasi-button--secondary"
            onClick={onResetFilters}
          >
            Reset Filter &amp; Pencarian
          </button>
        </div>
      )}
    </div>
  );
};

export default VendorTable;
