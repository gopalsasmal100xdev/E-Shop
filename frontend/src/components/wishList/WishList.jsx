// import { useSelector } from "react-redux";
import { AiOutlineHeart } from "react-icons/ai";
import NoData from "../../../src/assets/svg/Questions-amico.svg";
import styles from "../../styles/styles";
import SingleWishListItem from "./SingleWishListItem";

const WishList = () => {
  // const { wishListItems } = useSelector((state) => state.wishList);
  const wishListItems = [
    {
      id: 1,
      name: "Iphone 14 pro max 256gb ssd silver color gorila glass 5 protection",
      qty: 1,
      discountPrice: 10,
    },
    {
      id: 2,
      name: "mac Book 8GB ram 1TB hard disk amolade display bright screen 2x battery efficency",
      qty: 5,
      discountPrice: 10,
    },
    { id: 3, name: "keyboard", qty: 2, discountPrice: 10 },
  ];
  return (
    <div>
      {wishListItems && wishListItems.length > 0 ? (
        <div>
          <div className={`${styles.noramlFlex} p-4`}>
            <AiOutlineHeart size={25} />
            <h5 className="pl-2 text-[20px] font-[500]">
              {wishListItems && wishListItems.length} items
            </h5>
          </div>

          {/* Wish List items */}
          <br />
          <div className="w-full border-t">
            {wishListItems &&
              wishListItems.map((item, index) => (
                <SingleWishListItem key={index} data={item} />
              ))}
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

export default WishList;
