/**
 * TryOut Page — Halaman "Uji Coba" API koding klinis.
 *
 * Semua data masih menggunakan mock (constants/mockData.ts).
 * TODO: Hubungkan ke backend saat diminta:
 *   - Kartu kiri  → POST /api/v1/trial/code
 *   - Kartu kanan → POST /api/v1/code/keluhan (tangani 401/403)
 *   - Kuota       → GET  /api/v1/trial/quota
 */

import { useState } from 'react';
import './styles/TryOut.css';

import TryOutHeader from './components/TryOutHeader';
import QuotaBadge from './components/QuotaBadge';
import SingleCodeCard from './components/SingleCodeCard';
import MultiCodeCard from './components/MultiCodeCard';
import ResultsSection from './components/ResultsSection';
import TryOutFooter from './components/TryOutFooter';
import {
  INITIAL_QUOTA,
  MOCK_SINGLE_RESULTS,
  MOCK_MULTI_RESULTS,
  type MockResult,
} from './constants/mockData';

export default function TryOutPage() {
  /* ---------- Left card state ---------- */
  const [singleInput, setSingleInput] = useState('');
  const [selectedModule, setSelectedModule] = useState('snomed-ct-finding');
  const [singleLoading, setSingleLoading] = useState(false);
  const [singleError, setSingleError] = useState('');

  /* ---------- Right card state ---------- */
  const [multiKeluhan, setMultiKeluhan] = useState('');
  const [multiDiagnosa, setMultiDiagnosa] = useState('');
  const [maxResults, setMaxResults] = useState(5);
  const [mode, setMode] = useState('fast');
  const [multiLoading, setMultiLoading] = useState(false);
  const [multiError, setMultiError] = useState('');

  /* ---------- Shared state ---------- */
  const [results, setResults] = useState<MockResult[]>([]);
  const [quota, setQuota] = useState(INITIAL_QUOTA);

  /* ---------- Handlers ---------- */

  const handleChipClick = (text: string) => {
    setSingleInput(text);
    setSingleError('');
  };

  const handleSingleSubmit = () => {
    // Validasi
    const trimmed = singleInput.trim();
    if (!trimmed) {
      setSingleError('Masukkan teks keluhan terlebih dahulu.');
      return;
    }
    if (trimmed.length > 1000) {
      setSingleError('Teks terlalu panjang (maks. 1000 karakter).');
      return;
    }

    setSingleError('');
    setSingleLoading(true);

    // TODO: Ganti setTimeout dengan panggilan POST /api/v1/trial/code
    //       dan gunakan normalizeResults() adapter pada response.
    setTimeout(() => {
      setResults(MOCK_SINGLE_RESULTS);
      setQuota((prev) => Math.max(0, prev - 1));
      setSingleLoading(false);
    }, 600);
  };

  const handleMultiSubmit = () => {
    // Validasi
    const trimmed = multiKeluhan.trim();
    if (!trimmed) {
      setMultiError('Masukkan teks keluhan terlebih dahulu.');
      return;
    }
    if (trimmed.length > 1000) {
      setMultiError('Teks keluhan terlalu panjang (maks. 1000 karakter).');
      return;
    }

    setMultiError('');
    setMultiLoading(true);

    // TODO: Ganti setTimeout dengan panggilan POST /api/v1/code/keluhan
    //       Endpoint ini TIDAK punya versi trial.
    //       Tangani 401/403 dengan pesan ramah, jangan menebak autentikasi.
    setTimeout(() => {
      setResults(MOCK_MULTI_RESULTS);
      setQuota((prev) => Math.max(0, prev - 1));
      setMultiLoading(false);
    }, 600);
  };

  /* ---------- Render ---------- */

  return (
    <div className="tryout-page">
      <TryOutHeader />

      <section className="tryout-hero">
        <h1 className="tryout-hero__title">Uji Coba</h1>
        <p className="tryout-hero__subtitle">
          Coba langsung tanpa daftar. Kuota terbatas per hari per perangkat.
        </p>
      </section>

      <QuotaBadge remaining={quota} total={INITIAL_QUOTA} />

      <section className="tryout-cards" aria-label="Form koding">
        <SingleCodeCard
          input={singleInput}
          onInputChange={(v) => { setSingleInput(v); setSingleError(''); }}
          module={selectedModule}
          onModuleChange={setSelectedModule}
          onSubmit={handleSingleSubmit}
          loading={singleLoading}
          error={singleError}
          onChipClick={handleChipClick}
        />
        <MultiCodeCard
          keluhan={multiKeluhan}
          onKeluhanChange={(v) => { setMultiKeluhan(v); setMultiError(''); }}
          diagnosa={multiDiagnosa}
          onDiagnosaChange={setMultiDiagnosa}
          maxResults={maxResults}
          onMaxResultsChange={setMaxResults}
          mode={mode}
          onModeChange={setMode}
          onSubmit={handleMultiSubmit}
          loading={multiLoading}
          error={multiError}
        />
      </section>

      <ResultsSection results={results} />

      <TryOutFooter />
    </div>
  );
}
