/**
 * Mock data untuk halaman Uji Coba.
 * TODO: Ganti data contoh dengan response nyata dari API saat backend terhubung.
 */

export interface MockResult {
  system: string;
  code: string;
  display: string;
  confidence: number;
}

export const SAMPLE_CHIPS = [
  'jari tangan kesemutan terus',
  'nyeri dada',
  'perut kembung & mual',
  'telinga berdengung',
] as const;

export const MODULE_OPTIONS = [
  { value: 'snomed-ct-finding', label: 'SNOMED CT - Gejala/Temuan' },
  { value: 'icd-10', label: 'ICD-10 - Diagnosis' },
  { value: 'icd-9', label: 'ICD-9 - Tindakan' },
  { value: 'incbg', label: 'IN-CBG - Klaim' },
] as const;

export const MAX_RESULTS_OPTIONS = [3, 5, 10] as const;

export const MODE_OPTIONS = [
  { value: 'fast', label: 'Cepat' },
  { value: 'auto', label: 'Otomatis' },
] as const;

/** Hasil contoh kartu kiri (single coding) */
export const MOCK_SINGLE_RESULTS: MockResult[] = [
  {
    system: 'SNOMED CT',
    code: '271327008',
    display: 'Tingling sensation of skin (finding)',
    confidence: 0.98,
  },
  {
    system: 'ICD-10',
    code: 'R20.2',
    display: 'Paraesthesia of skin',
    confidence: 0.95,
  },
];

/** Hasil contoh kartu kanan (multi coding) */
export const MOCK_MULTI_RESULTS: MockResult[] = [
  {
    system: 'SNOMED CT',
    code: '29857009',
    display: 'Chest pain (finding)',
    confidence: 0.97,
  },
  {
    system: 'ICD-10',
    code: 'R07.9',
    display: 'Chest pain, unspecified',
    confidence: 0.93,
  },
];

export const INITIAL_QUOTA = 25;
