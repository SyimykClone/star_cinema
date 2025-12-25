import { createAction } from '@reduxjs/toolkit';

export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';

export const addToFavorites = createAction('ADD_TO_FAVORITES', (movie) => ({
  payload: movie
}));

export const removeFromFavorites = createAction('REMOVE_FROM_FAVORITES', (movieId) => ({
  payload: movieId
}));

// Booking action types
export const BOOKING_REQUEST = 'BOOKING_REQUEST';
export const BOOKING_SUCCESS = 'BOOKING_SUCCESS';
export const BOOKING_FAILURE = 'BOOKING_FAILURE';
export const CANCEL_BOOKING = 'CANCEL_BOOKING';
export const FETCH_BOOKINGS_REQUEST = 'FETCH_BOOKINGS_REQUEST';
export const FETCH_BOOKINGS_SUCCESS = 'FETCH_BOOKINGS_SUCCESS';
export const FETCH_BOOKINGS_FAILURE = 'FETCH_BOOKINGS_FAILURE';

// Simple helper to persist bookings in localStorage for this demo
const BOOKINGS_KEY = 'movieBookings';

function saveBookingsToStorage(bookings) {
  try {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  } catch (e) {
    // ignore
  }
}

function loadBookingsFromStorage() {
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

// Thunk: book a seat (simulated async)
export function bookSeat(movieId, seat, userId, showtime) {
  return (dispatch, getState) => {
    dispatch({ type: BOOKING_REQUEST });

    // simulate API call
    setTimeout(() => {
      try {
        const bookings = loadBookingsFromStorage();

        // Conflict check: same movieId + seat + showtime
        const conflict = bookings.some(b => b.movieId === movieId && b.seat === seat && b.showtime === showtime);
        if (conflict) {
          dispatch({ type: BOOKING_FAILURE, payload: 'Место уже занято для выбранного сеанса' });
          return;
        }

        const newBooking = {
          id: `${movieId}-${seat}-${Date.now()}`,
          movieId,
          seat,
          showtime: showtime || null,
          userId: userId || null,
          createdAt: new Date().toISOString()
        };

        const updated = [...bookings, newBooking];
        saveBookingsToStorage(updated);

        dispatch({ type: BOOKING_SUCCESS, payload: newBooking });
        // also update fetched list
        dispatch({ type: FETCH_BOOKINGS_SUCCESS, payload: updated });
      } catch (err) {
        dispatch({ type: BOOKING_FAILURE, payload: String(err) });
      }
    }, 700);
  };
}

// Thunk: cancel booking
export function cancelBookingAsync(bookingId) {
  return (dispatch) => {
    dispatch({ type: FETCH_BOOKINGS_REQUEST });

    setTimeout(() => {
      try {
        const bookings = loadBookingsFromStorage();
        const updated = bookings.filter(b => b.id !== bookingId);
        saveBookingsToStorage(updated);

        dispatch({ type: CANCEL_BOOKING, payload: bookingId });
        dispatch({ type: FETCH_BOOKINGS_SUCCESS, payload: updated });
      } catch (err) {
        dispatch({ type: FETCH_BOOKINGS_FAILURE, payload: String(err) });
      }
    }, 400);
  };
}

// Thunk: fetch bookings
export function fetchBookings() {
  return (dispatch) => {
    dispatch({ type: FETCH_BOOKINGS_REQUEST });

    setTimeout(() => {
      try {
        const bookings = loadBookingsFromStorage();
        dispatch({ type: FETCH_BOOKINGS_SUCCESS, payload: bookings });
      } catch (err) {
        dispatch({ type: FETCH_BOOKINGS_FAILURE, payload: String(err) });
      }
    }, 300);
  };
}