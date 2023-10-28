import { AiOutlineShoppingCart } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";
import EventCountDown from "./EventCountDown";
import { useEffect } from "react";

const EventCard = () => {
  useEffect(() => {
    window.scrollTo(2, 2);
  }, []);

  return (
    <div className="w-full block bg-white rounded-lg lg:flex p-2">
      <div className="w-full lg:-w[50%] m-auto">
        <img
          src="https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-space-black-220907-geo_inline.jpg.large.jpg"
          alt="event-product-image"
        />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        {/* TODO : this dymmy data will replace with dynamic data */}
        <h2 className={`${styles.productTitle}`}>
          Iphone 14 pro max 256gb ssd
        </h2>
        <p className="text-start text-[18px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi adipisci
          rerum facilis officia totam praesentium inventore ducimus id veniam
          minus repellat dolorem accusantium voluptate, sint velit vel maxime
          provident dicta. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Nisi adipisci rerum facilis officia totam praesentium inventore
          ducimus id veniam minus repellat dolorem accusantium voluptate, sint
          velit vel maxime provident dicta.
        </p>

        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              ₹ 1,59,900
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              ₹ 1,79,900
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {(59, 900)} sold
          </span>
        </div>
        {/* Event Countdown  */}
        <EventCountDown />
        <br />
        <div className="flex items-center">
          {/*TODO:-  thid route replace with dynamic route */}
          {/* `/product/${data._id}?isEvent=true` */}
          <Link to={`/`}>
            <div className={`${styles.button} text-[#fff]`}>
              See Details
              <TbListDetails size={20} className="ml-2" color="#5BCEFA" />
            </div>
          </Link>
          <div
            className={`${styles.button} text-[#fff] ml-5`}
            onClick={() => {}}>
            Add to cart
            <AiOutlineShoppingCart size={22} className="ml-2" color="green" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
