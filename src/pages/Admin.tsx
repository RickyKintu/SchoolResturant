import { useState, useEffect } from 'react';
import { getAllBookings, deleteBooking, updateBooking, createBooking } from '../services/api';
import { RESTAURANT_CONFIG } from '../config/restaurant';
import type { Booking, BookingRequest } from '../types';
import '../styles/Admin.scss';

interface EditingBooking extends Partial<Booking> {
  isNew?: boolean;
}

const Admin = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingBooking, setEditingBooking] = useState<EditingBooking | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state
  const [formDate, setFormDate] = useState('');
  const [formTime, setFormTime] = useState('18:00');
  const [formGuests, setFormGuests] = useState(2);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllBookings(RESTAURANT_CONFIG.id);
      // Sort bookings by date and time
      const sorted = data.sort((a, b) => {
        const dateCompare = a.date.localeCompare(b.date);
        if (dateCompare !== 0) return dateCompare;
        return a.time.localeCompare(b.time);
      });
      setBookings(sorted);
    } catch (err) {
      setError('Kunde inte ladda bokningar. Kontrollera att restaurang-ID är korrekt.');
      console.error('Error loading bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookingId: string) => {
    if (!confirm('Är du säker på att du vill ta bort denna bokning?')) {
      return;
    }

    setLoading(true);
    try {
      await deleteBooking(bookingId);
      setBookings(bookings.filter((b) => b.id !== bookingId));
    } catch (err) {
      setError('Kunde inte ta bort bokningen.');
      console.error('Error deleting booking:', err);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (booking: Booking) => {
    setEditingBooking(booking);
    setFormDate(booking.date);
    setFormTime(booking.time);
    setFormGuests(booking.numberOfGuests);
    setFormName(booking.customer.name);
    setFormEmail(booking.customer.email);
    setFormPhone(booking.customer.phone);
    setShowAddForm(false);
  };

  const startAdd = () => {
    setShowAddForm(true);
    setEditingBooking({ isNew: true });
    const today = new Date().toISOString().split('T')[0];
    setFormDate(today);
    setFormTime('18:00');
    setFormGuests(2);
    setFormName('');
    setFormEmail('');
    setFormPhone('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const bookingData = {
      restaurantId: RESTAURANT_CONFIG.id,
      date: formDate,
      time: formTime,
      numberOfGuests: formGuests,
      customer: {
        name: formName,
        email: formEmail,
        phone: formPhone,
      },
    };

    try {
      if (editingBooking?.isNew) {
        // Create new booking
        const newBooking = await createBooking(bookingData as BookingRequest);
        setBookings([...bookings, newBooking].sort((a, b) => {
          const dateCompare = a.date.localeCompare(b.date);
          if (dateCompare !== 0) return dateCompare;
          return a.time.localeCompare(b.time);
        }));
      } else if (editingBooking?.id) {
        // Update existing booking
        const updated = await updateBooking(editingBooking.id, bookingData);
        setBookings(
          bookings.map((b) => (b.id === editingBooking.id ? updated : b))
        );
      }
      cancelEdit();
    } catch (err) {
      setError('Kunde inte spara bokningen.');
      console.error('Error saving booking:', err);
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditingBooking(null);
    setShowAddForm(false);
    setFormDate('');
    setFormTime('18:00');
    setFormGuests(2);
    setFormName('');
    setFormEmail('');
    setFormPhone('');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="admin">
      <div className="admin-header">
        <h1>Administratörspanel</h1>
        <p>Hantera bokningar för {RESTAURANT_CONFIG.name}</p>
      </div>

      <div className="admin-content container">
        {error && <div className="error-message">{error}</div>}

        <div className="admin-actions">
          <button
            className="add-button"
            onClick={startAdd}
            disabled={loading || showAddForm || editingBooking !== null}
          >
            + Lägg till ny bokning
          </button>
          <button
            className="refresh-button"
            onClick={loadBookings}
            disabled={loading}
          >
            🔄 Uppdatera
          </button>
        </div>

        {(editingBooking || showAddForm) && (
          <div className="edit-form-wrapper slide-in">
            <h2>{editingBooking?.isNew ? 'Lägg till ny bokning' : 'Redigera bokning'}</h2>
            <form onSubmit={handleSave} className="booking-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="edit-date">Datum *</label>
                  <input
                    type="date"
                    id="edit-date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    min={today}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-time">Tid *</label>
                  <select
                    id="edit-time"
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    required
                  >
                    {RESTAURANT_CONFIG.sittings.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="edit-guests">Antal personer *</label>
                  <select
                    id="edit-guests"
                    value={formGuests}
                    onChange={(e) => setFormGuests(Number(e.target.value))}
                    required
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="edit-name">Namn *</label>
                <input
                  type="text"
                  id="edit-name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-email">E-post *</label>
                <input
                  type="email"
                  id="edit-email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-phone">Telefon *</label>
                <input
                  type="tel"
                  id="edit-phone"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  required
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={cancelEdit}
                  disabled={loading}
                >
                  Avbryt
                </button>
                <button type="submit" className="save-button" disabled={loading}>
                  {loading ? 'Sparar...' : 'Spara'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bookings-table-wrapper">
          <h2>Alla bokningar ({bookings.length})</h2>
          {loading && bookings.length === 0 ? (
            <div className="loading">Laddar bokningar...</div>
          ) : bookings.length === 0 ? (
            <div className="no-bookings">Inga bokningar hittades.</div>
          ) : (
            <div className="bookings-table">
              <table>
                <thead>
                  <tr>
                    <th>Datum</th>
                    <th>Tid</th>
                    <th>Gäster</th>
                    <th>Namn</th>
                    <th>E-post</th>
                    <th>Telefon</th>
                    <th>Åtgärder</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="fade-in">
                      <td>{formatDate(booking.date)}</td>
                      <td>{booking.time}</td>
                      <td>{booking.numberOfGuests}</td>
                      <td>{booking.customer.name}</td>
                      <td>{booking.customer.email}</td>
                      <td>{booking.customer.phone}</td>
                      <td className="actions">
                        <button
                          className="edit-button"
                          onClick={() => startEdit(booking)}
                          disabled={loading || editingBooking !== null}
                          title="Redigera"
                        >
                          ✏️
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(booking.id)}
                          disabled={loading}
                          title="Ta bort"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
