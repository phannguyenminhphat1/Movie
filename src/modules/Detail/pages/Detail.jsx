import React, { useEffect } from "react";
import "react-circular-progressbar/dist/styles.css";
import DetailBanner from "../components/DetailBanner";
import DetailInfo from "../components/DetailInfo";
import { useParams } from "react-router-dom";

export default function Detail() {
  const params = useParams();

  return (
    <div className="detail">
      <DetailBanner movieId={params.id} />
      <DetailInfo movieId={params.id} />
    </div>
  );
}
