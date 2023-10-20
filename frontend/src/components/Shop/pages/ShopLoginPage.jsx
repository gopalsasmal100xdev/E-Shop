import { useEffect } from "react";
import ShopLogin from "../auth/ShopLogin";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const ShopLoginPage = () => {
  const navigate = useNavigate();
  const { isSelllerAuthenticated, seller } = useSelector(
    (state) => state.seller
  );

  useEffect(() => {
    if (isSelllerAuthenticated === true) {
      navigate(`/shop/dashboard`);
    }
  }, [isSelllerAuthenticated, navigate, seller._id]);

  return <ShopLogin />;
};

export default ShopLoginPage;
