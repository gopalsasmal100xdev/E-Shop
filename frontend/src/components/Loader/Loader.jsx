import Lottie from "react-lottie";
import animationData from "../../assets/animation/ecommerce-loader.json";
import successLoaderAnimate from "../../assets/animation/order-success.json";
import { CircularProgress } from "@mui/material";

export const Loader1 = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-full h-auto flex items-center justify-center">
      <Lottie options={defaultOptions} width={300} height={300} />
    </div>
  );
};
export const SuccessLoader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: successLoaderAnimate,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-full h-auto flex items-center justify-center">
      <Lottie options={defaultOptions} width={300} height={300} />
    </div>
  );
};

export const CircularLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-filter backdrop-blur-lg bg-opacity-20 z-999999">
      <CircularProgress />
    </div>
  );
};
