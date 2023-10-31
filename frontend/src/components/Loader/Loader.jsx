import Lottie from "react-lottie";
import animationData from "../../assets/animation/ecommerce-loader.json";
import successLoaderAnimate from "../../assets/animation/order-success.json";

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
