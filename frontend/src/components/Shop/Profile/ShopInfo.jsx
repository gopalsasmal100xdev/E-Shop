/* eslint-disable react/prop-types */
import { SERVER_SHOP_URL_API, SERVER_URL } from "../../../constants/data";
import styles from "../../../styles/styles";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { useSelector } from "react-redux";
import Ratings from "../../Products/Ratings";

const ShopInfo = ({ isOwner }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [seller, setSeller] = useState({});
  const { products } = useSelector((state) => state.products);

  const logoutHandler = () => {
    Cookies.remove("seller_token");
    toast.success("You successfully logged out from shop!");
    navigate("/");
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${SERVER_SHOP_URL_API}/get-shop-info/${id}`)
      .then((res) => {
        setLoading(false);
        setSeller(res.data?.shopInfo);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error("Failed to fetch shop details!");
      });
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center pt-5">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="50"
            visible={true}
          />
        </div>
      ) : (
        <div className="">
          <div className="w-full py-5">
            <div className="w-full flex item-center justify-center">
              {seller.avatar && (
                <img
                  src={`${SERVER_URL}/${seller.avatar?.url}`}
                  alt="shop-profile-image"
                  className="w-[150px] h-[150px] object-cover rounded-full"
                />
              )}
            </div>
            <h3 className="text-center py-2 text-[20px]">{seller.name}</h3>
            <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
              {seller.description}
            </p>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Address</h5>
            <h4 className="text-[#000000a6]">{seller.address}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Phone Number</h5>
            <h4 className="text-[#000000a6]">{seller.phoneNumber}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Total Products</h5>
            <h4 className="text-[#000000a6]">{products.length || 0}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Shop Ratings</h5>
            <Ratings rating={seller.ratings || 4.5} />
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Joined On</h5>
            <h4 className="text-[#000000b0]">
              {seller?.createdAt?.slice(0, 10)}
            </h4>
          </div>

          {isOwner && (
            <div className="py-3 px-4">
              <Link to="/shop/settings">
                <div
                  className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}>
                  <span className="text-white">Edit Shop</span>
                </div>
              </Link>
              <div
                className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                onClick={logoutHandler}>
                <span className="text-white">Log Out</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopInfo;
