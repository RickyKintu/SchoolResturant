import { Link } from 'react-router-dom';
import '../styles/Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content container">
        <div className="footer-section">
          <h3>La Bella Vista</h3>
          <p>En smakupplevelse vid Medelhavets pärla</p>
        </div>

        <div className="footer-section">
          <h4>Kontakt</h4>
          <p>Storgatan 123</p>
          <p>111 22 Stockholm</p>
          <p>Tel: 08-123 45 67</p>
          <p>E-post: info@labellavista.se</p>
        </div>

        <div className="footer-section">
          <h4>Öppettider</h4>
          <p>Måndag - Fredag: 17:00 - 23:00</p>
          <p>Lördag - Söndag: 16:00 - 23:00</p>
          <p className="sittings">Sittningar: 18:00 & 21:00</p>
        </div>

        <div className="footer-section">
          <h4>Navigation</h4>
          <nav className="footer-nav">
            <Link to="/">Hem</Link>
            <Link to="/booking">Boka Bord</Link>
            <Link to="/contact">Kontakt</Link>
            <Link to="/admin">Admin</Link>
          </nav>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} La Bella Vista. Alla rättigheter förbehållna.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
