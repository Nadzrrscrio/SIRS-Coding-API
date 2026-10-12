import { PatientSummary, VendorSummary, DashboardStats } from '../types/detail';

export const MOCK_PATIENTS: PatientSummary[] = [
  {
    id: '1', noMr: 'RM-0001', nama: 'Siti Rahmawati', usia: 45,
    jalur: 'Rawat inap', triase: 'Berat', diagnosis: 'Dengue fever',
    icd10: 'A90', inCbg: 'J-1-16-II', total: 2250000, lamaRawatDays: 4,
    tanggalMasuk: '2026-09-28',
  },
  {
    id: '2', noMr: 'RM-0002', nama: 'Budi Santoso', usia: 34,
    jalur: 'Rawat inap', triase: 'Berat', diagnosis: 'Typhoid fever',
    icd10: 'A01.0', inCbg: 'A-3-14-II', total: 3400000, lamaRawatDays: 5,
    tanggalMasuk: '2026-09-27',
  },
  {
    id: '3', noMr: 'RM-0003', nama: 'Ahmad Fauzi', usia: 62,
    jalur: 'Rawat inap', triase: 'Sangat Berat', diagnosis: 'Stroke',
    icd10: 'I64', inCbg: 'A-4-13-I', total: 11825000, lamaRawatDays: 8,
    tanggalMasuk: '2026-09-24',
  },
  {
    id: '4', noMr: 'RM-0004', nama: 'Dewi Lestari', usia: 29,
    jalur: 'Rawat inap', triase: 'Berat', diagnosis: 'Acute appendicitis',
    icd10: 'K35.9', inCbg: 'K-3-15-I', total: 5900000, lamaRawatDays: 3,
    tanggalMasuk: '2026-09-29',
  },
  {
    id: '5', noMr: 'RM-0005', nama: 'Rudi Hartono', usia: 50,
    jalur: 'Rawat inap', triase: 'Berat', diagnosis: 'Asthma',
    icd10: 'J45.9', inCbg: 'A-1-18-II', total: 2180000, lamaRawatDays: 3,
    tanggalMasuk: '2026-09-29',
  },
  {
    id: '6', noMr: 'RM-0006', nama: 'Sri Wahyuni', usia: 68,
    jalur: 'Rawat jalan', triase: 'Sedang', diagnosis: 'Senile cataract',
    icd10: 'H25.9', inCbg: 'C-1-15-II', total: 3200000, lamaRawatDays: 1,
    tanggalMasuk: '2026-10-01',
  },
  {
    id: '7', noMr: 'RM-0007', nama: 'Andi Nugroho', usia: 55,
    jalur: 'Rawat inap', triase: 'Sangat Berat', diagnosis: 'Chronic kidney disease',
    icd10: 'N18.9', inCbg: 'Q-5-15-II', total: 6725000, lamaRawatDays: 6,
    tanggalMasuk: '2026-09-26',
  },
  {
    id: '8', noMr: 'RM-0008', nama: 'Ratna Sari', usia: 33,
    jalur: 'Rawat inap', triase: 'Berat', diagnosis: 'Acute cholecystitis',
    icd10: 'K80.0', inCbg: 'J-4-16-II', total: 8400000, lamaRawatDays: 5,
    tanggalMasuk: '2026-09-27',
  },
  {
    id: '9', noMr: 'RM-0009', nama: 'Tono Wijaya', usia: 70,
    jalur: 'Rawat inap', triase: 'Sangat Berat', diagnosis: 'Fracture of femur',
    icd10: 'S72.0', inCbg: 'M-1-02-II', total: 9450000, lamaRawatDays: 7,
    tanggalMasuk: '2026-09-25',
  },
  {
    id: '10', noMr: 'RM-0010', nama: 'Maya Indah', usia: 27,
    jalur: 'Rawat jalan', triase: 'Sedang', diagnosis: 'Acute respiratory infection',
    icd10: 'J06.9', inCbg: 'Q-5-11-I', total: 450000, lamaRawatDays: 1,
    tanggalMasuk: '2026-10-02',
  },
  {
    id: '11', noMr: 'RM-0011', nama: 'Eko Prasetyo', usia: 48,
    jalur: 'Rawat inap', triase: 'Berat', diagnosis: 'Hypertension',
    icd10: 'I10', inCbg: 'I-4-17-II', total: 4100000, lamaRawatDays: 4,
    tanggalMasuk: '2026-09-28',
  },
  {
    id: '12', noMr: 'RM-0012', nama: 'Lia Marlina', usia: 38,
    jalur: 'Rawat inap', triase: 'Berat', diagnosis: 'Diabetes mellitus type 2',
    icd10: 'E11.1', inCbg: 'E-4-10-I', total: 5850000, lamaRawatDays: 4,
    tanggalMasuk: '2026-09-28',
  },
  {
    id: '13', noMr: 'RM-0013', nama: 'Hendra Setiawan', usia: 52,
    jalur: 'Rawat inap', triase: 'Sangat Berat', diagnosis: 'Acute myocardial infarction',
    icd10: 'I21.9', inCbg: 'I-1-03-I', total: 10175000, lamaRawatDays: 6,
    tanggalMasuk: '2026-09-26',
  },
  {
    id: '14', noMr: 'RM-0014', nama: 'Nita Anggraini', usia: 31,
    jalur: 'Rawat inap', triase: 'Berat', diagnosis: 'Single spontaneous delivery',
    icd10: 'O80', inCbg: 'O-6-10-I', total: 3100000, lamaRawatDays: 2,
    tanggalMasuk: '2026-09-30',
  },
  {
    id: '15', noMr: 'RM-0015', nama: 'Bambang Kusuma', usia: 60,
    jalur: 'Rawat jalan', triase: 'Ringan', diagnosis: 'Gastritis',
    icd10: 'K29.7', inCbg: 'K-4-12-I', total: 900000, lamaRawatDays: 1,
    tanggalMasuk: '2026-10-02',
  },
];

