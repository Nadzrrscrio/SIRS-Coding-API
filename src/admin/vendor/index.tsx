/**
 * VendorAccRegisterPage (Directory: src/admin/vendor)
 * Sub-fitur "Registrasi" dari halaman Manajemen SIRS:
 * - Manajemen pendaftar & persetujuan akses API SIRS
 * - Mengikuti design pattern page Simulasi
 * - Menerapkan RWD & Exception Handling komprehensif
 */

import React from 'react';
import VendorErrorBoundary from './components/VendorErrorBoundary';
import VendorHeader from './components/VendorHeader';
import VendorManagementTabs from './components/VendorManagementTabs';
import VendorFilterBar from './components/VendorFilterBar';
import VendorTable from './components/VendorTable';
import VendorApprovalModal from './components/VendorApprovalModal';
import { useVendorRegistrations } from './hooks/useVendorRegistrations';
import { VendorPageProps } from './types/vendor';
import './Vendor.css';

export const VendorAccRegisterPage: React.FC<VendorPageProps> = ({
  onNavigateSimulasi,
  onNavigateLogin,
  onNavigateLanding,
}) => {
  const {
    filteredRegistrations,
    filter,
    setFilter,
    stats,
    activeModal,
    notification,
    copiedId,
    handleApprove,
    handleReject,
    handleCopyKey,
    handleResetFilters,
    openModal,
    closeModal,
    dismissNotification,
  } = useVendorRegistrations();

  return (
    <VendorErrorBoundary>
      <div className="vendor-page" id="vendor-acc-register-page">
        {/* Background Circle Ornaments (#FDF6F7) */}
        <div className="bg-ornament bg-ornament--top-left" aria-hidden="true" />
        <div className="bg-ornament bg-ornament--top-right" aria-hidden="true" />
        <div className="bg-ornament bg-ornament--middle-left" aria-hidden="true" />
        <div className="bg-ornament bg-ornament--bottom-right" aria-hidden="true" />

        <div className="vendor-container">
          {/* Header (Top bar + Brand + Hero Subtitle) */}
          <VendorHeader
            onNavigateSimulasi={onNavigateSimulasi}
            onNavigateLogin={onNavigateLogin}
            onNavigateLanding={onNavigateLanding}
          />

          {/* Main Manajemen Card */}
          <main className="vendor-card" id="vendor-card-main">
            {/* Card Header & 3 Sub-feature Tabs ([Pengguna], [API Key], [Registrasi]) */}
            <VendorManagementTabs
              activeTab="Registrasi"
              pendingCount={stats.pending}
            />

            {/* Filter and Search Bar */}
            <VendorFilterBar
              filter={filter}
              onFilterChange={(updated) => setFilter((prev) => ({ ...prev, ...updated }))}
              onReset={handleResetFilters}
              totalFiltered={filteredRegistrations.length}
            />

            {/* Table displaying registrations matching mockup */}
            <VendorTable
              items={filteredRegistrations}
              copiedId={copiedId}
              onApprove={handleApprove}
              onReject={handleReject}
              onCopyKey={handleCopyKey}
              onOpenDoc={(item) => openModal('preview_doc', item)}
              onOpenApproveModal={(item) => openModal('approve', item)}
              onOpenRejectModal={(item) => openModal('reject', item)}
              onResetFilters={handleResetFilters}
            />
          </main>
        </div>

        {/* Modal Dialogs (Approve / Reject / Document Preview) */}
        {activeModal.type && (
          <VendorApprovalModal
            type={activeModal.type}
            vendor={activeModal.vendor}
            onClose={closeModal}
            onConfirmApprove={handleApprove}
            onConfirmReject={handleReject}
          />
        )}

        {/* Action Notifications / Toast */}
        {notification && (
          <aside
            className={`vendor-toast vendor-toast--${notification.type}`}
            role="status"
            aria-live="polite"
          >
            <div className="vendor-toast__content">
              {notification.message}
            </div>
            <button
              type="button"
              className="vendor-toast__close"
              onClick={dismissNotification}
              aria-label="Tutup notifikasi"
            >
              &times;
            </button>
          </aside>
        )}
      </div>
    </VendorErrorBoundary>
  );
};

export default VendorAccRegisterPage;
