import React, { useState, useCallback } from 'react';
import { DetailPageProps } from './types/detail';
import { MOCK_PATIENTS, MOCK_VENDORS, DASHBOARD_STATS } from './data/mockDetail';
import DetailHeader from './components/DetailHeader';
import StatsOverview from './components/StatsOverview';
import PatientSummaryTable from './components/PatientSummaryTable';
import VendorSummaryTable from './components/VendorSummaryTable';
import DetailErrorBoundary from './components/DetailErrorBoundary';
import './Detail.css';

export default function DetailPage({
  onNavigateLanding,
  onNavigateSimulasi,
  onNavigateVendor,
}: DetailPageProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>(
    new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
  );

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    try {
      setTimeout(() => {
        setIsRefreshing(false);
        setLastUpdated(
          new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        );
      }, 700);
    } catch (err) {
      console.error('Error refreshing detail data:', err);
      setIsRefreshing(false);
    }
  }, []);

  return (
    <DetailErrorBoundary>
      <div className="detail-page" id="detail-page">
        {/* Background ornaments */}
        <div className="detail-bg-ornament detail-bg-ornament--tl" aria-hidden="true" />
        <div className="detail-bg-ornament detail-bg-ornament--tr" aria-hidden="true" />
        <div className="detail-bg-ornament detail-bg-ornament--bl" aria-hidden="true" />

        <div className="detail-container">
          {/* Header */}
          <DetailHeader
            onNavigateLanding={onNavigateLanding}
            onNavigateSimulasi={onNavigateSimulasi}
            onNavigateVendor={onNavigateVendor}
            lastUpdated={lastUpdated}
          />

          {/* Stats Overview */}
          <StatsOverview
            stats={DASHBOARD_STATS}
            isRefreshing={isRefreshing}
            onRefresh={handleRefresh}
          />

          {/* Tables Section */}
          <div className="detail-tables">
            {/* Patient Table */}
            <PatientSummaryTable patients={MOCK_PATIENTS} />

            {/* Vendor Table */}
            <VendorSummaryTable vendors={MOCK_VENDORS} />
          </div>

          {/* Footer note */}
          <footer className="detail-footer" role="contentinfo">
            <p className="detail-footer__text">
              SIRS.ID Admin Panel · Data simulasi untuk keperluan demo ·{' '}
              <span className="detail-footer__version">v1.0.0-detail</span>
            </p>
          </footer>
        </div>
      </div>
    </DetailErrorBoundary>
  );
}
