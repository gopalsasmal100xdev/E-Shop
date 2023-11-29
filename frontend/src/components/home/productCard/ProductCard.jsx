import { lazy, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
const ProductDetailsModal = lazy(() =>
  import("../../modals/ProductDetailsModal")
);
const Ratings = lazy(() => import("../../Products/Ratings"));
import { SERVER_URL } from "../../../constants/data";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/reducers/Cart";

/* eslint-disable react/prop-types */
const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const item_name = data.name;
  const item_id = data._id; // this id should be replaced with _id
  const product_name = item_name.replace(/\s+/g, "-");

  const addToCartHandler = (id) => {
    addToCart(dispatch, cartItems, id);
  };

  return (
    <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 duration-300">
      <div className="flex justify-end"></div>
      <Link to={`/products/${product_name}[]=${item_id}`}>
        {data.images && (
          <img
            src={`${SERVER_URL}/${data.images[0]}`}
            alt="products"
            className="w-full h-[170px] object-contain"
          />
        )}
      </Link>
      <Link to={`/shop/${data?.shop?._id}`}>
        {data.shop && (
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        )}
      </Link>

      <Link to={`/products/${product_name}[]=${item_id}`}>
        <h4 className="pb-3 font-[500]">
          {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
        </h4>
        <div className="flex">
          <Ratings rating={data?.rating} />
        </div>

        <div className="py-2 flex items-center justify-between">
          <div className="flex">
            <h5 className={`${styles.productDiscountPrice}`}>
              {data.originalPrice.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </h5>

            <h4 className={`${styles.price}`}>
              {data.originalPrice
                ? data.originalPrice.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })
                : null}
            </h4>
          </div>
          {data.total_sell && (
            <span className="font-[400] text-[17px] text-[#68d284]">
              {data.total_sell} sold
            </span>
          )}
        </div>
      </Link>

      {/* side option */}
      <div>
        {click ? (
          <AiFillHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            onClick={() => setClick((prev) => !prev)}
            color={click ? "red" : "#333"}
            title="Remove from wishlist"
          />
        ) : (
          <AiOutlineHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            onClick={() => setClick((prev) => !prev)}
            color={click ? "red" : "#333"}
            title="Add to wishlist"
          />
        )}
        <ProductDetailsModal data={data} />
        <AiOutlineShoppingCart
          size={25}
          className="cursor-pointer absolute right-2 top-24"
          onClick={() => addToCartHandler(data)}
          color="#444"
          title="Add to cart"
        />
      </div>
    </div>
  );
};

export default ProductCard;
