/**
 * Type definitions for Vendor Acc Register (Manajemen sub-feature)
 */

export type RegistrationStatus = 'pending' | 'approved' | 'rejected';

export type OrganizationType =
  | 'vendor'
  | 'rumah sakit'
  | 'klinik'
  | 'developer'
  | 'lainnya'
  | string;

export interface VendorRegistration {
  id: number;
  nama: string;
  email: string;
  jenis: OrganizationType;
  org: string;
  situs: string;
  status: RegistrationStatus;
  dok: string | null;
  alasan?: string;
  apiKey?: string;
  tanggalDaftar: string;
  approvedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
}

export interface VendorFilterOptions {
  searchTerm: string;
  statusFilter: string;
  jenisFilter: string;
}

export interface VendorPageProps {
  onNavigateSimulasi?: () => void;
  onNavigateLogin?: () => void;
  onNavigateLanding?: () => void;
  onNavigateDocs?: () => void;
  onNavigateRedoc?: () => void;
}
