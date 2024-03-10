import React, { Fragment, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Countdown from "react-countdown";
import { BookingSeatsAction } from "../../../redux/actions/BookingTicketAction";
import Swal from "sweetalert2";

const renderer = ({ minutes, seconds, completed }) => {
  if (completed) {
    if (minutes === 0 && seconds === 0) {
      Swal.fire({
        title: "Hết thời gian giữ ghế !",
        icon: "warning",
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
        window.location.reload();
      });
    }
  } else {
    const formattedMinutes = String(minutes ?? "").padStart(2, "0");
    const formattedSeconds = String(seconds ?? "").padStart(2, "0");
    return (
      <span>
        {formattedMinutes}:{formattedSeconds}
      </span>
    );
  }
};

export default function TicketBooking({ thongTinPhim, listSeats, userLogin }) {
  const { listBookingSeats, listBookingSeatsByGuest } = useSelector(
    (state) => state.BookingTicketReducer
  );
  const dateNow = useMemo(() => Date.now() + 300000, []);

  const dispatch = useDispatch();

  const handleBookingSeats = (bookingSeats) => {
    dispatch(BookingSeatsAction(bookingSeats));
  };

  const renderSeats = () => {
    return listSeats?.map((item, index) => {
      let classVipSeats = item.loaiGhe === "Vip" ? "vipSeats" : "";
      let classBookedSeats = item.daDat === true ? "bookedSeats" : "";
      let classBookingSeats = "";
      let classBookedSeatsByMe = "";
      let classBookingSeatsByGuest = "";

      let indexBookingSeatsByGuest = listBookingSeatsByGuest.findIndex(
        (seat) => seat.maGhe === item.maGhe
      );
      if (indexBookingSeatsByGuest !== -1) {
        classBookingSeatsByGuest = "bookingByGuestSeats";
      }

      let indexBookingSeats = listBookingSeats.findIndex(
        (seat) => seat.maGhe === item.maGhe
      );
      if (indexBookingSeats !== -1) {
        classBookingSeats = "bookingSeats";
      }
      if (userLogin?.taiKhoan === item.taiKhoanNguoiDat) {
        classBookedSeatsByMe = "bookedSeatsByMe";
      }

      return (
        <Fragment key={index}>
          <button
            style={{ outline: "none" }}
            onClick={() => handleBookingSeats(item)}
            disabled={item.daDat || classBookingSeatsByGuest.length > 0}
            className={`seats ${classVipSeats} ${classBookedSeats} ${classBookingSeats} ${classBookedSeatsByMe} ${classBookingSeatsByGuest} `}
          >
            {item.daDat ? (
              classBookedSeatsByMe !== "" ? (
                <i className="fa-solid fa-user"></i>
              ) : (
                <i className="fa-solid fa-x"></i>
              )
            ) : classBookingSeatsByGuest !== "" ? (
              <i className="fa-solid fa-smile"></i>
            ) : (
              item.stt
            )}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };
  return (
    <div className="ticket__booking-content">
      <div className="booking__content-header">
        <div className="content__header-complex">
          <div className="content__header-complex--info">
            <p
              style={{
                color: "rgb(139, 197, 65)",
                fontSize: "14px",
                fontWeight: 500,
                textAlign: "left",
              }}
            >
              Tên rạp:{" " + thongTinPhim?.tenCumRap}
            </p>
            <p
              style={{
                color: "#9b9b9b",
                fontSize: "13px",
                textAlign: "left",
              }}
            >
              Địa chỉ:{" " + thongTinPhim?.diaChi}
            </p>
          </div>
        </div>
        <div className="content__header-time">
          <p>Thời gian giữ ghế</p>
          <span>
            <Countdown date={dateNow} renderer={renderer} />
          </span>
        </div>
      </div>
      <div className="booking__content-seats">
        <div className="seats__content">
          <img src="../assets/img/screen.png" alt="asd" />
        </div>
        <div>{renderSeats()}</div>
      </div>
      <div className="booking__content-note">
        <div className="note__seats">
          <div className="">
            <button
              className="seats"
              style={{ width: "30px", height: "30px", cursor: "no-drop" }}
            ></button>
            <p>Ghế thường</p>
          </div>
          <div className="">
            <button
              className="seats vipSeats"
              style={{ width: "30px", height: "30px", cursor: "no-drop" }}
            ></button>
            <p>Ghế Vip</p>
          </div>
          <div className="">
            <button
              className="seats bookedSeats"
              style={{ width: "30px", height: "30px", cursor: "no-drop" }}
            >
              <i className="fa-solid fa-x"></i>
            </button>
            <p>Ghế đã được đặt</p>
          </div>
          <div className="">
            <button
              className="seats bookingSeats"
              style={{ width: "30px", height: "30px", cursor: "no-drop" }}
            ></button>
            <p>Ghế đang chọn</p>
          </div>
          <div className="">
            <button
              className="seats bookedSeatsByMe"
              style={{ width: "30px", height: "30px", cursor: "no-drop" }}
            >
              <i className="fa-solid fa-user"></i>
            </button>
            <p>Ghế mình đã đặt</p>
          </div>
          <div className="">
            <button
              className="seats bookingByGuestSeats"
              style={{ width: "30px", height: "30px", cursor: "no-drop" }}
            >
              <i className="fa-solid fa-smile"></i>
            </button>

            <p>Ghế người khác đang chọn</p>
          </div>
        </div>
      </div>
    </div>
  );
}
