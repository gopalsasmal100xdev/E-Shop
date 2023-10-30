/* eslint-disable react/prop-types */
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineFullscreen,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";

const ProductDetailsModal = ({ data }) => {
  const [click, setClick] = useState(false);
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const item_name = data.name;
  const item_id = data.id; // TODO after depoly this should be _id
  const product_name = item_name.replace(/\s+/g, "-");

  const incrementCount = () => {
    if (count > 1) setCount((prev) => prev - 1);
  };
  const decrementCount = () => {
    if (count <= 9) setCount((prev) => prev + 1);
  };

  const handleMessageSubmit = () => {};

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AiOutlineEye
        size={22}
        className="cursor-pointer absolute right-2 top-14"
        onClick={handleClickOpen}
        color="#333"
        title="Quick view"
      />

      <Dialog maxWidth={"lg"} open={open} onClose={handleClose}>
        <DialogContent>
          <AiOutlineFullscreen
            size={25}
            className="cursor-pointer absolute top-5 left-5"
            onClick={() => {
              handleClose();
              navigate(`/products/${product_name}[]=${item_id}`);
            }}
            title="Product full details"
          />
          <div className="block w-full md:flex">
            <div className="w-full">
              <img
                src={`${data.image_Url && data.image_Url[0]?.url}`}
                alt="product_image"
              />
              <div className="flex">
                {/* this link will be replace with Shop link */}
                <Link to={"/"} className="flex">
                  <img
                    src={data.shop.shop_avatar.url}
                    alt="shop"
                    className="w-[50px] h-[50px] bg-cover rounded-full mr-2"
                  />
                  <div>
                    <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                    {data.shop && (
                      <h5 className="pb-3 text-[15px]">
                        ({data.shop.ratings}) Ratings
                      </h5>
                    )}
                  </div>
                </Link>
              </div>
              <div
                className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`}
                onClick={handleMessageSubmit}>
                <span className="text-[#fff] flex items-center">
                  Send Message
                  <AiOutlineMessage size={20} className="ml-2" color="cyan" />
                </span>
              </div>
              {data.total_sell && (
                <h5 className="text-[16px] text-[red] mt-5">
                  ({data.total_sell}) Sold out
                </h5>
              )}
            </div>
            {/* product description */}
            <div className="w-full pt-5 pl-[5px] pr-[5px]">
              <h1 className={`${styles.productTitle} text-[20px]`}>
                {data.name}
              </h1>
              <p>{data.description}</p>

              <div className="flex pt-3">
                <h4 className={`${styles.productDiscountPrice}`}>
                  {data.discount_price ? "₹ " + data.discount_price : null}
                </h4>
                <h3 className={`${styles.price}`}>
                  {data.price ? "₹ " + data.price : null}
                </h3>
              </div>
              <div className="flex items-center mt-12 justify-between pr-3">
                <div className="flex gap-2">
                  <button
                    className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-md px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                    onClick={() => incrementCount()}>
                    -
                  </button>
                  <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px] rounded-md">
                    {count}
                  </span>
                  <button
                    className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-md px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                    onClick={() => decrementCount()}>
                    +
                  </button>
                </div>
                <div>
                  {click ? (
                    <AiFillHeart
                      size={30}
                      className="cursor-pointer"
                      onClick={() => setClick((prev) => !prev)}
                      color={click ? "red" : "#333"}
                      title="Remove from wishlist"
                    />
                  ) : (
                    <AiOutlineHeart
                      size={30}
                      className="cursor-pointer"
                      onClick={() => setClick((prev) => !prev)}
                      title="Add to wishlist"
                    />
                  )}
                </div>
              </div>
              <div
                className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                onClick={() => {}}>
                <span className="text-[#fff] flex items-center">
                  Add to cart
                  <AiOutlineShoppingCart
                    size={20}
                    className="ml-2"
                    color="green"
                  />
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductDetailsModal;
