/**
 * HomeRegister page.
 * Assembles Navbar, hero header, RegisterForm, Footer, and WhatsAppFab.
 * Single Responsibility: page layout and composition only.
 */

import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import RegisterForm from './components/RegisterForm/RegisterForm';
import WhatsAppFab from '../../components/WhatsAppFab/WhatsAppFab';

export default function HomeRegister() {
  return (
    <div className="home-register" id="home-register">


      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Header */}
      <header className="home-register__header" id="register-header">
        <h1 className="home-register__title">
          Daftar Akses <span className="home-register__title--accent">API</span>
        </h1>
        <p className="home-register__subtitle">
          Untuk rumah sakit, klinik, atau developer. Verifikasi manual — respon dalam 1–2 hari kerja.
        </p>
      </header>

      {/* Registration Form */}
      <main className="home-register__form-container">
        <RegisterForm />
      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Floating Button */}
      <WhatsAppFab />
    </div>
  );
}
