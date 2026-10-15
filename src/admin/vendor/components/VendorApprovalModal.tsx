/**
 * VendorApprovalModal component
 * Dialog for approving API access, rejecting with a reason, or previewing verification documents.
 */

import React, { useState, useEffect } from 'react';
import { VendorRegistration } from '../types/vendor';

export interface VendorApprovalModalProps {
  type: 'approve' | 'reject' | 'preview_doc' | null;
  vendor: VendorRegistration | null;
  onClose: () => void;
  onConfirmApprove: (id: number) => void;
  onConfirmReject: (id: number, reason: string) => void;
}

export const VendorApprovalModal: React.FC<VendorApprovalModalProps> = ({
  type,
  vendor,
  onClose,
  onConfirmApprove,
  onConfirmReject,
}) => {
  const [rejectReason, setRejectReason] = useState('Berkas legalitas institusi tidak lengkap');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!type || !vendor) return null;

  return (
    <div className="simulasi-modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="simulasi-modal-card vendor-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="vendor-modal-title"
      >
        <div className="simulasi-modal-header">
          <div className="vendor-modal-badge">
            {type === 'approve' && <span className="vendor-badge vendor-badge--approved">Konfirmasi Persetujuan</span>}
            {type === 'reject' && <span className="vendor-badge vendor-badge--rejected">Konfirmasi Penolakan</span>}
            {type === 'preview_doc' && <span className="vendor-badge vendor-badge--pending">Dokumen Verifikasi</span>}
          </div>
          <button
            type="button"
            className="simulasi-modal-close"
            onClick={onClose}
            aria-label="Tutup modal"
          >
            &times;
          </button>
        </div>

        {/* Modal: Approve */}
        {type === 'approve' && (
          <div className="vendor-modal-body">
            <h3 className="vendor-modal-title" id="vendor-modal-title">
              Setujui Akses API untuk {vendor.nama}?
            </h3>
            <p className="vendor-modal-desc">
              Pendaftar dari institusi <strong>{vendor.org}</strong> ({vendor.jenis}) akan diberikan akses resmi ke API SIRS. Kunci API unik akan langsung digenerate dan diaktifkan.
            </p>

            <div className="vendor-modal-summary-box">
              <div className="vendor-modal-summary-item">
                <span className="vendor-modal-label">Email Tujuan:</span>
                <span className="vendor-modal-value">{vendor.email}</span>
              </div>
              <div className="vendor-modal-summary-item">
                <span className="vendor-modal-label">Rencana Penggunaan:</span>
                <span className="vendor-modal-value">{vendor.alasan || 'Integrasi sistem klinik/RS'}</span>
              </div>
            </div>

            <div className="simulasi-modal-actions">
              <button
                type="button"
                className="simulasi-button simulasi-button--secondary"
                onClick={onClose}
              >
                Batal
              </button>
              <button
                type="button"
                className="simulasi-button simulasi-button--primary vendor-modal-btn--confirm-approve"
                onClick={() => onConfirmApprove(vendor.id)}
              >
                Setujui &amp; Terbitkan Kunci API
              </button>
            </div>
          </div>
        )}

        {/* Modal: Reject */}
        {type === 'reject' && (
          <div className="vendor-modal-body">
            <h3 className="vendor-modal-title" id="vendor-modal-title">
              Tolak Pendaftaran {vendor.nama}?
            </h3>
            <p className="vendor-modal-desc">
              Silakan pilih atau tuliskan alasan penolakan pendaftaran untuk <strong>{vendor.org}</strong>:
            </p>

            <div className="simulasi-select-wrapper" style={{ width: '100%', marginBottom: '12px' }}>
              <select
                className="simulasi-select"
                style={{ width: '100%' }}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              >
                <option value="Berkas legalitas institusi tidak lengkap">Berkas legalitas institusi tidak lengkap</option>
                <option value="Data kontak atau situs web tidak dapat diverifikasi">Data kontak atau situs web tidak dapat diverifikasi</option>
                <option value="Format permohonan tidak sesuai standar SIRS">Format permohonan tidak sesuai standar SIRS</option>
                <option value="Instansi belum terdaftar di basis data faskes resmi">Instansi belum terdaftar di basis data faskes resmi</option>
              </select>
            </div>

            <div className="simulasi-modal-actions">
              <button
                type="button"
                className="simulasi-button simulasi-button--secondary"
                onClick={onClose}
              >
                Batal
              </button>
              <button
                type="button"
                className="simulasi-button simulasi-button--primary vendor-modal-btn--confirm-reject"
                onClick={() => onConfirmReject(vendor.id, rejectReason)}
              >
                Konfirmasi Penolakan
              </button>
            </div>
          </div>
        )}

        {/* Modal: Document Preview */}
        {type === 'preview_doc' && (
          <div className="vendor-modal-body">
            <h3 className="vendor-modal-title" id="vendor-modal-title">
              Dokumen: {vendor.dok}
            </h3>
            <p className="vendor-modal-desc">
              Dokumen pendukung legalitas pendaftaran dari institusi <strong>{vendor.org}</strong>.
            </p>

            <div className="vendor-doc-preview-card">
              <div className="vendor-doc-preview-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E20D20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <div className="vendor-doc-preview-info">
                <strong className="vendor-doc-preview-title">{vendor.dok}</strong>
                <span className="vendor-doc-preview-meta">PDF Dokumen Resmi &middot; Terverifikasi hash sha-256</span>
              </div>
            </div>

            <div className="simulasi-modal-actions">
              <button
                type="button"
                className="simulasi-button simulasi-button--secondary"
                onClick={onClose}
              >
                Tutup
              </button>
              <button
                type="button"
                className="simulasi-button simulasi-button--primary"
                onClick={() => alert(`Mengunduh berkas: ${vendor.dok}`)}
              >
                Unduh Berkas
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorApprovalModal;
