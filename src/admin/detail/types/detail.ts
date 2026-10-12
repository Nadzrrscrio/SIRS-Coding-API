/**
 * Type definitions for Admin Detail Dashboard
 */

export type JalurPasien = 'Rawat inap' | 'Rawat jalan';
export type TriasePasien = 'Sangat Berat' | 'Berat' | 'Sedang' | 'Ringan';
export type RegistrationStatus = 'pending' | 'approved' | 'rejected';

export interface PatientSummary {
  id: string;
  noMr: string;
  nama: string;
  usia: number;
  jalur: JalurPasien;
  triase: TriasePasien;
  diagnosis: string;
  icd10: string;
  inCbg: string;
  total: number;
  lamaRawatDays: number;
  tanggalMasuk: string;
}

export interface VendorSummary {
  id: number;
  nama: string;
  email: string;
  jenis: string;
  org: string;
  status: RegistrationStatus;
  tanggalDaftar: string;
  apiKey?: string;
}

export interface DashboardStats {
  totalPasien: number;
  rawatInap: number;
  rawatJalan: number;
  totalBiaya: number;
  rataLamaRawat: number;
  totalVendor: number;
  vendorApproved: number;
  vendorPending: number;
  vendorRejected: number;
  totalApiKey: number;
  biayaPerBulan: BiayaBulan[];
  distribusiTriase: DistribusiTriase[];
}

export interface BiayaBulan {
  bulan: string;
  totalBiaya: number;
  jumlahPasien: number;
}

export interface DistribusiTriase {
  triase: TriasePasien;
  jumlah: number;
  warna: string;
}

export interface DetailPageProps {
  onNavigateLanding?: () => void;
  onNavigateSimulasi?: () => void;
  onNavigateVendor?: () => void;
  onNavigateLogin?: () => void;
}
