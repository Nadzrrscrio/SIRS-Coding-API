/**
 * Form configuration constants and TypeScript interfaces.
 * Single source of truth for all form-related configuration values.
 */

export interface OrganizationOption {
  value: string;
  label: string;
}

export interface FileUploadConfig {
  acceptedTypes: string[];
  acceptedExtensions: string;
  maxSizeBytes: number;
  maxSizeLabel: string;
}

export interface TextareaConfig {
  maxLength: number;
}

export interface RegisterFormData {
  nama: string;
  email: string;
  jenisOrganisasi: string;
  namaOrganisasi: string;
  situsWeb: string;
  alasan: string;
  dokumen: File | null;
}

export interface WhatsAppConfig {
  phoneNumber: string;
  message: string;
}

export const ORGANIZATION_TYPES: OrganizationOption[] = [
  { value: '', label: 'Pilih jenis organisasi' },
  { value: 'rumah_sakit', label: 'Rumah Sakit' },
  { value: 'klinik', label: 'Klinik' },
  { value: 'developer', label: 'Developer' },
  { value: 'lainnya', label: 'Lainnya' },
];

export const FILE_UPLOAD_CONFIG: FileUploadConfig = {
  acceptedTypes: ['application/pdf', 'image/jpeg', 'image/jpg'],
  acceptedExtensions: '.pdf,.jpg,.jpeg',
  maxSizeBytes: 5 * 1024 * 1024, // 5MB
  maxSizeLabel: '5MB',
};

export const TEXTAREA_CONFIG: TextareaConfig = {
  maxLength: 1000,
};

export const FORM_INITIAL_VALUES: RegisterFormData = {
  nama: '',
  email: '',
  jenisOrganisasi: '',
  namaOrganisasi: '',
  situsWeb: '',
  alasan: '',
  dokumen: null,
};

export const WHATSAPP_CONFIG: WhatsAppConfig = {
  phoneNumber: '6281234567890',
  message: 'Halo, saya ingin bertanya tentang akses API SIRS.',
};
