import React from "react";
import HomeCarousel from "../components/layouts/body/Carousel";
import ListCardMovie from "../components/layouts/body/ListCardMovie";
import TheaterComplex from "../components/layouts/body/TheaterComplex";
import Search from "../components/layouts/body/Search";

export default function HomePage() {
  return (
    <div>
      <div className="carousel__search">
        <HomeCarousel />
        <Search />
      </div>

      <ListCardMovie />
      <TheaterComplex />
    </div>
  );
}
