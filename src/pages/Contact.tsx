import '../styles/Contact.scss';

const Contact = () => {
  return (
    <div className="contact">
      <div className="contact-hero">
        <h1 className="fade-in">Kontakta Oss</h1>
        <p className="fade-in-delay">Vi ser fram emot att höra från dig!</p>
      </div>

      <div className="contact-content container">
        <div className="contact-grid">
          <div className="contact-info slide-in">
            <h2>Kontaktinformation</h2>
            
            <div className="info-item">
              <div className="info-icon">📍</div>
              <div className="info-details">
                <h3>Adress</h3>
                <p>Storgatan 123</p>
                <p>111 22 Stockholm</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">📞</div>
              <div className="info-details">
                <h3>Telefon</h3>
                <p>08-123 45 67</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">✉️</div>
              <div className="info-details">
                <h3>E-post</h3>
                <p>info@labellavista.se</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">⏰</div>
              <div className="info-details">
                <h3>Öppettider</h3>
                <p>Måndag - Fredag: 17:00 - 23:00</p>
                <p>Lördag - Söndag: 16:00 - 23:00</p>
                <p><small>Två sittningar per kväll: 18:00 & 21:00</small></p>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper slide-in delay-1">
            <h2>Skicka ett meddelande</h2>
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Namn *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Ditt namn"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">E-post *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="din@email.se"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Telefon</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="070-123 45 67"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Meddelande *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="Skriv ditt meddelande här..."
                />
              </div>

              <button type="submit" className="submit-button">
                Skicka meddelande
              </button>
            </form>
          </div>
        </div>

        <div className="map-section">
          <h2>Hitta hit</h2>
          <div className="map-placeholder">
            <p>🗺️ Karta</p>
            <p className="map-text">
              Vi ligger centralt på Storgatan med goda kommunikationer. 
              Närmaste tunnelbana är T-Centralen (5 min promenad).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
