/**
 * HomeRegister page.
 * Assembles Navbar, hero header, RegisterForm, Footer, and WhatsAppFab
 * with background circle ornaments and responsive layout.
 */

import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import RegisterForm from './components/RegisterForm/RegisterForm';
import WhatsAppFab from '../../components/WhatsAppFab/WhatsAppFab';

export interface HomeRegisterProps {
  onNavigate?: (view: 'landing' | 'register') => void;
}

export default function HomeRegister({ onNavigate }: HomeRegisterProps) {
  return (
    <div className="home-register" id="home-register">
      {/* Background Circle Ornaments (#FDF6F7) */}
      <div className="bg-ornament bg-ornament--top-left" aria-hidden="true" />
      <div className="bg-ornament bg-ornament--top-right" aria-hidden="true" />
      <div className="bg-ornament bg-ornament--middle-left" aria-hidden="true" />
      <div className="bg-ornament bg-ornament--middle-right" aria-hidden="true" />
      <div className="bg-ornament bg-ornament--bottom-left" aria-hidden="true" />
      <div className="bg-ornament bg-ornament--bottom-right" aria-hidden="true" />

      {/* Navigation Bar */}
      <Navbar currentView="register" onNavigate={onNavigate} />

      {/* Hero Header */}
      <header className="home-register__header" id="register-header">
        <h1 className="home-register__title">
          Daftar Akses <span className="home-register__title--accent">API</span>
        </h1>
        <p className="home-register__subtitle">
          Untuk rumah sakit, klinik, atau developer. Verifikasi manual — respon dalam 1–2 hari kerja.
        </p>
      </header>

      {/* Registration Form Container */}
      <main className="home-register__form-container">
        <div className="home-register__card">
          <RegisterForm />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Floating Button */}
      <WhatsAppFab />
    </div>
  );
}
