import React from "react";
import "../../../../../styles/styleLayout.scss";

export default function CardMovieItem({ item }) {
  return (
    <div className="cardMovie__item">
      <div className="p-1 rounded-md">
        <img
          src={item.hinhAnh}
          alt="khong"
          className="object-cover object-center w-full rounded-md h-72"
        />
        <div className="mt-6 mb-2">
          <span className="block text-xs font-medium tracki uppercase dark:text-violet-400">
            Đánh giá: {item.danhGia}
          </span>

          <h2 className="text-lg font-semibold h-14">{item.tenPhim}</h2>
        </div>
        <p className="dark:text-gray-100">
          {item.moTa.length >= 100 ? (
            <span>{item.moTa.slice(0, 100)} ...</span>
          ) : (
            item.moTa
          )}
        </p>
      </div>
    </div>
  );
}
