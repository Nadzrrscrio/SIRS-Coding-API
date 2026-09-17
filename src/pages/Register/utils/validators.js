/**
 * Pure validation functions.
 * Each function validates a single field and returns an error message string.
 * Returns empty string ('') if valid.
 * Following Single Responsibility Principle — only handles validation logic.
 */

import { FILE_UPLOAD_CONFIG, TEXTAREA_CONFIG } from '../constants/formConfig';

/**
 * Validates the name field.
 * @param {string} value
 * @returns {string} Error message or empty string
 */
export function validateName(value) {
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
 * @param {string} value
 * @returns {string} Error message or empty string
 */
export function validateEmail(value) {
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
 * @param {string} value
 * @returns {string} Error message or empty string
 */
export function validateOrganizationType(value) {
  if (!value || value.trim().length === 0) {
    return 'Jenis organisasi wajib dipilih.';
  }
  return '';
}

/**
 * Validates the organization name field.
 * @param {string} value
 * @returns {string} Error message or empty string
 */
export function validateOrganizationName(value) {
  if (!value || value.trim().length === 0) {
    return 'Nama organisasi wajib diisi.';
  }
  return '';
}

/**
 * Validates the website URL field (optional).
 * @param {string} value
 * @returns {string} Error message or empty string
 */
export function validateWebsite(value) {
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
 * @param {string} value
 * @returns {string} Error message or empty string
 */
export function validateReason(value) {
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
 * @param {File|null} file
 * @returns {string} Error message or empty string
 */
export function validateFile(file) {
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
 * @param {Object} formData - The form data to validate
 * @returns {{ isValid: boolean, errors: Object }} Validation result
 */
export function validateForm(formData) {
  const errors = {
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
