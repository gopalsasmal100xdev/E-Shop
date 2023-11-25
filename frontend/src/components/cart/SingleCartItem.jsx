/* eslint-disable react/prop-types */
import { useState } from "react";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import toast from "react-hot-toast";
import { SERVER_URL } from "../../constants/data";
import { useDispatch } from "react-redux";
import {
  decrementItemQuantity,
  incrementItemQuantity,
  removeFromCart,
} from "../../redux/reducers/Cart";
import { FaRegTrashCan } from "react-icons/fa6";

const SingleCartItem = ({ data }) => {
  const [value, setValue] = useState(data.qty || 1);
  const totalPrice = data.discountPrice * value;
  const dispatch = useDispatch();

  function increment(item) {
    if (value >= item.stock) {
      toast.error("Product stock is out of range");
    } else {
      setValue((prev) => prev + 1);
      dispatch(incrementItemQuantity({ ...data, qty: value }));
    }
  }
  function decrement() {
    if (value > 1) {
      setValue((prev) => prev - 1);
      dispatch(decrementItemQuantity({ ...data, qty: value }));
    }
  }

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => increment(data)}>
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px]">{value}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => decrement(data)}>
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img
          src={`${SERVER_URL}/${data?.images?.[0]}`}
          alt="product_image"
          className="w-[50px] h-min ml-2 mr-2 rounded-[5px]"
        />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ₹ {data.discountPrice} * {value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            {totalPrice.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </h4>
        </div>
        <div className="ml-auto">
          <FaRegTrashCan
            color="red"
            className="cursor-pointer"
            title="Remove"
            onClick={() => {
              removeFromCart(dispatch, data._id);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleCartItem;
