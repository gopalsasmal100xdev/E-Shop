import { useEffect } from "react";
import ShopLogin from "../auth/ShopLogin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const ShopLoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSelllerAuthenticated, seller } = useSelector(
    (state) => state.seller
  );

  useEffect(() => {
    if (isSelllerAuthenticated === true) {
      navigate(`/shop/dashboard`);
    }
  }, [dispatch, isSelllerAuthenticated, navigate, seller._id]);

  return <ShopLogin />;
};

export default ShopLoginPage;
