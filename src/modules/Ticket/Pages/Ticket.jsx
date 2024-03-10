import React, { useEffect } from "react";
import TicketInfo from "../Components/TicketInfo";
import TicketBooking from "../Components/TicketBooking";

import { useDispatch, useSelector } from "react-redux";
import { GetListSeatsAction } from "../../../redux/actions/BookingTicketAction";
import { Link, useParams } from "react-router-dom";
export default function Ticket() {
  const { userLogin } = useSelector((state) => state.UserReducer);
  const { listSeats } = useSelector((state) => state.BookingTicketReducer);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(GetListSeatsAction(params.ticketId));
  }, []);

  return (
    <div className="ticket">
      <div className="ticket__content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-9 text-center ticket__booking">
              <div className="ticket__booking-header">
                <div className="title">
                  <h1>ĐẶT VÉ</h1>
                </div>
                <Link to="/account" className="booking__info-user">
                  <img
                    src={`https://i.pravatar.cc/150?u=${userLogin.taiKhoan}`}
                    alt="avtarr"
                  />
                  <p>{userLogin.hoTen}</p>
                </Link>
              </div>
              <TicketBooking
                userLogin={userLogin}
                thongTinPhim={listSeats.thongTinPhim}
                listSeats={listSeats.danhSachGhe}
              />
            </div>
            <div className="col-md-3 ticket__info">
              <TicketInfo
                params={params}
                userLogin={userLogin}
                thongTinPhim={listSeats.thongTinPhim}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
