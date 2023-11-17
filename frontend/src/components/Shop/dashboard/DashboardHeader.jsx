import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { Link } from "react-router-dom";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../../../constants/data";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);
  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div className="">
        <Link to="/shop/dashboard">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt="logo"
          />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/shop/coupons" className="800px:block hidden">
            <AiOutlineGift
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
              title="Coupons"
            />
          </Link>
          <Link to="/shop/events" className="800px:block hidden">
            <MdOutlineLocalOffer
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
              title="Events"
            />
          </Link>
          <Link to={`/shop/${seller._id}`} className="800px:block hidden">
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
              title="Products"
            />
          </Link>
          <Link to="/shop/orders" className="800px:block hidden">
            <FiPackage
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
              title="Orders"
            />
          </Link>
          <Link to="/shop/inbox" className="800px:block hidden">
            <BiMessageSquareDetail
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          {seller.avatar && (
            <Link to={`/shop/${seller._id}`}>
              <img
                src={`${SERVER_URL}/${seller.avatar?.url}`}
                alt=""
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
