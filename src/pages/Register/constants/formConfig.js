/**
 * Form configuration constants.
 * Single source of truth for all form-related configuration values.
 * Following Single Responsibility Principle — only defines config data.
 */

export const ORGANIZATION_TYPES = [
  { value: '', label: 'Pilih jenis organisasi' },
  { value: 'rumah_sakit', label: 'Rumah Sakit' },
  { value: 'klinik', label: 'Klinik' },
  { value: 'developer', label: 'Developer' },
  { value: 'lainnya', label: 'Lainnya' },
];

export const FILE_UPLOAD_CONFIG = {
  acceptedTypes: ['application/pdf', 'image/jpeg', 'image/jpg'],
  acceptedExtensions: '.pdf,.jpg,.jpeg',
  maxSizeBytes: 5 * 1024 * 1024, // 5MB
  maxSizeLabel: '5MB',
};

export const TEXTAREA_CONFIG = {
  maxLength: 1000,
};

export const FORM_INITIAL_VALUES = {
  nama: '',
  email: '',
  jenisOrganisasi: '',
  namaOrganisasi: '',
  situsWeb: '',
  alasan: '',
  dokumen: null,
};

export const WHATSAPP_CONFIG = {
  phoneNumber: '6281234567890',
  message: 'Halo, saya ingin bertanya tentang akses API SIRS.',
};
