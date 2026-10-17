import React, { useState } from 'react';

export interface RiwayatCardProps {
  riwayat?: string[];
  onAddRiwayat?: (riwayat: string) => void;
  onRemoveRiwayat?: (riwayat: string) => void;
}

export const RiwayatCard: React.FC<RiwayatCardProps> = ({
  riwayat = ['Diare', 'Tipus'],
  onAddRiwayat,
  onRemoveRiwayat,
}) => {
  const [newTag, setNewTag] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag.trim() && onAddRiwayat) {
      onAddRiwayat(newTag.trim());
      setNewTag('');
      setIsAdding(false);
    }
  };

  return (
    <section className="detail-simulasi-card riwayat-card" id="riwayat-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <h3 className="detail-card-title" style={{ margin: 0 }}>
          <span>RIWAYAT</span>
        </h3>
        {!isAdding && onAddRiwayat && (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#E20D20',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            + Tambah Riwayat
          </button>
        )}
      </div>

      <div className="riwayat-tag-list">
        {riwayat.map((item) => (
          <span key={item} className="riwayat-tag">
            <span>{item}</span>
            {onRemoveRiwayat && (
              <button
                type="button"
                onClick={() => onRemoveRiwayat(item)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#9CA3AF',
                  padding: 0,
                  fontSize: '11px',
                }}
                title="Hapus riwayat"
              >
                ✕
              </button>
            )}
          </span>
        ))}

        {isAdding && (
          <form onSubmit={handleSubmit} style={{ display: 'inline-flex', gap: '6px' }}>
            <input
              type="text"
              autoFocus
              className="custom-add-input"
              style={{ padding: '4px 10px', fontSize: '12px' }}
              placeholder="Riwayat penyakit..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
            <button
              type="submit"
              className="custom-add-btn"
              style={{ padding: '4px 10px', fontSize: '12px' }}
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#6B7280',
                fontSize: '12px',
              }}
            >
              Batal
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default RiwayatCard;
