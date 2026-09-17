/**
 * Navbar component.
 * Single Responsibility: renders the top navigation bar with logo and nav links.
 */

import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar" id="navbar">
      <div className="navbar__logo" id="navbar-logo">
        <span className="navbar__logo-text">UMM</span>
      </div>
      <div className="navbar__links">
        <a href="#landing" className="navbar__link navbar__link--active" id="nav-landing">
          Landing
        </a>
        <a href="#demo" className="navbar__link" id="nav-demo">
          Demo
        </a>
      </div>
    </nav>
  );
}
