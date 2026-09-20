/**
 * ResultCard — Satu kartu hasil koding.
 * Menampilkan sistem, kode, deskripsi, dan tingkat keyakinan.
 */

import type { MockResult } from '../constants/mockData';

interface ResultCardProps {
  result: MockResult;
}

export default function ResultCard({ result }: ResultCardProps) {
  const confidencePercent = Math.round(result.confidence * 100);

  return (
    <article className="tryout-result-card">
      <div className="tryout-result-card__header">
        <div className="tryout-result-card__system">
          <span className="tryout-result-card__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zM6 20V4h5v7h7v9H6z" />
            </svg>
          </span>
          <span className="tryout-result-card__system-name">{result.system}</span>
        </div>
        <span className="tryout-result-card__confidence">
          {confidencePercent}%
        </span>
      </div>
      <p className="tryout-result-card__code">{result.code}</p>
      <p className="tryout-result-card__display">{result.display}</p>
    </article>
  );
}
