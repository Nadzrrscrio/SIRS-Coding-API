/**
 * AdminLoginPage (Feature Entry Point: src/admin/login)
 * Assembles:
 * - AdminLoginErrorBoundary
 * - Background Circle Ornaments (#FDF6F7)
 * - AdminLoginHeader (SIRS Coding Service + Nav Pills: Simulasi, Dokumentasi, Redoc)
 * - AdminLoginForm (Masuk SIRS card + USERNAME/PASSWORD + Masuk btn + env note)
 * - Responsive Web Design & Exception Handling
 */

import React from 'react';
import AdminLoginErrorBoundary from './components/AdminLoginErrorBoundary';
import AdminLoginHeader from './components/AdminLoginHeader';
import AdminLoginForm from './components/AdminLoginForm';
import { AdminLoginPageProps } from './types/login';
import './AdminLogin.css';

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onLoginSuccess,
  onNavigateSimulasi,
  onNavigateLanding,
  onNavigateRegister,
  onNavigateDocs,
  onNavigateRedoc,
}) => {
  return (
    <AdminLoginErrorBoundary>
      <div className="admin-login-page" id="admin-login-page">
        {/* Background Circle Ornaments (#FDF6F7) */}
        <div className="bg-ornament bg-ornament--top-left" aria-hidden="true" />
        <div className="bg-ornament bg-ornament--top-right" aria-hidden="true" />
        <div className="bg-ornament bg-ornament--middle-left" aria-hidden="true" />
        <div className="bg-ornament bg-ornament--bottom-right" aria-hidden="true" />

        {/* Top Header Matching Mockup */}
        <AdminLoginHeader
          onNavigateSimulasi={onNavigateSimulasi}
          onNavigateDocs={onNavigateDocs}
          onNavigateRedoc={onNavigateRedoc}
          onNavigateLanding={onNavigateLanding}
        />

        {/* Center Authentication Card */}
        <main className="admin-login-main" id="admin-login-main">
          <AdminLoginForm
            onSuccess={onLoginSuccess}
            onNavigateRegister={onNavigateRegister}
          />
        </main>
      </div>
    </AdminLoginErrorBoundary>
  );
};

export default AdminLoginPage;
