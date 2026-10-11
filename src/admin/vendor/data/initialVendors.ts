/**
 * Initial mock data for Vendor Registrations
 * Matches the Figma/UI mockup precisely
 */

import { VendorRegistration } from '../types/vendor';

export const INITIAL_VENDOR_REGISTRATIONS: VendorRegistration[] = [
  {
    id: 2,
    nama: 'Wira Yudha',
    email: 'wirapratama020304@gmail.com',
    jenis: 'vendor',
    org: 'Unisoft',
    situs: '-',
    status: 'pending',
    dok: 'Surat_Keterangan_Unisoft.pdf',
    alasan: 'Integrasi sistem billing RS ke modul koding SIRS ICD-10 otomatis.',
    tanggalDaftar: '2026-10-10 14:30',
  },
  {
    id: 1,
    nama: 'Andi',
    email: 'andi@rss.test',
    jenis: 'rumah sakit',
    org: 'RS Sehat',
    situs: 'https://rss.test',
    status: 'approved',
    dok: 'Izin_Operasional_RS.pdf',
    alasan: 'Implementasi klaim IN-CBG dan integrasi SIMRS kamar inap.',
    apiKey: 'sk-sirs-81f9a2b4c8e10d29',
    tanggalDaftar: '2026-10-08 09:15',
    approvedAt: '2026-10-09 11:00',
  },
  {
    id: 3,
    nama: 'dr. Siti Rahayu',
    email: 'siti.rahayu@medikapratama.id',
    jenis: 'klinik',
    org: 'Klinik Medika Pratama',
    situs: 'https://medikapratama.id',
    status: 'pending',
    dok: 'SIP_Klinik_Medika.pdf',
    alasan: 'Koding keluhan dokter dengan standar SNOMED CT dan FHIR Condition.',
    tanggalDaftar: '2026-10-11 16:20',
  },
  {
    id: 4,
    nama: 'Budi Santoso',
    email: 'budi@healthdev.io',
    jenis: 'developer',
    org: 'HealthTech Studio',
    situs: 'https://healthdev.io',
    status: 'rejected',
    dok: 'Profil_Developer.pdf',
    alasan: 'Eksperimen riset personal sistem koding kesehatan.',
    tanggalDaftar: '2026-10-05 10:00',
    rejectedAt: '2026-10-06 08:30',
    rejectionReason: 'Berkas legalitas institusi tidak lengkap.',
  },
];
