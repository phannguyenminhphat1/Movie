// import { connection } from "../..";
import baseAPI from "../../apis/baseAPI";
import {
  BOOKING_SEATS,
  BOOKING_TICKET,
  GET_LIST_TICKET,
  RESET_BOOKING_SEATS,
} from "../types/BookingTicketType";

export const GetListSeatsAction = (maLichChieu) => {
  return async (dispatch) => {
    try {
      const result = await baseAPI.get(
        `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
      );
      dispatch({
        type: GET_LIST_TICKET,
        listSeats: result.data.content,
      });
      console.log(result.data.content);
    } catch (error) {
      console.log(error);
    }
  };
};
export const BookingTicketAction = (bookingTickets) => {
  return async (dispatch) => {
    try {
      const result = await baseAPI.post("/QuanLyDatVe/DatVe", bookingTickets);
      dispatch({
        type: BOOKING_TICKET,
        dataTicket: result.data.content,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const BookingSeatsAction = (bookingSeats) => {
  return (dispatch) => {
    try {
      dispatch({
        type: BOOKING_SEATS,
        bookingSeats,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const ResetBookingSeatsAction = () => {
  return (dispatch) => {
    try {
      dispatch({ type: RESET_BOOKING_SEATS });
    } catch (error) {
      console.log(error);
    }
  };
};
