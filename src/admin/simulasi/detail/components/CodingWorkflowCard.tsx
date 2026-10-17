import React, { useState } from 'react';
import { CodingTab, CodingMode } from '../types';
import {
  GEJALA_CATALOG,
  TINDAKAN_CATALOG,
  DIAGNOSIS_MODULES,
  CODING_MODES,
} from '../constants';

export interface CodingWorkflowCardProps {
  activeTab: CodingTab;
  onTabChange: (tab: CodingTab) => void;
  mode: CodingMode;
  onModeChange: (mode: CodingMode) => void;
  selectedGejala: string[];
  onToggleGejala: (gejala: string) => void;
  onAddCustomGejala: (gejala: string) => void;
  selectedModule: string;
  onModuleChange: (mod: string) => void;
  diagnosis: string;
  onDiagnosisChange: (diag: string) => void;
  selectedTindakan: string[];
  onToggleTindakan: (tindakan: string) => void;
  onAddCustomTindakan: (tindakan: string) => void;
  onKodekan: () => void;
  onSimulasiDiagnosis: () => void;
  isProcessing: boolean;
  notification: { type: 'success' | 'info'; message: string } | null;
  onDismissNotification: () => void;
}

export const CodingWorkflowCard: React.FC<CodingWorkflowCardProps> = ({
  activeTab,
  onTabChange,
  mode,
  onModeChange,
  selectedGejala,
  onToggleGejala,
  onAddCustomGejala,
  selectedModule,
  onModuleChange,
  diagnosis,
  onDiagnosisChange,
  selectedTindakan,
  onToggleTindakan,
  onAddCustomTindakan,
  onKodekan,
  onSimulasiDiagnosis,
  isProcessing,
  notification,
  onDismissNotification,
}) => {
  const [customGejala, setCustomGejala] = useState('');
  const [customTindakan, setCustomTindakan] = useState('');

  const handleAddGejalaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customGejala.trim()) {
      onAddCustomGejala(customGejala.trim());
      setCustomGejala('');
    }
  };

  const handleAddTindakanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customTindakan.trim()) {
      onAddCustomTindakan(customTindakan.trim());
      setCustomTindakan('');
    }
  };

  return (
    <section className="detail-simulasi-card coding-workflow-card" id="coding-workflow-card">
      <h3 className="detail-card-title">
        <span>PENGKODEAN (IKUT ALUR KLINIS)</span>
      </h3>

      {/* Step Tabs */}
      <div className="workflow-tab-bar" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'gejala'}
          className={`workflow-tab-btn ${activeTab === 'gejala' ? 'workflow-tab-btn--active' : ''}`}
          onClick={() => onTabChange('gejala')}
        >
          01. Gejala
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'diagnosis'}
          className={`workflow-tab-btn ${activeTab === 'diagnosis' ? 'workflow-tab-btn--active' : ''}`}
          onClick={() => onTabChange('diagnosis')}
        >
          02. Diagnosis
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'tindakan'}
          className={`workflow-tab-btn ${activeTab === 'tindakan' ? 'workflow-tab-btn--active' : ''}`}
          onClick={() => onTabChange('tindakan')}
        >
          03. Tindakan
        </button>
      </div>

      {/* Live notification feedback */}
      {notification && (
        <div className={`feedback-alert feedback-alert--${notification.type}`}>
          <span>{notification.type === 'success' ? '✓' : 'ℹ'}</span>
          <span style={{ flex: 1 }}>{notification.message}</span>
          <button
            type="button"
            onClick={onDismissNotification}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 800,
              fontSize: '14px',
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Tab 1: Gejala */}
      {activeTab === 'gejala' && (
        <div className="workflow-content">
          {/* Selected pills & catalog pills */}
          <div className="chip-cloud">
            {/* Catalog symptoms */}
            {GEJALA_CATALOG.map((item) => {
              const isSelected = selectedGejala.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  className={`chip-item ${isSelected ? 'chip-item--active' : ''}`}
                  onClick={() => onToggleGejala(item)}
                >
                  <span>{item}</span>
                  {isSelected && <span className="chip-remove-icon">✕</span>}
                </button>
              );
            })}

            {/* Custom added symptoms that aren't in catalog */}
            {selectedGejala
              .filter((item) => !GEJALA_CATALOG.includes(item))
              .map((item) => (
                <button
                  key={item}
                  type="button"
                  className="chip-item chip-item--active"
                  onClick={() => onToggleGejala(item)}
                  title="Klik untuk menghapus gejala"
                >
                  <span>{item}</span>
                  <span className="chip-remove-icon">✕</span>
                </button>
              ))}
          </div>

          {/* Add custom symptom input */}
          <form className="custom-add-row" onSubmit={handleAddGejalaSubmit}>
            <input
              type="text"
              className="custom-add-input"
              placeholder="tulis gejala lain lalu + Tambah"
              value={customGejala}
              onChange={(e) => setCustomGejala(e.target.value)}
            />
            <button type="submit" className="custom-add-btn">
              + Tambah
            </button>
          </form>
        </div>
      )}

      {/* Tab 2: Diagnosis */}
      {activeTab === 'diagnosis' && (
        <div className="workflow-content">
          <div className="diagnosis-form-group">
            <select
              className="diagnosis-select"
              value={selectedModule}
              onChange={(e) => onModuleChange(e.target.value)}
              aria-label="Pilih Modul Diagnosis"
            >
              {DIAGNOSIS_MODULES.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>

            <input
              type="text"
              className="diagnosis-input"
              value={diagnosis}
              onChange={(e) => onDiagnosisChange(e.target.value)}
              placeholder="Ketik nama diagnosis klinis dokter..."
            />
          </div>
        </div>
      )}

      {/* Tab 3: Tindakan */}
      {activeTab === 'tindakan' && (
        <div className="workflow-content">
          <div className="chip-cloud">
            {TINDAKAN_CATALOG.map((item) => {
              const isSelected = selectedTindakan.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  className={`chip-item ${isSelected ? 'chip-item--active' : ''}`}
                  onClick={() => onToggleTindakan(item)}
                >
                  <span>{item}</span>
                  {isSelected && <span className="chip-remove-icon">✕</span>}
                </button>
              );
            })}

            {/* Custom added tindakan */}
            {selectedTindakan
              .filter((item) => !TINDAKAN_CATALOG.includes(item))
              .map((item) => (
                <button
                  key={item}
                  type="button"
                  className="chip-item chip-item--active"
                  onClick={() => onToggleTindakan(item)}
                  title="Klik untuk menghapus tindakan"
                >
                  <span>{item}</span>
                  <span className="chip-remove-icon">✕</span>
                </button>
              ))}
          </div>

          <form className="custom-add-row" onSubmit={handleAddTindakanSubmit}>
            <input
              type="text"
              className="custom-add-input"
              placeholder="tulis tindakan lain dari SIRS lalu + Tambah"
              value={customTindakan}
              onChange={(e) => setCustomTindakan(e.target.value)}
            />
            <button type="submit" className="custom-add-btn">
              + Tambah
            </button>
          </form>

          <p className="catalog-note">
            Tindakan dari katalog SIRS — bukan dari keluhan pasien. Sistem keluarkan kode ICD-9 per tindakan.
          </p>
        </div>
      )}

      {/* Mode Pengkodean Switcher */}
      <div className="mode-pengkodean-section">
        <span className="mode-pengkodean-label">MODE PENGKODEAN</span>
        <div className="mode-segmented-bar" role="radiogroup">
          {CODING_MODES.map((m) => {
            const isCurrent = mode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                role="radio"
                aria-checked={isCurrent}
                className={`mode-segmented-btn ${isCurrent ? 'mode-segmented-btn--active' : ''}`}
                onClick={() => onModeChange(m.id as CodingMode)}
              >
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Buttons: Kodekan & Simulasi Diagnosis */}
      <div className="coding-action-row">
        <button
          type="button"
          className="btn-kodekan"
          onClick={onKodekan}
          disabled={isProcessing}
        >
          {isProcessing ? 'Memproses Engine SIRS...' : 'Kodekan'}
        </button>

        <button
          type="button"
          className="btn-simulasi-diagnosis"
          onClick={onSimulasiDiagnosis}
          disabled={isProcessing}
        >
          Simulasi diagnosis
        </button>
      </div>
    </section>
  );
};

export default CodingWorkflowCard;
