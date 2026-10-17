import { Patient, VitalSigns, TriasePasien, JalurPasien } from '../types/simulasi';

export type CodingTab = 'gejala' | 'diagnosis' | 'tindakan';
export type CodingMode = 'Auto' | 'Rule' | 'ML' | 'LLM';

export interface PatientDetailProps {
  patient: Patient;
  onBack: () => void;
  onUpdatePatient?: (updatedPatient: Patient) => void;
  onNavigateLanding?: () => void;
}

export interface CodingWorkflowState {
  activeTab: CodingTab;
  mode: CodingMode;
  selectedGejala: string[];
  customGejalaInput: string;
  selectedModule: string;
  diagnosisInput: string;
  selectedTindakan: string[];
  customTindakanInput: string;
  isProcessing: boolean;
  processNotification: {
    type: 'success' | 'info';
    message: string;
  } | null;
}
