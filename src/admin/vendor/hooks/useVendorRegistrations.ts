/**
 * useVendorRegistrations custom hook
 * Manages registration state, persistence, filtering, approval/rejection workflows,
 * and comprehensive exception handling.
 */

import { useState, useMemo, useCallback } from 'react';
import {
  VendorRegistration,
  RegistrationStatus,
  VendorFilterOptions,
} from '../types/vendor';
import { INITIAL_VENDOR_REGISTRATIONS } from '../data/initialVendors';
import {
  generateApiKey,
  copyToClipboard,
  safeVendorStorage,
} from '../utils/vendorUtils';

const STORAGE_KEY = 'sirs_vendor_registrations_v1';

export function useVendorRegistrations() {
  const [registrations, setRegistrations] = useState<VendorRegistration[]>(() => {
    return safeVendorStorage.get<VendorRegistration[]>(
      STORAGE_KEY,
      INITIAL_VENDOR_REGISTRATIONS
    );
  });

  const [filter, setFilter] = useState<VendorFilterOptions>({
    searchTerm: '',
    statusFilter: 'Semua status',
    jenisFilter: 'Semua jenis',
  });

  const [activeModal, setActiveModal] = useState<{
    type: 'approve' | 'reject' | 'preview_doc' | null;
    vendor: VendorRegistration | null;
  }>({
    type: null,
    vendor: null,
  });

  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Sync to local storage on change
  const saveRegistrations = useCallback((updated: VendorRegistration[]) => {
    setRegistrations(updated);
    safeVendorStorage.set(STORAGE_KEY, updated);
  }, []);

  // Filtered registrations with exception handling
  const filteredRegistrations = useMemo(() => {
    try {
      return registrations.filter((item) => {
        const query = filter.searchTerm.trim().toLowerCase();
        const matchesSearch =
          !query ||
          (item.nama && item.nama.toLowerCase().includes(query)) ||
          (item.email && item.email.toLowerCase().includes(query)) ||
          (item.org && item.org.toLowerCase().includes(query)) ||
          (item.jenis && item.jenis.toLowerCase().includes(query)) ||
          (item.situs && item.situs.toLowerCase().includes(query));

        const matchesStatus =
          filter.statusFilter === 'Semua status' ||
          item.status === filter.statusFilter.toLowerCase();

        const matchesJenis =
          filter.jenisFilter === 'Semua jenis' ||
          item.jenis.toLowerCase() === filter.jenisFilter.toLowerCase();

        return matchesSearch && matchesStatus && matchesJenis;
      });
    } catch (err) {
      console.error('Error filtering vendor registrations:', err);
      return registrations;
    }
  }, [registrations, filter]);

  // Status Metrics
  const stats = useMemo(() => {
    const total = registrations.length;
    const pending = registrations.filter((r) => r.status === 'pending').length;
    const approved = registrations.filter((r) => r.status === 'approved').length;
    const rejected = registrations.filter((r) => r.status === 'rejected').length;
    return { total, pending, approved, rejected };
  }, [registrations]);

  const handleApprove = useCallback(
    (id: number) => {
      try {
        const vendor = registrations.find((r) => r.id === id);
        if (!vendor) return;

        const newApiKey = vendor.apiKey || generateApiKey();
        const updated = registrations.map((r) => {
          if (r.id === id) {
            return {
              ...r,
              status: 'approved' as RegistrationStatus,
              apiKey: newApiKey,
              approvedAt: new Date().toLocaleString('id-ID', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              }),
            };
          }
          return r;
        });

        saveRegistrations(updated);
        setNotification({
          type: 'success',
          message: `Akses API untuk "${vendor.nama}" (${vendor.org}) berhasil disetujui! Kunci API: ${newApiKey}`,
        });
        setActiveModal({ type: null, vendor: null });
      } catch (err) {
        console.error('Error approving registration:', err);
        setNotification({
          type: 'error',
          message: 'Terjadi kesalahan sistem saat menyetujui pendaftaran.',
        });
      }
    },
    [registrations, saveRegistrations]
  );

  const handleReject = useCallback(
    (id: number, reason = 'Berkas belum memenuhi kualifikasi') => {
      try {
        const vendor = registrations.find((r) => r.id === id);
        if (!vendor) return;

        const updated = registrations.map((r) => {
          if (r.id === id) {
            return {
              ...r,
              status: 'rejected' as RegistrationStatus,
              rejectionReason: reason,
              rejectedAt: new Date().toLocaleString('id-ID', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              }),
            };
          }
          return r;
        });

        saveRegistrations(updated);
        setNotification({
          type: 'info',
          message: `Pendaftaran "${vendor.nama}" (${vendor.org}) telah ditolak.`,
        });
        setActiveModal({ type: null, vendor: null });
      } catch (err) {
        console.error('Error rejecting registration:', err);
        setNotification({
          type: 'error',
          message: 'Terjadi kesalahan sistem saat menolak pendaftaran.',
        });
      }
    },
    [registrations, saveRegistrations]
  );

  const handleCopyKey = useCallback(async (id: number, apiKey?: string) => {
    if (!apiKey) return;
    try {
      const success = await copyToClipboard(apiKey);
      if (success) {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      }
    } catch (err) {
      console.warn('Failed to copy API key:', err);
    }
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilter({
      searchTerm: '',
      statusFilter: 'Semua status',
      jenisFilter: 'Semua jenis',
    });
  }, []);

  const openModal = useCallback(
    (type: 'approve' | 'reject' | 'preview_doc', vendor: VendorRegistration) => {
      setActiveModal({ type, vendor });
    },
    []
  );

  const closeModal = useCallback(() => {
    setActiveModal({ type: null, vendor: null });
  }, []);

  const dismissNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return {
    registrations,
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
  };
}
