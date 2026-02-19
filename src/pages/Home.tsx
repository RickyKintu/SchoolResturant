import { Link } from 'react-router-dom';
import '../styles/Home.scss';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="fade-in">La Bella Vista</h1>
          <p className="tagline fade-in-delay">En smakupplevelse vid Medelhavets pärla</p>
          <Link to="/booking" className="cta-button pulse">
            Boka bord
          </Link>
        </div>
      </section>

      <section className="about">
        <div className="container">
          <div className="about-content">
            <h2>Välkommen till La Bella Vista</h2>
            <p>
              Upptäck den autentiska smaken av Medelhavet mitt i Stockholm. 
              La Bella Vista kombinerar traditionella recept med moderna tekniker 
              för att skapa en oförglömlig matupplevelse.
            </p>
            <p>
              Vår passion för färska råvaror och hantverksmässig matlagning 
              garanterar att varje rätt är något alldeles extra.
            </p>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card slide-in">
              <div className="feature-icon">🍽️</div>
              <h3>Två Sittningar</h3>
              <p>Vi serverar middag klockan 18:00 och 21:00 för en perfekt kvällsupplevelse</p>
            </div>
            <div className="feature-card slide-in delay-1">
              <div className="feature-icon">👨‍🍳</div>
              <h3>Mästerkockar</h3>
              <p>Vårt köksteam består av erfarna kockar med passion för gastronomin</p>
            </div>
            <div className="feature-card slide-in delay-2">
              <div className="feature-icon">🌿</div>
              <h3>Färska Råvaror</h3>
              <p>Vi använder endast säsongens bästa ingredienser från lokala leverantörer</p>
            </div>
          </div>
        </div>
      </section>

      <section className="concept">
        <div className="container">
          <div className="concept-content">
            <h2>Vårt Koncept</h2>
            <p>
              La Bella Vista erbjuder en modern tolkning av medelhavsmaten. 
              Vår meny växlar med säsongerna och speglar det bästa från 
              Italien, Spanien och Grekland.
            </p>
            <div className="concept-highlights">
              <div className="highlight">
                <strong>15 Bord</strong>
                <span>Intimt och mysigt</span>
              </div>
              <div className="highlight">
                <strong>Max 6 Personer</strong>
                <span>Perfekt för familj och vänner</span>
              </div>
              <div className="highlight">
                <strong>Boka Enkelt</strong>
                <span>Online eller per telefon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Redo att uppleva La Bella Vista?</h2>
          <Link to="/booking" className="cta-button secondary">
            Boka ditt bord nu
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
