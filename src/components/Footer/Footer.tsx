/**
 * Footer component.
 * Single Responsibility: renders the privacy/data protection notice.
 */

import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <p className="footer__text">
        Data Anda dilindungi &amp; hanya digunakan untuk verifikasi akses.
      </p>
    </footer>
  );
}
