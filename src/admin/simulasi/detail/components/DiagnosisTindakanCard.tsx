import React from 'react';

export interface DiagnosisTindakanCardProps {
  diagnosis: string;
  icd10: string;
  tindakanList?: string[];
}

export const DiagnosisTindakanCard: React.FC<DiagnosisTindakanCardProps> = ({
  diagnosis,
  icd10,
  tindakanList = ['Laboratorium darah', 'Injeksi'],
}) => {
  return (
    <section className="detail-simulasi-card diag-tindakan-card" id="diag-tindakan-card">
      <h3 className="detail-card-title">
        <span>DIAGNOSIS &amp; TINDAKAN</span>
      </h3>

      <div className="diag-tindakan-grid">
        {/* Left Column: Diagnosis */}
        <div className="diag-col">
          <span className="diag-col__label">Diagnosis</span>
          <div className="diag-item-row">
            <span className="diag-name">{diagnosis}</span>
            <span className="icd10-badge" title="Kode ICD-10 Diagnosis Resmi">
              {icd10}
            </span>
          </div>
        </div>

        {/* Right Column: Tindakan */}
        <div className="tindakan-col">
          <span className="tindakan-col__label">Tindakan</span>
          <div className="tindakan-tags-row">
            {tindakanList.length > 0 ? (
              tindakanList.map((item) => (
                <span key={item} className="tindakan-badge">
                  {item}
                </span>
              ))
            ) : (
              <span style={{ fontSize: '13px', color: '#9CA3AF' }}>Belum ada tindakan tercatat</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiagnosisTindakanCard;
