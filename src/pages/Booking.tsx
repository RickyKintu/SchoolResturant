import { useState } from 'react';
import { checkAvailability, createBooking } from '../services/api';
import { RESTAURANT_CONFIG } from '../config/restaurant';
import type { BookingRequest } from '../types';
import '../styles/Booking.scss';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

const Booking = () => {
  const [step, setStep] = useState<'search' | 'form' | 'success'>('search');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  
  // Search form state
  const [date, setDate] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(2);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState('');
  
  // Booking form state
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const times = await checkAvailability({
        restaurantId: RESTAURANT_CONFIG.id,
        date,
        numberOfGuests,
      });

      if (times.length === 0) {
        setError('Tyvärr finns inga lediga bord för det valda datumet. Försök med ett annat datum.');
        setAvailableTimes([]);
      } else {
        setAvailableTimes(times);
        setError('');
      }
    } catch (err) {
      setError('Ett fel uppstod vid sökningen. Försök igen senare.');
      console.error('Error checking availability:', err);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!customerName.trim()) {
      errors.name = 'Namn är obligatoriskt';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerEmail.trim()) {
      errors.email = 'E-post är obligatoriskt';
    } else if (!emailRegex.test(customerEmail)) {
      errors.email = 'Ange en giltig e-postadress';
    }

    const phoneRegex = /^[\d\s\-+()]+$/;
    if (!customerPhone.trim()) {
      errors.phone = 'Telefonnummer är obligatoriskt';
    } else if (!phoneRegex.test(customerPhone) || customerPhone.replace(/\D/g, '').length < 7) {
      errors.phone = 'Ange ett giltigt telefonnummer';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
    setStep('form');
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (!gdprConsent) {
      setError('Du måste godkänna behandling av personuppgifter för att fortsätta.');
      return;
    }

    setError('');
    setLoading(true);

    const bookingData: BookingRequest = {
      restaurantId: RESTAURANT_CONFIG.id,
      date,
      time: selectedTime,
      numberOfGuests,
      customer: {
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
      },
    };

    try {
      await createBooking(bookingData);
      setStep('success');
    } catch (err) {
      setError('Ett fel uppstod vid bokningen. Försök igen senare.');
      console.error('Error creating booking:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setStep('search');
    setSelectedTime('');
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setGdprConsent(false);
    setFormErrors({});
    setError('');
  };

  const handleNewBooking = () => {
    setStep('search');
    setDate('');
    setNumberOfGuests(2);
    setAvailableTimes([]);
    setSelectedTime('');
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setGdprConsent(false);
    setFormErrors({});
    setError('');
  };

  return (
    <div className="booking">
      <div className="booking-hero">
        <h1 className="fade-in">Boka Bord</h1>
        <p className="fade-in-delay">Reservera ditt bord på La Bella Vista</p>
      </div>

      <div className="booking-content container">
        {step === 'search' && (
          <div className="booking-search slide-in">
            <h2>Sök lediga tider</h2>
            <form onSubmit={handleSearch} className="search-form">
              <div className="form-group">
                <label htmlFor="date">Välj datum *</label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={today}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="guests">Antal personer *</label>
                <select
                  id="guests"
                  value={numberOfGuests}
                  onChange={(e) => setNumberOfGuests(Number(e.target.value))}
                  required
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'person' : 'personer'}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Söker...' : 'Sök lediga tider'}
              </button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {availableTimes.length > 0 && (
              <div className="available-times fade-in">
                <h3>Lediga tider för {date}</h3>
                <p className="info-text">Välj en tid för din bokning:</p>
                <div className="time-slots">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      className="time-slot-button"
                      onClick={() => handleTimeSelection(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {step === 'form' && (
          <div className="booking-form-wrapper slide-in">
            <h2>Slutför din bokning</h2>
            <div className="booking-summary">
              <p><strong>Datum:</strong> {date}</p>
              <p><strong>Tid:</strong> {selectedTime}</p>
              <p><strong>Antal personer:</strong> {numberOfGuests}</p>
            </div>

            <form onSubmit={handleBooking} className="booking-form">
              <div className="form-group">
                <label htmlFor="name">Namn *</label>
                <input
                  type="text"
                  id="name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className={formErrors.name ? 'error' : ''}
                  placeholder="Ditt fullständiga namn"
                />
                {formErrors.name && <span className="error-text">{formErrors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">E-post *</label>
                <input
                  type="email"
                  id="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className={formErrors.email ? 'error' : ''}
                  placeholder="din@email.se"
                />
                {formErrors.email && <span className="error-text">{formErrors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Telefonnummer *</label>
                <input
                  type="tel"
                  id="phone"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className={formErrors.phone ? 'error' : ''}
                  placeholder="070-123 45 67"
                />
                {formErrors.phone && <span className="error-text">{formErrors.phone}</span>}
              </div>

              <div className="gdpr-consent">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={gdprConsent}
                    onChange={(e) => setGdprConsent(e.target.checked)}
                  />
                  <span>
                    Jag godkänner att mina personuppgifter behandlas enligt{' '}
                    <strong>GDPR</strong>. Era personuppgifter används endast för att 
                    hantera er bokning och kontakta er vid behov. Vi delar aldrig era 
                    uppgifter med tredje part.
                  </span>
                </label>
              </div>

              {error && <div className="error-message">{error}</div>}

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Avbryt
                </button>
                <button
                  type="submit"
                  className="submit-button"
                  disabled={loading}
                >
                  {loading ? 'Bokar...' : 'Bekräfta bokning'}
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 'success' && (
          <div className="booking-success fade-in">
            <div className="success-icon">✓</div>
            <h2>Bokning bekräftad!</h2>
            <p>Tack för din bokning. En bekräftelse har skickats till {customerEmail}.</p>
            <div className="booking-details">
              <h3>Bokningsinformation</h3>
              <p><strong>Restaurang:</strong> {RESTAURANT_CONFIG.name}</p>
              <p><strong>Datum:</strong> {date}</p>
              <p><strong>Tid:</strong> {selectedTime}</p>
              <p><strong>Antal personer:</strong> {numberOfGuests}</p>
              <p><strong>Namn:</strong> {customerName}</p>
            </div>
            <button className="submit-button" onClick={handleNewBooking}>
              Gör en ny bokning
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
