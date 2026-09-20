/**
 * SingleCodeCard — Kartu kiri: Keluhan / Diagnosis / Tindakan.
 * Textarea, dropdown modul, tombol Kodekan, dan chip contoh.
 * TODO: Ganti simulasi dengan POST /api/v1/trial/code.
 */

import { SAMPLE_CHIPS, MODULE_OPTIONS } from '../constants/mockData';

interface SingleCodeCardProps {
  input: string;
  onInputChange: (value: string) => void;
  module: string;
  onModuleChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  error: string;
  onChipClick: (text: string) => void;
}

export default function SingleCodeCard({
  input,
  onInputChange,
  module,
  onModuleChange,
  onSubmit,
  loading,
  error,
  onChipClick,
}: SingleCodeCardProps) {
  return (
    <div className="tryout-single">
      <h2 className="tryout-single__title">Keluhan / Diagnosis / Tindakan</h2>

      <label htmlFor="single-input" className="tryout-single__label">
        Teks keluhan
      </label>
      <textarea
        id="single-input"
        className="tryout-single__textarea"
        placeholder="Ketik keluhan medis di sini..."
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        maxLength={1000}
        aria-describedby={error ? 'single-error' : undefined}
        aria-invalid={error ? true : undefined}
      />

      {error && (
        <p className="tryout-error" id="single-error" role="alert">
          {error}
        </p>
      )}

      <div className="tryout-single__select-group">
        <label htmlFor="single-module" className="tryout-single__label">
          Modul
        </label>
        <select
          id="single-module"
          className="tryout-single__select"
          value={module}
          onChange={(e) => onModuleChange(e.target.value)}
        >
          {MODULE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        className="tryout-single__submit"
        onClick={onSubmit}
        disabled={loading}
        aria-busy={loading}
      >
        {loading && <span className="tryout-spinner" aria-hidden="true" />}
        {loading ? 'Memproses...' : 'Kodekan'}
      </button>

      <p className="tryout-single__chips-label">Atau Pilih Contoh</p>
      <div className="tryout-single__chips" role="group" aria-label="Contoh keluhan">
        {SAMPLE_CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            className="tryout-single__chip"
            onClick={() => onChipClick(chip)}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
