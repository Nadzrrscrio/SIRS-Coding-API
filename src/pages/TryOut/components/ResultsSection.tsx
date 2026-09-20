/**
 * ResultsSection — Bagian "Hasil" yang menampilkan kumpulan ResultCard.
 * Menggunakan aria-live agar pembaca layar mengumumkan hasil baru.
 */

import type { MockResult } from '../constants/mockData';
import ResultCard from './ResultCard';

interface ResultsSectionProps {
  results: MockResult[];
}

export default function ResultsSection({ results }: ResultsSectionProps) {
  return (
    <section className="tryout-results" aria-label="Hasil koding">
      <h2 className="tryout-results__title">Hasil</h2>
      <div
        className="tryout-results__grid"
        aria-live="polite"
        aria-atomic="false"
      >
        {results.length === 0 ? (
          <p className="tryout-results__empty">
            Belum ada hasil. Masukkan teks dan klik "Kodekan" untuk memulai.
          </p>
        ) : (
          results.map((result) => (
            <ResultCard key={`${result.system}-${result.code}`} result={result} />
          ))
        )}
      </div>
    </section>
  );
}