export const MOCK_VENDORS: VendorSummary[] = [
  { id: 1, nama: 'dr. Budi Hartono', email: 'budi.hartono@rsjakarta.co.id', jenis: 'rumah sakit', org: 'RS Jakarta Pusat', status: 'approved', tanggalDaftar: '2026-09-01', apiKey: 'sk-live-***8f2a' },
  { id: 2, nama: 'PT Medika Digital', email: 'admin@medikadigital.id', jenis: 'vendor', org: 'PT Medika Digital Indonesia', status: 'approved', tanggalDaftar: '2026-09-05', apiKey: 'sk-live-***3c9b' },
  { id: 3, nama: 'Klinik Sehat Sentosa', email: 'klinik@sehatsentosa.com', jenis: 'klinik', org: 'Klinik Sehat Sentosa', status: 'approved', tanggalDaftar: '2026-09-10', apiKey: 'sk-live-***7d1e' },
  { id: 4, nama: 'Ahmad Developer', email: 'ahmad.dev@gmail.com', jenis: 'developer', org: 'Freelance', status: 'pending', tanggalDaftar: '2026-10-01' },
  { id: 5, nama: 'RS Harapan Bunda', email: 'it@harapanbunda.co.id', jenis: 'rumah sakit', org: 'RS Harapan Bunda Bekasi', status: 'pending', tanggalDaftar: '2026-10-03' },
  { id: 6, nama: 'CV Teknologi Medis', email: 'contact@tekmedis.id', jenis: 'vendor', org: 'CV Teknologi Medis Nusantara', status: 'rejected', tanggalDaftar: '2026-09-15' },
  { id: 7, nama: 'Puskesmas Cibubur', email: 'puskesmas.cibubur@dinkes.id', jenis: 'klinik', org: 'Puskesmas Cibubur', status: 'approved', tanggalDaftar: '2026-09-20', apiKey: 'sk-live-***5a4f' },
  { id: 8, nama: 'Indra Prasetya', email: 'indra.pras@healthtech.io', jenis: 'developer', org: 'HealthTech Indonesia', status: 'pending', tanggalDaftar: '2026-10-05' },
];

export const DASHBOARD_STATS: DashboardStats = {
  totalPasien: 15,
  rawatInap: 12,
  rawatJalan: 3,
  totalBiaya: 77705000,
  rataLamaRawat: 3.7,
  totalVendor: 8,
  vendorApproved: 4,
  vendorPending: 3,
  vendorRejected: 1,
  totalApiKey: 4,
  biayaPerBulan: [
    { bulan: 'Jul', totalBiaya: 18500000, jumlahPasien: 5 },
    { bulan: 'Agu', totalBiaya: 24300000, jumlahPasien: 7 },
    { bulan: 'Sep', totalBiaya: 62800000, jumlahPasien: 12 },
    { bulan: 'Okt', totalBiaya: 77705000, jumlahPasien: 15 },
  ],
  distribusiTriase: [
    { triase: 'Sangat Berat', jumlah: 4, warna: '#ef4444' },
    { triase: 'Berat', jumlah: 8, warna: '#f97316' },
    { triase: 'Sedang', jumlah: 2, warna: '#eab308' },
    { triase: 'Ringan', jumlah: 1, warna: '#22c55e' },
  ],
};
