/* eslint-disable react/prop-types */
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";

const SingleWishListItem = ({ data }) => {
  const totalPrice = data.discountPrice * data.qty;

  return (
    <div className="border-b p-4">
      <div className="w-full 800px:flex items-center flex-row justify-around">
        <RxCross1
          className="cursor-pointer 800px:mb-['unset'] 800px:ml-['unset'] m-2"
          title="Remove from wish list"
        />
        <img
          src={`data:image/png;base64,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`}
          alt=""
          className="w-[60px] h-min ml-2 mr-2 rounded-[5px]"
        />
        <div className="w-[230px] pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ${data.discountPrice} * {data.qty}
          </h4>
          <h4 className="font-[600] text-[13px] pt-[3px] text-[#d02222] font-Roboto">
            US${totalPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus
            size={20}
            className="cursor-pointer"
            title="Add to cart"
          />
        </div>
      </div>
    </div>
  );
};

export default SingleWishListItem;
