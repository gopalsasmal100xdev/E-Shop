import { useEffect } from "react";
import ShopRegister from "../auth/ShopRegister";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ShopRegisterPage = () => {
  const navigate = useNavigate();
  const { isSelllerAuthenticated, seller } = useSelector(
    (state) => state.seller
  );
  useEffect(() => {
    if (isSelllerAuthenticated) {
      navigate(`/shop/dashboard`);
    }
  }, [isSelllerAuthenticated, navigate, seller._id]);
  return <ShopRegister />;
};

export default ShopRegisterPage;
