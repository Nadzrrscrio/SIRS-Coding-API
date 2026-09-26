/**
 * Navbar component.
 * Single Responsibility: renders the top navigation bar with logo and nav links.
 */

import './Navbar.css';

export interface NavbarProps {
  currentView?: 'landing' | 'register';
  onNavigate?: (view: 'landing' | 'register') => void;
}

export default function Navbar({ currentView = 'register', onNavigate }: NavbarProps) {
  const handleLandingClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('landing');
    }
  };

  const handleDemoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('register');
    }
  };

  return (
    <nav className="navbar" id="navbar">
      <div className="navbar__logo" id="navbar-logo">
        <span className="navbar__logo-text">UMM</span>
      </div>
      <div className="navbar__links">
        <a
          href="#landing"
          className="navbar__link"
          id="nav-landing"
          onClick={handleLandingClick}
        >
          Landing
        </a>
        <a
          href="#demo"
          className="navbar__link"
          id="nav-demo"
          onClick={handleDemoClick}
        >
          Demo
        </a>
      </div>
    </nav>
  );
}
