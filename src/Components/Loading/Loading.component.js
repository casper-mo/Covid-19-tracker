import React from "react";
import Lottie from "react-lottie";
import CovidLoading from "../../Assets/covid-19.json";

const lodaingLottieOptions = {
  loop: true,
  autoplay: true,
  animationData: CovidLoading,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const Loading = () => (
  <Lottie options={lodaingLottieOptions} width={"50%"} height={"30%"} />
);

export default Loading;
