import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Patient, RekapRumahSakit } from './types/simulasi';
import { INITIAL_PATIENTS } from './data/mockPatients';
import SimulasiHeader from './components/SimulasiHeader';
import RekapCards from './components/RekapCards';
import PatientTable from './components/PatientTable';
import AddPatientModal from './components/AddPatientModal';
import SimulasiErrorBoundary from './components/SimulasiErrorBoundary';
import PatientDetailPage from './detail';
import './Simulasi.css';

export interface SimulasiPageProps {
  onNavigateRegister?: () => void;
  onNavigateLanding?: () => void;
}

export default function SimulasiPage({
  onNavigateLanding,
}: SimulasiPageProps) {
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash.includes('detail')) {
      return INITIAL_PATIENTS[0];
    }
    return null;
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('Simulasi');
  const [lastUpdated, setLastUpdated] = useState<string>(
    new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
  );

  // Sync with browser hash changes for seamless navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('detail')) {
        const idMatch = window.location.hash.match(/id=([^&]+)/);
        if (idMatch && idMatch[1]) {
          const found = patients.find((p) => p.id === idMatch[1]);
          if (found) {
            setSelectedPatient(found);
            return;
          }
        }
        if (!selectedPatient) {
          setSelectedPatient(patients[0]);
        }
      } else if (!hash.includes('detail') && selectedPatient) {
        setSelectedPatient(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [patients, selectedPatient]);

  const rekap: RekapRumahSakit = useMemo(() => {
    try {
      const totalPasien = patients.length;
      const rawatInapPatients = patients.filter((p) => p.jalur === 'Rawat inap');
      const rawatJalan = patients.filter((p) => p.jalur === 'Rawat jalan').length;
      const rawatInapCount = rawatInapPatients.length;

      const totalBiaya = patients.reduce((acc, p) => acc + (Number(p.total) || 0), 0);
      
      const totalLamaRawat = patients.reduce(
        (acc, p) => acc + (Number(p.lamaRawatDays) || 1),
        0
      );
      const rataLamaRawat = totalPasien > 0 ? totalLamaRawat / totalPasien : 0;

      const totalBiayaRawatInap = rawatInapPatients.reduce(
        (acc, p) => acc + (Number(p.total) || 0),
        0
      );
      const rataBiayaRawatInap =
        rawatInapCount > 0 ? Math.round(totalBiayaRawatInap / rawatInapCount) : 0;

      return {
        totalPasien,
        rawatInap: rawatInapCount,
        rawatJalan,
        totalBiaya,
        rataLamaRawat,
        rataBiayaRawatInap,
      };
    } catch (err) {
      console.error('Error calculating Rekap metrics:', err);
      return {
        totalPasien: patients.length,
        rawatInap: 0,
        rawatJalan: 0,
        totalBiaya: 0,
        rataLamaRawat: 0,
        rataBiayaRawatInap: 0,
      };
    }
  }, [patients]);

  const handleRefreshData = useCallback(() => {
    setIsRefreshing(true);
    try {
      setTimeout(() => {
        setIsRefreshing(false);
        setLastUpdated(
          new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        );
      }, 600);
    } catch (err) {
      console.error('Error refreshing simulasi data:', err);
      setIsRefreshing(false);
    }
  }, []);

  const handleAddPatient = useCallback((newPatient: Patient) => {
    setPatients((prev) => [newPatient, ...prev]);
  }, []);

  const handleViewDetail = useCallback((patient: Patient) => {
    setSelectedPatient(patient);
    window.location.hash = `#simulasi-detail?id=${patient.id}`;
  }, []);

  const handleBackFromDetail = useCallback(() => {
    setSelectedPatient(null);
    window.location.hash = '#simulasi';
  }, []);

  const handleUpdatePatient = useCallback((updated: Patient) => {
    setPatients((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setSelectedPatient(updated);
  }, []);

  const nextMrNumber = useMemo(() => {
    const num = patients.length + 1;
    return `RM-${String(num).padStart(4, '0')}`;
  }, [patients.length]);

  // If a patient is selected, render the dedicated Detail Page
  if (selectedPatient) {
    return (
      <SimulasiErrorBoundary>
        <PatientDetailPage
          patient={selectedPatient}
          onBack={handleBackFromDetail}
          onUpdatePatient={handleUpdatePatient}
          onNavigateLanding={onNavigateLanding}
        />
      </SimulasiErrorBoundary>
    );
  }

  return (
    <SimulasiErrorBoundary>
      <div className="simulasi-page" id="simulasi-page">
        {/* Background Circle Ornaments (#FDF6F7) */}
        <div className="bg-ornament bg-ornament--top-left" aria-hidden="true" />
        <div className="bg-ornament bg-ornament--top-right" aria-hidden="true" />
        <div className="bg-ornament bg-ornament--middle-left" aria-hidden="true" />
        <div className="bg-ornament bg-ornament--bottom-right" aria-hidden="true" />

        <div className="simulasi-container">
          {/* Header */}
          <SimulasiHeader
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onNavigateLanding={onNavigateLanding}
          />

          {/* Rekap Rumah Sakit Metrics */}
          <RekapCards
            rekap={rekap}
            onRefresh={handleRefreshData}
            isRefreshing={isRefreshing}
            lastUpdated={lastUpdated}
          />

          {/* Patient List Table & Actions */}
          <PatientTable
            patients={patients}
            onAddPatient={() => setIsAddModalOpen(true)}
            onViewDetail={handleViewDetail}
          />

          {/* Add Patient Modal */}
          {isAddModalOpen && (
            <AddPatientModal
              onClose={() => setIsAddModalOpen(false)}
              onAdd={handleAddPatient}
              nextMrNumber={nextMrNumber}
            />
          )}
        </div>
      </div>
    </SimulasiErrorBoundary>
  );
}
