export type JalurPasien = 'Rawat inap' | 'Rawat jalan';
export type TriasePasien = 'Sangat Berat' | 'Berat' | 'Sedang' | 'Ringan';

export interface Patient {
  id: string;
  noMr: string;
  nama: string;
  usia: number;
  jalur: JalurPasien;
  triase: TriasePasien;
  diagnosis: string;
  icd10: string;
  icd10Desc?: string;
  inCbg: string;
  inCbgDesc?: string;
  total: number;
  lamaRawatDays?: number;
  tanggalMasuk?: string;
}

export interface RekapRumahSakit {
  totalPasien: number;
  rawatInap: number;
  rawatJalan: number;
  totalBiaya: number;
  rataLamaRawat: number;
  rataBiayaRawatInap: number;
}
