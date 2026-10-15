/**
 * VendorTableRow component
 * Single row item in the Acc Register table matching mockup columns:
 * ID | NAMA | EMAIL | JENIS | ORG | SITUS | STATUS | DOK | KIRIM
 */

import React from 'react';
import { VendorRegistration } from '../types/vendor';

export interface VendorTableRowProps {
  item: VendorRegistration;
  copiedId: number | null;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  onCopyKey: (id: number, key?: string) => void;
  onOpenDoc: (item: VendorRegistration) => void;
  onOpenApproveModal: (item: VendorRegistration) => void;
  onOpenRejectModal: (item: VendorRegistration) => void;
}

export const VendorTableRow: React.FC<VendorTableRowProps> = ({
  item,
  copiedId,
  onCopyKey,
  onOpenDoc,
  onOpenApproveModal,
  onOpenRejectModal,
}) => {
  const getStatusBadge = () => {
    switch (item.status) {
      case 'approved':
        return <span className="vendor-badge vendor-badge--approved">approved</span>;
      case 'rejected':
        return <span className="vendor-badge vendor-badge--rejected">rejected</span>;
      case 'pending':
      default:
        return <span className="vendor-badge vendor-badge--pending">pending</span>;
    }
  };

  const isCopied = copiedId === item.id;

  return (
    <tr className="vendor-table__row" id={`vendor-row-${item.id}`}>
      {/* 1. ID */}
      <td className="vendor-cell-id simulasi-font-mono simulasi-font-bold">
        {item.id}
      </td>

      {/* 2. NAMA */}
      <td className="vendor-cell-nama simulasi-font-semibold simulasi-text-black">
        {item.nama}
      </td>

      {/* 3. EMAIL */}
      <td className="vendor-cell-email simulasi-text-muted">
        <a href={`mailto:${item.email}`} className="vendor-email-link">
          {item.email}
        </a>
      </td>

      {/* 4. JENIS */}
      <td className="vendor-cell-jenis">
        <span className="vendor-jenis-pill">{item.jenis}</span>
      </td>

      {/* 5. ORG */}
      <td className="vendor-cell-org simulasi-font-semibold simulasi-text-black">
        {item.org}
      </td>

      {/* 6. SITUS */}
      <td className="vendor-cell-situs">
        {item.situs && item.situs !== '-' ? (
          <a
            href={item.situs.startsWith('http') ? item.situs : `https://${item.situs}`}
            target="_blank"
            rel="noopener noreferrer"
            className="vendor-situs-link"
            title={item.situs}
          >
            {item.situs}
          </a>
        ) : (
          <span className="vendor-empty-dash">-</span>
        )}
      </td>

      {/* 7. STATUS */}
      <td className="vendor-cell-status">
        {getStatusBadge()}
      </td>

      {/* 8. DOK */}
      <td className="vendor-cell-dok">
        {item.dok ? (
          <button
            type="button"
            className="vendor-dok-btn"
            onClick={() => onOpenDoc(item)}
            title={`Lihat dokumen: ${item.dok}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E20D20" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span className="vendor-dok-name">{item.dok}</span>
          </button>
        ) : (
          <span className="vendor-empty-dash">-</span>
        )}
      </td>

      {/* 9. KIRIM / AKSI */}
      <td className="vendor-cell-kirim">
        {item.status === 'pending' && (
          <div className="vendor-action-group">
            <button
              type="button"
              className="vendor-btn-action vendor-btn-action--approve"
              onClick={() => onOpenApproveModal(item)}
              title="Setujui pendaftaran dan terbitkan kunci API"
            >
              Setujui
            </button>
            <button
              type="button"
              className="vendor-btn-action vendor-btn-action--reject"
              onClick={() => onOpenRejectModal(item)}
              title="Tolak pendaftaran"
            >
              Tolak
            </button>
          </div>
        )}

        {item.status === 'approved' && item.apiKey && (
          <div className="vendor-apikey-group">
            <button
              type="button"
              className={`vendor-apikey-badge ${isCopied ? 'vendor-apikey-badge--copied' : ''}`}
              onClick={() => onCopyKey(item.id, item.apiKey)}
              title="Klik untuk menyalin Kunci API"
            >
              <code className="vendor-apikey-text">
                {item.apiKey.length > 13
                  ? `${item.apiKey.substring(0, 11)}..`
                  : item.apiKey}
              </code>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                {isCopied ? (
                  <polyline points="20 6 9 17 4 12" />
                ) : (
                  <>
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </>
                )}
              </svg>
            </button>
            {isCopied && <span className="vendor-copied-tooltip">Tersalin!</span>}
          </div>
        )}

        {item.status === 'rejected' && (
          <div className="vendor-rejected-group">
            <span className="vendor-rejected-badge">Ditolak</span>
            <button
              type="button"
              className="vendor-reconsider-btn"
              onClick={() => onOpenApproveModal(item)}
              title="Tinjau ulang dan setujui"
            >
              Tinjau Ulang
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default VendorTableRow;
