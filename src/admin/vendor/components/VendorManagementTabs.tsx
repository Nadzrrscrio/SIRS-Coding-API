/**
 * VendorManagementTabs component
 * Renders:
 * - Card header: "Manajemen", "admin · admin"
 * - Sub-feature tabs: [Pengguna], [API Key], [Registrasi] (Active)
 */

import React, { useState } from 'react';

export interface VendorManagementTabsProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  pendingCount?: number;
}

export const VendorManagementTabs: React.FC<VendorManagementTabsProps> = ({
  activeTab = 'Registrasi',
  onTabChange,
  pendingCount = 0,
}) => {
  const [tabNotice, setTabNotice] = useState<string | null>(null);

  const tabs = [
    { id: 'Pengguna', label: 'Pengguna', isTeammateJob: true },
    { id: 'API Key', label: 'API Key', isTeammateJob: true },
    { id: 'Registrasi', label: 'Registrasi', isTeammateJob: false },
  ];

  const handleTabClick = (tab: typeof tabs[0]) => {
    if (tab.isTeammateJob) {
      setTabNotice(`Halaman "${tab.label}" merupakan jobdesk terpisah yang sedang dikembangkan.`);
      setTimeout(() => setTabNotice(null), 3500);
      return;
    }
    if (onTabChange) {
      onTabChange(tab.id);
    }
  };

  return (
    <div className="vendor-mgmt-header" id="vendor-mgmt-header">
      <div className="vendor-mgmt-header__title-row">
        <div className="vendor-mgmt-header__title-group">
          <h2 className="vendor-mgmt-header__title">Manajemen</h2>
          <div className="vendor-mgmt-header__user-badge">
            <span className="vendor-mgmt-header__user-dot" aria-hidden="true" />
            <span className="vendor-mgmt-header__subtitle">admin &middot; admin</span>
          </div>
        </div>

        {pendingCount > 0 && (
          <div className="vendor-mgmt-header__alert-pill">
            <span className="vendor-mgmt-header__alert-count">{pendingCount}</span>
            <span>Menunggu Persetujuan</span>
          </div>
        )}
      </div>

      {/* Tabs Row: [Pengguna] [API Key] [Registrasi] */}
      <div className="vendor-tabs" role="tablist" aria-label="Sub-fitur Manajemen">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`vendor-tab-btn ${isActive ? 'vendor-tab-btn--active' : ''}`}
              onClick={() => handleTabClick(tab)}
            >
              <span>{tab.label}</span>
              {tab.id === 'Registrasi' && pendingCount > 0 && (
                <span className="vendor-tab-badge">{pendingCount}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Toast Notice for Teammate Jobs */}
      {tabNotice && (
        <div className="vendor-tab-notice" role="status">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E20D20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span>{tabNotice}</span>
        </div>
      )}
    </div>
  );
};

export default VendorManagementTabs;
