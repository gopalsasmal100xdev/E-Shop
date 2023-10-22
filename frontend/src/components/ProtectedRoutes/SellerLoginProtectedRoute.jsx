/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Loader1 } from "../Loader/Loader";

const SellerLoginProtectedRoute = ({ children }) => {
  const { loading, isSelllerAuthenticated } = useSelector(
    (state) => state.seller
  );

  if (loading) {
    return <Loader1 />;
  } else {
    if (!isSelllerAuthenticated) return <Navigate to={"/shop/login"} replace />;
    return children;
  }
};

export default SellerLoginProtectedRoute;
