const initialState = {
  bookings: [],
  loading: false,
  error: null
};

export default function bookingReducer(state = initialState, action) {
  switch (action.type) {
    case 'BOOKING_REQUEST':
    case 'FETCH_BOOKINGS_REQUEST':
      return { ...state, loading: true, error: null };

    case 'BOOKING_SUCCESS':
      return { ...state, loading: false, bookings: [...state.bookings, action.payload] };

    case 'FETCH_BOOKINGS_SUCCESS':
      return { ...state, loading: false, bookings: action.payload };

    case 'BOOKING_FAILURE':
    case 'FETCH_BOOKINGS_FAILURE':
      return { ...state, loading: false, error: action.payload };

    case 'CANCEL_BOOKING':
      return { ...state, bookings: state.bookings.filter(b => b.id !== action.payload) };

    default:
      return state;
  }
}
