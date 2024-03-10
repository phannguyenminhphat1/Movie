import {
  BOOKING_SEATS,
  BOOKING_TICKET,
  GET_LIST_TICKET,
  REALTIME_BOOKING_SEATS,
  RESET_BOOKING_SEATS,
} from "../types/BookingTicketType";

const stateDefault = {
  listSeats: {},
  listBookingSeats: [],
  bookingTickets: {
    maLichChieu: 0,
    danhSachVe: [],
  },
  listBookingSeatsByGuest: [],
};

export const BookingTicketReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_LIST_TICKET: {
      state.listSeats = action.listSeats;
      return { ...state };
    }
    case BOOKING_SEATS: {
      let listBookingSeatsUpdate = [...state.listBookingSeats];
      const findIndex = listBookingSeatsUpdate.findIndex(
        (item) => item.maGhe === action.bookingSeats.maGhe
      );
      if (findIndex !== -1) {
        listBookingSeatsUpdate.splice(findIndex, 1);
      } else {
        listBookingSeatsUpdate.push(action.bookingSeats);
      }
      state.listBookingSeats = listBookingSeatsUpdate;
      return { ...state };
    }
    case BOOKING_TICKET: {
      return { ...state };
    }
    case RESET_BOOKING_SEATS: {
      state.listBookingSeats = [];
      return { ...state };
    }
    case REALTIME_BOOKING_SEATS: {
      state.listBookingSeatsByGuest = action.arrGheKhachDat;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
