import React from 'react';

export interface DetailSubBarProps {
  onBack: () => void;
  onClose?: () => void;
}

export const DetailSubBar: React.FC<DetailSubBarProps> = ({ onBack, onClose }) => {
  return (
    <div className="detail-sub-bar" id="detail-sub-bar">
      <button
        type="button"
        className="detail-sub-bar__btn"
        onClick={onBack}
        aria-label="Kembali ke daftar simulasi"
      >
        <span>←</span>
        <span>Kembali</span>
      </button>

      <button
        type="button"
        className="detail-sub-bar__btn detail-sub-bar__btn--close"
        onClick={onClose || onBack}
        aria-label="Tutup detail pasien"
      >
        <span>Tutup</span>
      </button>
    </div>
  );
};

export default DetailSubBar;
