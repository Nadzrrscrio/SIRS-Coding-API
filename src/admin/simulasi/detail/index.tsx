import React, { useState, useEffect } from 'react';
import { Patient } from '../types/simulasi';
import { CodingTab, CodingMode } from './types';
import DetailHeader from './components/DetailHeader';
import DetailSubBar from './components/DetailSubBar';
import PatientInfoCard from './components/PatientInfoCard';
import VitalSignsCard from './components/VitalSignsCard';
import CodingWorkflowCard from './components/CodingWorkflowCard';
import RiwayatCard from './components/RiwayatCard';
import DiagnosisTindakanCard from './components/DiagnosisTindakanCard';
import KlaimInCbgCard from './components/KlaimInCbgCard';
import './DetailSimulasi.css';

export interface PatientDetailPageProps {
  patient: Patient;
  onBack: () => void;
  onUpdatePatient?: (updatedPatient: Patient) => void;
  onNavigateLanding?: () => void;
}

export const PatientDetailPage: React.FC<PatientDetailPageProps> = ({
  patient,
  onBack,
  onUpdatePatient,
  onNavigateLanding,
}) => {
  // Tabs and Mode State
  const [activeTab, setActiveTab] = useState<CodingTab>('gejala');
  const [codingMode, setCodingMode] = useState<CodingMode>(
    patient.modePengkodean || 'Auto'
  );

  // Symptoms State
  const [selectedGejala, setSelectedGejala] = useState<string[]>(() => {
    if (patient.gejala && patient.gejala.length > 0) return patient.gejala;
    return [
      'demam tinggi 3 hari',
      'badan pegal',
      'mual dan muntah 2 hari',
      'bintik merah di kulit',
    ];
  });

  // Diagnosis State
  const [selectedModule, setSelectedModule] = useState('icd-10');
  const [diagnosis, setDiagnosis] = useState(patient.diagnosis || 'Dengue fever');
  const [icd10, setIcd10] = useState(patient.icd10 || 'A90');

  // Procedures / Tindakan State
  const [selectedTindakan, setSelectedTindakan] = useState<string[]>(() => {
    if (patient.tindakan && patient.tindakan.length > 0) return patient.tindakan;
    return ['Laboratorium darah', 'Injeksi'];
  });

  // History State
  const [riwayat, setRiwayat] = useState<string[]>(() => {
    if (patient.riwayat && patient.riwayat.length > 0) return patient.riwayat;
    return ['Diare', 'Tipus'];
  });

  // IN-CBG & Cost State
  const [kelompokKasus, setKelompokKasus] = useState(
    patient.kelompokKasus || patient.diagnosis || 'Dengue Fever'
  );
  const [kodeCbg, setKodeCbg] = useState(patient.inCbg || 'J-1-16-II');
  const [biayaTindakan, setBiayaTindakan] = useState(
    patient.biayaTindakan !== undefined ? patient.biayaTindakan : 250000
  );
  const [biayaRawat, setBiayaRawat] = useState(
    patient.biayaRawat !== undefined ? patient.biayaRawat : 2000000
  );
  const [totalBiaya, setTotalBiaya] = useState(patient.total || 2250000);

  // Simulation & Feedback State
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'info';
    message: string;
  } | null>(null);

  // Scroll to top upon opening
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Update total biaya when tindakan or rawat changes
  useEffect(() => {
    setTotalBiaya(biayaTindakan + biayaRawat);
  }, [biayaTindakan, biayaRawat]);

  // Symptoms handlers
  const handleToggleGejala = (gejala: string) => {
    setSelectedGejala((prev) => {
      const exists = prev.includes(gejala);
      if (exists) {
        return prev.filter((item) => item !== gejala);
      } else {
        return [...prev, gejala];
      }
    });
  };

  const handleAddCustomGejala = (customGejala: string) => {
    if (!selectedGejala.includes(customGejala)) {
      setSelectedGejala((prev) => [...prev, customGejala]);
      setNotification({
        type: 'info',
        message: `Gejala baru "${customGejala}" berhasil ditambahkan ke catatan klinis.`,
      });
    }
  };

  // Procedures handlers
  const handleToggleTindakan = (tindakan: string) => {
    setSelectedTindakan((prev) => {
      const exists = prev.includes(tindakan);
      let updated: string[];
      if (exists) {
        updated = prev.filter((item) => item !== tindakan);
      } else {
        updated = [...prev, tindakan];
      }
      // Dynamic adjustment of biaya tindakan
      const baseCost = updated.length * 125000;
      setBiayaTindakan(baseCost > 0 ? baseCost : 0);
      return updated;
    });
  };

  const handleAddCustomTindakan = (customTindakan: string) => {
    if (!selectedTindakan.includes(customTindakan)) {
      setSelectedTindakan((prev) => {
        const updated = [...prev, customTindakan];
        setBiayaTindakan(updated.length * 125000);
        return updated;
      });
      setNotification({
        type: 'info',
        message: `Tindakan baru "${customTindakan}" berhasil ditambahkan dari katalog SIRS.`,
      });
    }
  };

  // Medical history handlers
  const handleAddRiwayat = (item: string) => {
    if (!riwayat.includes(item)) {
      setRiwayat((prev) => [...prev, item]);
    }
  };

  const handleRemoveRiwayat = (item: string) => {
    setRiwayat((prev) => prev.filter((r) => r !== item));
  };

  // Action: Kodekan
  const handleKodekan = () => {
    setIsProcessing(true);
    setNotification(null);

    setTimeout(() => {
      setIsProcessing(false);

      // Determine codes based on diagnosis
      let assignedIcd = 'A90';
      let assignedCbg = 'J-1-16-II';
      let assignedKasus = diagnosis;

      const lowerDiag = diagnosis.toLowerCase();
      if (lowerDiag.includes('typhoid')) {
        assignedIcd = 'A01.0';
        assignedCbg = 'A-3-14-II';
      } else if (lowerDiag.includes('stroke')) {
        assignedIcd = 'I64';
        assignedCbg = 'A-4-13-I';
      } else if (lowerDiag.includes('appendicitis')) {
        assignedIcd = 'K35.9';
        assignedCbg = 'K-3-15-I';
      } else if (lowerDiag.includes('dengue')) {
        assignedIcd = 'A90';
        assignedCbg = 'J-1-16-II';
      } else {
        assignedIcd = patient.icd10 || 'A90';
        assignedCbg = patient.inCbg || 'J-1-16-II';
      }

      setIcd10(assignedIcd);
      setKodeCbg(assignedCbg);
      setKelompokKasus(assignedKasus);

      setNotification({
        type: 'success',
        message: `Pengkodean berhasil! SIRS Engine [${codingMode}] menetapkan ICD-10: ${assignedIcd} dan IN-CBG: ${assignedCbg}.`,
      });

      if (onUpdatePatient) {
        onUpdatePatient({
          ...patient,
          diagnosis,
          icd10: assignedIcd,
          inCbg: assignedCbg,
          gejala: selectedGejala,
          tindakan: selectedTindakan,
          riwayat,
          modePengkodean: codingMode,
          biayaTindakan,
          biayaRawat,
          total: biayaTindakan + biayaRawat,
        });
      }
    }, 600);
  };

  // Action: Simulasi Diagnosis
  const handleSimulasiDiagnosis = () => {
    setIsProcessing(true);
    setNotification(null);

    setTimeout(() => {
      setIsProcessing(false);
      setNotification({
        type: 'info',
        message: `Simulasi diagnosis terkonfirmasi: ${selectedGejala.length} gejala klinis relevan dengan diagnosis "${diagnosis}". Standar kodifikasi klinis sesuai panduan IN-CBG Regional I.`,
      });
    }, 500);
  };

  return (
    <div className="detail-simulasi-page" id="detail-simulasi-page">
      {/* Background Circle Ornaments (#FDF6F7) */}
      <div className="bg-ornament bg-ornament--top-left" aria-hidden="true" />
      <div className="bg-ornament bg-ornament--top-right" aria-hidden="true" />
      <div className="bg-ornament bg-ornament--middle-left" aria-hidden="true" />
      <div className="bg-ornament bg-ornament--bottom-right" aria-hidden="true" />

      <div className="detail-container">
        {/* Header with Navigation Pills */}
        <DetailHeader
          onBackToSimulasi={onBack}
          onNavigateLanding={onNavigateLanding}
        />

        {/* Sub-Bar Actions: ← Kembali and Tutup */}
        <DetailSubBar onBack={onBack} onClose={onBack} />

        {/* 1. Patient Metadata Card */}
        <PatientInfoCard patient={patient} />

        {/* 2. Vital Signs Card */}
        <VitalSignsCard vitalSigns={patient.vitalSigns} />

        {/* 3. Clinical Coding Workflow Card (Gejala, Diagnosis, Tindakan, Mode, Actions) */}
        <CodingWorkflowCard
          activeTab={activeTab}
          onTabChange={setActiveTab}
          mode={codingMode}
          onModeChange={setCodingMode}
          selectedGejala={selectedGejala}
          onToggleGejala={handleToggleGejala}
          onAddCustomGejala={handleAddCustomGejala}
          selectedModule={selectedModule}
          onModuleChange={setSelectedModule}
          diagnosis={diagnosis}
          onDiagnosisChange={setDiagnosis}
          selectedTindakan={selectedTindakan}
          onToggleTindakan={handleToggleTindakan}
          onAddCustomTindakan={handleAddCustomTindakan}
          onKodekan={handleKodekan}
          onSimulasiDiagnosis={handleSimulasiDiagnosis}
          isProcessing={isProcessing}
          notification={notification}
          onDismissNotification={() => setNotification(null)}
        />

        {/* 4. Riwayat Card */}
        <RiwayatCard
          riwayat={riwayat}
          onAddRiwayat={handleAddRiwayat}
          onRemoveRiwayat={handleRemoveRiwayat}
        />

        {/* 5. Result: Diagnosis & Tindakan Card */}
        <DiagnosisTindakanCard
          diagnosis={diagnosis}
          icd10={icd10}
          tindakanList={selectedTindakan}
        />

        {/* 6. Result: Klaim IN-CBG Card */}
        <KlaimInCbgCard
          kelompokKasus={kelompokKasus}
          kodeCbg={kodeCbg}
          biayaTindakan={biayaTindakan}
          biayaRawat={biayaRawat}
          totalBiaya={totalBiaya}
        />
      </div>
    </div>
  );
};

export default PatientDetailPage;
