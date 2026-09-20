/**
 * RegisterForm component.
 * Acts as the orchestrator that composes FormField, FileUpload, and SubmitButton.
 * Delegates state management to useRegisterForm hook.
 * Delegates validation to validators.ts.
 */

import { ORGANIZATION_TYPES, TEXTAREA_CONFIG } from '../../constants/formConfig';
import { useRegisterForm } from '../../hooks/useRegisterForm';
import FileUpload from './FileUpload';
import FormField from './FormField';
import './RegisterForm.css';
import SubmitButton from './SubmitButton';

export default function RegisterForm() {
  const {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    handleChange,
    handleFileChange,
    handleFileRemove,
    handleSubmit,
  } = useRegisterForm();

  return (
    <form className="register-form" onSubmit={handleSubmit} noValidate id="register-form">
      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="register-form__alert register-form__alert--success" role="alert">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span>Pendaftaran berhasil dikirim! Kami akan menghubungi Anda dalam 1–2 hari kerja.</span>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && errors.submit && (
        <div className="register-form__alert register-form__alert--error" role="alert">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E20D20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          <span>{errors.submit}</span>
        </div>
      )}

      {/* Nama Anda */}
      <FormField
        label="NAMA ANDA"
        id="nama"
        type="text"
        placeholder="dr. Siti Rahayu"
        value={formData.nama}
        onChange={(value) => handleChange('nama', value)}
        error={errors.nama}
      />

      {/* Email */}
      <FormField
        label="EMAIL"
        id="email"
        type="email"
        placeholder="nama@rumahsakit.co.id"
        value={formData.email}
        onChange={(value) => handleChange('email', value)}
        error={errors.email}
      />

      {/* Jenis Organisasi */}
      <FormField
        label="JENIS ORGANISASI"
        id="jenisOrganisasi"
        type="select"
        value={formData.jenisOrganisasi}
        onChange={(value) => handleChange('jenisOrganisasi', value)}
        error={errors.jenisOrganisasi}
        options={ORGANIZATION_TYPES}
      />

      {/* Nama Organisasi */}
      <FormField
        label="NAMA ORGANISASI"
        id="namaOrganisasi"
        type="text"
        placeholder="RS Sehat Sentosa"
        value={formData.namaOrganisasi}
        onChange={(value) => handleChange('namaOrganisasi', value)}
        error={errors.namaOrganisasi}
      />

      {/* Situs Web (Opsional) */}
      <FormField
        label="SITUS WEB"
        id="situsWeb"
        type="text"
        placeholder="https://rumahsakit.co.id"
        value={formData.situsWeb}
        onChange={(value) => handleChange('situsWeb', value)}
        error={errors.situsWeb}
        optional
      />

      {/* Alasan Pakai / Rencana Integrasi */}
      <FormField
        label="ALASAN PAKAI / RENCANA INTEGRASI"
        id="alasan"
        type="textarea"
        placeholder="Jelaskan bagaimana API akan digunakan dalam sistem Anda..."
        value={formData.alasan}
        onChange={(value) => handleChange('alasan', value)}
        error={errors.alasan}
        maxLength={TEXTAREA_CONFIG.maxLength}
      />

      {/* Dokumen Verifikasi */}
      <FileUpload
        file={formData.dokumen}
        onFileChange={handleFileChange}
        onFileRemove={handleFileRemove}
        error={errors.dokumen}
      />

      {/* Submit Button */}
      <SubmitButton isSubmitting={isSubmitting} />
    </form>
  );
}
