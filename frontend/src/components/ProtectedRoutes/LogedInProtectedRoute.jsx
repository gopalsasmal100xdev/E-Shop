/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const LogedInProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  if (!loading) {
    if (!isAuthenticated) return <Navigate to={"/login"} replace />;
  }

  return children;
};

export default LogedInProtectedRoute;
