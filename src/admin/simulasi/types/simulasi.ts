export type JalurPasien = 'Rawat inap' | 'Rawat jalan';
export type TriasePasien = 'Sangat Berat' | 'Berat' | 'Sedang' | 'Ringan';

export interface VitalSigns {
  td: string;
  hr: string;
  rr: string;
  suhu: string;
  spo2: string;
}

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

  // Detail page fields
  nik?: string;
  alamat?: string;
  jenisKelamin?: 'Perempuan' | 'Laki-laki';
  kelas?: string;
  status?: string;
  vitalSigns?: VitalSigns;
  gejala?: string[];
  riwayat?: string[];
  tindakan?: string[];
  biayaTindakan?: number;
  biayaRawat?: number;
  kelompokKasus?: string;
  modePengkodean?: 'Auto' | 'Rule' | 'ML' | 'LLM';
}

export interface RekapRumahSakit {
  totalPasien: number;
  rawatInap: number;
  rawatJalan: number;
  totalBiaya: number;
  rataLamaRawat: number;
  rataBiayaRawatInap: number;
}
