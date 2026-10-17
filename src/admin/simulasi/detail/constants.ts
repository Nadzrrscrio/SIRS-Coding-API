export const GEJALA_CATALOG: string[] = [
  'demam',
  'mencret',
  'muntah',
  'mual',
  'batuk',
  'pilek',
  'sesak napas',
  'sakit kepala',
  'sakit perut',
  'nyeri dada',
  'badan pegal',
  'pusing',
  'mata merah',
  'gatal',
  'lemas',
  'sulit tidur',
  'mengi',
];

export const TINDAKAN_CATALOG: string[] = [
  'Operasi usus buntu',
  'Operasi caesar',
  'Operasi katarak',
  'Operasi kolesistektomi',
  'Operasi ORIF femur',
  'Hemodialisis',
  'Nebulizer',
  'Rontgen dada',
  'CT Scan kepala',
  'Endoskopi',
  'Fisioterapi',
  'Kemoterapi',
  'Laboratorium darah',
];

export const DIAGNOSIS_MODULES = [
  { value: 'icd-10', label: 'Modul: ICD-10 (diagnosis resmi)' },
  { value: 'snomed-ct', label: 'Modul: SNOMED CT (keluhan & observasi)' },
  { value: 'icd-9', label: 'Modul: ICD-9 (prosedur klinis)' },
  { value: 'in-cbg', label: 'Modul: IN-CBG (klaim & grouper)' },
];

export const CODING_MODES = [
  { id: 'Auto', label: 'Auto' },
  { id: 'Rule', label: 'Rule' },
  { id: 'ML', label: 'ML' },
  { id: 'LLM', label: 'LLM' },
] as const;

export const DEFAULT_VITAL_SIGNS = {
  td: '120/80',
  hr: '92',
  rr: '22',
  suhu: '38.4 C',
  spo2: '96%',
};
