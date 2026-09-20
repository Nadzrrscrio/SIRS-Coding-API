/**
 * Pure validation functions.
 * Each function validates a single field and returns an error message string.
 * Returns empty string ('') if valid.
 */

import { FILE_UPLOAD_CONFIG, RegisterFormData, TEXTAREA_CONFIG } from '../constants/formConfig';

export interface FormErrors {
  nama?: string;
  email?: string;
  jenisOrganisasi?: string;
  namaOrganisasi?: string;
  situsWeb?: string;
  alasan?: string;
  dokumen?: string;
  submit?: string;
  [key: string]: string | undefined;
}

export interface ValidationResult {
  isValid: boolean;
  errors: FormErrors;
}

/**
 * Validates the name field.
 */
export function validateName(value: string): string {
  if (!value || value.trim().length === 0) {
    return 'Nama wajib diisi.';
  }
  if (value.trim().length < 3) {
    return 'Nama minimal 3 karakter.';
  }
  return '';
}

/**
 * Validates the email field.
 */
export function validateEmail(value: string): string {
  if (!value || value.trim().length === 0) {
    return 'Email wajib diisi.';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value.trim())) {
    return 'Format email tidak valid.';
  }
  return '';
}

/**
 * Validates the organization type selection.
 */
export function validateOrganizationType(value: string): string {
  if (!value || value.trim().length === 0) {
    return 'Jenis organisasi wajib dipilih.';
  }
  return '';
}

/**
 * Validates the organization name field.
 */
export function validateOrganizationName(value: string): string {
  if (!value || value.trim().length === 0) {
    return 'Nama organisasi wajib diisi.';
  }
  return '';
}

/**
 * Validates the website URL field (optional).
 */
export function validateWebsite(value: string): string {
  if (!value || value.trim().length === 0) {
    return ''; // Optional field
  }
  try {
    new URL(value.trim());
    return '';
  } catch {
    return 'Format URL tidak valid (contoh: https://example.com).';
  }
}

/**
 * Validates the reason/integration plan textarea.
 */
export function validateReason(value: string): string {
  if (!value || value.trim().length === 0) {
    return 'Alasan pakai wajib diisi.';
  }
  if (value.length > TEXTAREA_CONFIG.maxLength) {
    return `Maksimal ${TEXTAREA_CONFIG.maxLength} karakter.`;
  }
  return '';
}

/**
 * Validates the uploaded document file.
 */
export function validateFile(file: File | null): string {
  if (!file) {
    return 'Dokumen verifikasi wajib diunggah.';
  }
  if (!FILE_UPLOAD_CONFIG.acceptedTypes.includes(file.type)) {
    return 'Format file harus PDF atau JPG.';
  }
  if (file.size > FILE_UPLOAD_CONFIG.maxSizeBytes) {
    return `Ukuran file maksimal ${FILE_UPLOAD_CONFIG.maxSizeLabel}.`;
  }
  return '';
}

/**
 * Validates the entire form data object.
 */
export function validateForm(formData: RegisterFormData): ValidationResult {
  const errors: FormErrors = {
    nama: validateName(formData.nama),
    email: validateEmail(formData.email),
    jenisOrganisasi: validateOrganizationType(formData.jenisOrganisasi),
    namaOrganisasi: validateOrganizationName(formData.namaOrganisasi),
    situsWeb: validateWebsite(formData.situsWeb),
    alasan: validateReason(formData.alasan),
    dokumen: validateFile(formData.dokumen),
  };

  const isValid = Object.values(errors).every((error) => error === '');

  return { isValid, errors };
}
