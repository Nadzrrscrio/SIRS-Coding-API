/**
 * MultiCodeCard — Kartu kanan: Keluhan + Diagnosa - Multi-output.
 * Dua input (keluhan + diagnosa opsional), dropdown Max Hasil & Mode.
 * TODO: Ganti simulasi dengan POST /api/v1/code/keluhan.
 * NOTE: Endpoint ini tidak punya versi trial. Tangani 401/403 dengan
 *       pesan ramah saat integrasi backend.
 */

import { MAX_RESULTS_OPTIONS, MODE_OPTIONS } from '../constants/mockData';

interface MultiCodeCardProps {
  keluhan: string;
  onKeluhanChange: (value: string) => void;
  diagnosa: string;
  onDiagnosaChange: (value: string) => void;
  maxResults: number;
  onMaxResultsChange: (value: number) => void;
  mode: string;
  onModeChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  error: string;
}

export default function MultiCodeCard({
  keluhan,
  onKeluhanChange,
  diagnosa,
  onDiagnosaChange,
  maxResults,
  onMaxResultsChange,
  mode,
  onModeChange,
  onSubmit,
  loading,
  error,
}: MultiCodeCardProps) {
  return (
    <div className="tryout-multi">
      <h2 className="tryout-multi__title">Keluhan + Diagnosa - Multi-output</h2>
      <p className="tryout-multi__desc">
        Kirim teks keluhan dan diagnosa sekaligus, dapatkan beberapa kode hasil
        dalam satu permintaan.
      </p>

      {/* Baris 1: Teks Keluhan + Teks Diagnosa */}
      <div className="tryout-multi__row">
        <div className="tryout-multi__field">
          <label htmlFor="multi-keluhan" className="tryout-multi__label">
            Teks Keluhan
          </label>
          <input
            id="multi-keluhan"
            className="tryout-multi__input"
            type="text"
            placeholder="Masukkan keluhan..."
            value={keluhan}
            onChange={(e) => onKeluhanChange(e.target.value)}
            maxLength={1000}
            aria-describedby={error ? 'multi-error' : undefined}
            aria-invalid={error ? true : undefined}
          />
        </div>
        <div className="tryout-multi__field">
          <label htmlFor="multi-diagnosa" className="tryout-multi__label">
            Teks Diagnosa (opsional)
          </label>
          <input
            id="multi-diagnosa"
            className="tryout-multi__input"
            type="text"
            placeholder="Opsional..."
            value={diagnosa}
            onChange={(e) => onDiagnosaChange(e.target.value)}
            maxLength={1000}
          />
        </div>
      </div>

      {/* Baris 2: Max Hasil + Mode */}
      <div className="tryout-multi__row">
        <div className="tryout-multi__field">
          <label htmlFor="multi-max" className="tryout-multi__label">
            Max Hasil
          </label>
          <select
            id="multi-max"
            className="tryout-multi__select"
            value={maxResults}
            onChange={(e) => onMaxResultsChange(Number(e.target.value))}
          >
            {MAX_RESULTS_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div className="tryout-multi__field">
          <label htmlFor="multi-mode" className="tryout-multi__label">
            Mode
          </label>
          <select
            id="multi-mode"
            className="tryout-multi__select"
            value={mode}
            onChange={(e) => onModeChange(e.target.value)}
          >
            {MODE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <p className="tryout-error" id="multi-error" role="alert">
          {error}
        </p>
      )}

      <button
        type="button"
        className="tryout-multi__submit"
        onClick={onSubmit}
        disabled={loading}
        aria-busy={loading}
      >
        {loading && <span className="tryout-spinner" aria-hidden="true" />}
        {loading ? 'Memproses...' : 'Kodekan Keluhan (Multi)'}
      </button>
    </div>
  );
}
