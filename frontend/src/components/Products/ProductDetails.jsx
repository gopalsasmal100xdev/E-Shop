/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import No_data_found from "../../assets/svg/no-data-found.svg";
import styles from "../../styles/styles";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { FaCartArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProductDetailsInfo from "./ProductDetailsInfo";
import { SERVER_URL } from "../../constants/data";
import Ratings from "./Ratings";
import { addToCart } from "../../redux/reducers/Cart";
import { useDispatch, useSelector } from "react-redux";

const ProductDetails = ({ data }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState(1);
  const [select, setSelect] = useState(0);
  const [wishClick, setWishClick] = useState(false);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const removeFromWishlistHandler = () => {
    setWishClick((prev) => !prev);
  };
  const addToWishlistHandler = () => {
    setWishClick((prev) => !prev);
  };
  const addToCartHandler = () => {
    addToCart(dispatch, cartItems, { ...data, qty: value });
  };
  const handleMessageSubmit = () => {
    navigate("/inbox/id");
  };

  useEffect(() => {
    setSelect(0);
  }, [data?._id]);

  return (
    <>
      <div className="bg-slate-100">
        {data ? (
          <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
            <div className="w-full py-5">
              <div className="block w-full 800px:flex">
                <div className="w-full 800px:w-[50%]">
                  <img
                    src={`${SERVER_URL}/${data.images?.[select]}`}
                    alt="product_image"
                    className="w-[80%] rounded-xl"
                  />
                  <div className="w-full flex gap-4 p-4">
                    {data.images?.map((item, index) => (
                      <div
                        key={index}
                        className={`${
                          select === index
                            ? "shadow-xl border border-red-300 rounded-lg bg-gray-50"
                            : ""
                        } cursor-pointer`}>
                        <img
                          src={`${SERVER_URL}/${item}`}
                          alt="alternate image"
                          className="h-[200px] overflow-hidden rounded-xl object-cover"
                          onClick={() => setSelect(index)}
                        />
                      </div>
                    ))}
                    <div
                      className={`${
                        select === 1 ? "border" : "null"
                      } cursor-pointer`}></div>
                  </div>
                </div>
                <div className="w-full 800px:w-[50%] pt-5">
                  <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                  <p>{data.description}</p>
                  <div className="flex pt-3">
                    <h4 className={`${styles.productDiscountPrice}`}>
                      {data.discountPrice?.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </h4>
                    <h3 className={`${styles.price}`}>
                      {data.originalPrice
                        ? data.originalPrice?.toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                        : null}
                    </h3>
                  </div>
                  <div className="flex items-center mt-12 justify-between pr-3">
                    <div className="">
                      <button
                        className="bg-gradient-to-r from-teal-300 to-teal-500 text-white font-bold rounded-md px-4 ml-1 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                        onClick={() =>
                          setValue((prev) => (prev > 1 ? prev - 1 : prev))
                        }>
                        -
                      </button>
                      <span className="bg-gray-200 text-gray-800 font-medium px-4 ml-1 py-[11px] rounded-md">
                        {value}
                      </span>
                      <button
                        className="bg-gradient-to-r from-teal-300 to-teal-500 text-white font-bold rounded-md px-4 ml-1 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                        onClick={() => setValue((prev) => prev + 1)}>
                        +
                      </button>
                    </div>
                    <div>
                      {wishClick ? (
                        <AiFillHeart
                          size={30}
                          className="cursor-pointer"
                          onClick={() => removeFromWishlistHandler(data)}
                          color={wishClick ? "red" : "#333"}
                          title="Remove from wishlist"
                        />
                      ) : (
                        <AiOutlineHeart
                          size={30}
                          className="cursor-pointer"
                          onClick={() => addToWishlistHandler(data)}
                          color={wishClick ? "red" : "#333"}
                          title="Add to wishlist"
                        />
                      )}
                    </div>
                  </div>
                  <div
                    className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                    onClick={() => addToCartHandler(data._id)}>
                    <span className="text-white flex items-center">
                      Add to cart
                      <FaCartArrowDown
                        size={23}
                        color="#cc99ff"
                        className="ml-2"
                      />
                    </span>
                  </div>
                  {data && (
                    <div className="flex items-center pt-8">
                      <Link to={`/shop/${data?.shop?._id}`}>
                        <img
                          src={`${SERVER_URL}/${data.shop?.avatar?.url}`}
                          alt=""
                          className="w-[50px] h-[50px] object-cover rounded-full mr-2"
                        />
                      </Link>
                      <div className="pr-8">
                        <Link to={`/shop/${data?.shop?._id}`}>
                          <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                            {data.shop?.name}
                          </h3>
                        </Link>
                        <h5 className="pb-3 text-[15px]">
                          <Ratings rating={data?.shop?.rating || 4.5} />
                        </h5>
                      </div>
                      <div
                        className={`${styles.button}`}
                        onClick={handleMessageSubmit}
                        title="Chat with shopkeeper">
                        <span className="text-white flex items-center">
                          Send Message
                          <AiOutlineMessage
                            size={25}
                            className="ml-1"
                            color="lightgreen"
                          />
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <ProductDetailsInfo data={data} />
            <br />
            <br />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
            className="h-screen">
            <img
              src={No_data_found}
              alt="no_data_found"
              style={{ width: "400px" }}
            />
            <h1 className="text-center w-full pb-[100px] text-[20px]">
              No data Found!
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
