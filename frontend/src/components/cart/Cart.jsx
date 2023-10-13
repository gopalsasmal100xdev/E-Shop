import { useSelector } from "react-redux";
import { IoBagHandleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import SingleCartItem from "./SingleCartItem";

import NoData from "../../../src/assets/svg/Questions-amico.svg";
import styles from "../../styles/styles";
import { useEffect, useState } from "react";

// const cartItems = [
//   { id: 1, name: "Iphone", qty: 1, discountPrice: 10 },
//   { id: 2, name: "mac Book", qty: 5, discountPrice: 10 },
//   { id: 3, name: "keyboard", qty: 2, discountPrice: 10 },
// ];

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const price = cartItems.reduce((acc, item) => {
      return acc + item.discountPrice * item.qty;
    }, 0);
    setTotalPrice(price);
  }, [cartItems]);
  return (
    <div>
      {cartItems && cartItems.length > 0 ? (
        <div className="">
          <div className={`${styles.noramlFlex} p-4`}>
            <IoBagHandleOutline size={25} />
            <h5 className="pl-2 text-[20px] font-[500]">
              {cartItems.length} items
            </h5>
          </div>
          {/* Cart items */}
          <div className="w-full border-t">
            {cartItems &&
              cartItems.map((item, index) => (
                <SingleCartItem key={index} data={item} />
              ))}
          </div>
          <div className="px-5 mb-3">
            {/* checkout buttons */}
            <Link to="/checkout">
              <div
                className={`h-[45px] flex items-center justify-center w-[100%] bg-[#3944d3] rounded-[5px]`}>
                <h1 className="text-[#fff] text-[18px] font-[600]">
                  Checkout Now (USD ${totalPrice})
                </h1>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <img src={NoData} alt="no_data_found" style={{ width: "400px" }} />
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No Items Found!
          </h1>
        </div>
      )}
    </div>
  );
};

export default Cart;
