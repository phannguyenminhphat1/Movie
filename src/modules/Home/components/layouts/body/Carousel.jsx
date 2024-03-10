import React, { Fragment, useEffect, useState } from "react";
import { Carousel } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { GetBannerAction } from "../../../../../redux/actions/BannerAction";

export default function HomeCarousel() {
  const data = useSelector((state) => state.BannerReducer.arrBanner);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      dispatch(GetBannerAction());
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const renderBanner = () => {
    return data.map((item, index) => {
      return (
        <div key={index}>
          <div
            className="carousel__content"
            style={{ backgroundImage: `url(${item.hinhAnh})` }}
          >
            <img
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={item.hinhAnh}
              className="opacity-0"
              alt="none"
            />
          </div>
        </div>
      );
    });
  };

  if (isLoading) {
    return <h1 className="text-center">.... LOADING</h1>;
  }
  return (
    <Fragment>
      <Carousel autoplay className="carousel">
        {renderBanner()}
      </Carousel>
    </Fragment>
  );
}
