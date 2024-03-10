import _ from "lodash";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BookingTicketAction,
  ResetBookingSeatsAction,
} from "../../../redux/actions/BookingTicketAction";
import { useNavigate, useParams } from "react-router-dom";
import { GetListSeatsAction } from "../../../redux/actions/BookingTicketAction";
import { Modal } from "antd";
import {
  HideLoadingAction,
  ShowLoadingAction,
} from "../../../redux/actions/LoadingAction";

export default function TicketInfo({ userLogin }) {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    dispatch(ResetBookingSeatsAction());
    setIsModalOpen(false);
  };

  const { listBookingSeats, bookingTickets } = useSelector(
    (state) => state.BookingTicketReducer
  );
  const { listSeats } = useSelector((state) => state.BookingTicketReducer);

  const hasBookingSeats = listBookingSeats.length > 0;

  const handleBookingTickets = async () => {
    try {
      dispatch(ShowLoadingAction);
      bookingTickets.maLichChieu = params.ticketId;
      bookingTickets.danhSachVe = listBookingSeats;
      dispatch(BookingTicketAction(bookingTickets));
      showModal();
      await dispatch(GetListSeatsAction(params.ticketId));
      dispatch(HideLoadingAction);
    } catch (error) {
      dispatch(HideLoadingAction);
    }
  };

  const handleBackToHome = () => {
    dispatch(ResetBookingSeatsAction());
    navigate("/", { replace: true });
  };
  const handleContinueBooking = () => {
    dispatch(ResetBookingSeatsAction());
    setIsModalOpen(false);
  };
  return (
    <Fragment>
      <div className="info__content">
        <h3
          style={{
            color: "#44c020",
            fontSize: "41px",
            textAlign: "center",
            fontWeight: 500,
            lineHeight: "60px",
          }}
        >
          {listBookingSeats
            .reduce((total, item, index) => {
              return (total += item.giaVe);
            }, 0)
            .toLocaleString()}
          đ
          <hr />
        </h3>
        <div className="info__content-movie p12">
          <h4>{listSeats.thongTinPhim?.tenPhim}</h4>
          <p>{listSeats.thongTinPhim?.tenCumRap}</p>
          <p>
            {listSeats.thongTinPhim?.ngayChieu} -{" "}
            {listSeats.thongTinPhim?.gioChieu} -{" "}
            {listSeats.thongTinPhim?.tenRap}
          </p>
        </div>
        <hr />
        <div className="info__content-seats p12">
          <h4>
            Ghế:
            {_.sortBy(listBookingSeats, ["stt"]).map((item, index) => {
              return (
                <span
                  style={{ marginLeft: "5px", color: "#9b9b9b" }}
                  key={index}
                >
                  {item.stt}
                  {", "}
                </span>
              );
            })}
          </h4>
          <p>
            {listBookingSeats
              .reduce((total, item, index) => {
                return (total += item.giaVe);
              }, 0)
              .toLocaleString()}
            đ
          </p>
        </div>
        <hr />
        <div className="info__content-userInfo p12">
          <h4>Email</h4>
          <p>{userLogin.email}</p>
        </div>
        <hr />
        <div className="info__content-userInfo p12">
          <h4>Số điện thoại</h4>
          <p>{userLogin.soDT}</p>
        </div>
        <hr />
        <div className="info__content-warning">
          <img src="../assets/img/exclamation.png" alt="exclam" />
          <span>Vé đã mua không thể đổi trả hoặc hủy bỏ !</span>
        </div>
        <div className="info__content-btn p12">
          <button
            onClick={() => handleBookingTickets()}
            className="btn btn-secondary"
            disabled={!hasBookingSeats}
          >
            Đặt vé
          </button>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        closeIcon={false}
      >
        <div
          style={{
            padding: "20px",
            width: "100%",
            textAlign: "left",
            lineHeight: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "5%",
            }}
          >
            <div
              style={{
                backgroundImage: `url("${listSeats.thongTinPhim?.hinhAnh}")`,
                flex: "1 1 30%",
                borderRadius: "4px",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                width: "100%",
              }}
            ></div>
            <div
              style={{
                flex: "70%",
                fontSize: "17px",
                color: "#333",
              }}
            >
              <p style={{ fontSize: "19px", fontWeight: "bold" }}>
                {listSeats.thongTinPhim?.tenPhim}
              </p>
              <p style={{ color: "rgb(139, 197, 65)", fontWeight: 500 }}>
                {listSeats.thongTinPhim?.tenCumRap}
              </p>
              <p style={{ color: "#9B9B9B" }}>
                {listSeats.thongTinPhim?.diaChi}
              </p>
              <table style={{ width: "100%", marginTop: "10px" }}>
                <tbody>
                  <tr>
                    <td>Suất chiếu: </td>
                    <td>
                      {listSeats.thongTinPhim?.ngayChieu} -{" "}
                      {listSeats.thongTinPhim?.gioChieu}
                    </td>
                  </tr>
                  <tr>
                    <td>Phòng:</td>
                    <td>{listSeats.thongTinPhim?.tenRap}</td>
                  </tr>
                  <tr>
                    <td>Ghế:</td>
                    <td>
                      {listBookingSeats.map((item, index) => {
                        return item.stt + ", ";
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <h3
          style={{
            fontWeight: 500,
            padding: "20px",
            fontSize: "30px",
          }}
        >
          Thông tin đặt vé
        </h3>
        <table
          className="table"
          style={{
            width: "100%",
            marginTop: "10px",
            color: "black",
            fontSize: "17px",
          }}
        >
          <tbody>
            <tr>
              <td>Họ tên:</td>
              <td>{userLogin?.hoTen}</td>
            </tr>
            <tr>
              <td>Điện thoại:</td>
              <td>{userLogin?.soDT}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{userLogin?.email}</td>
            </tr>
            <tr>
              <td>Trạng thái:</td>
              <td>Đặt vé thành công</td>
            </tr>
            <tr>
              <td>Tổng tiền:</td>
              <td>
                {listBookingSeats
                  .reduce((total, item, index) => {
                    return (total += item.giaVe);
                  }, 0)
                  .toLocaleString()}
                đ
              </td>
            </tr>
          </tbody>
        </table>
        <p
          style={{
            fontStyle: "italic",
            color: "#fb4226",
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          Kiểm tra lại vé đã mua trong thông tin tài khoản của bạn !
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => handleContinueBooking()}
            style={{ padding: "10px" }}
            className="btn btn-secondary"
          >
            Tiếp tục mua vé trang này
          </button>
          <button
            onClick={() => handleBackToHome()}
            style={{ padding: "10px" }}
            className="btn btn-secondary"
          >
            Quay về trang chủ
          </button>
        </div>
      </Modal>
    </Fragment>
  );
}
