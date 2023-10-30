import ShopInfo from "./ShopInfo";
import styles from "../../../styles/styles";
import ShopProfileData from "./ShopProfileData";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ShopProfilePage = () => {
  const { seller } = useSelector((state) => state.seller);
  const { id } = useParams();
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <div className="w-full flex py-10 justify-between">
        <div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] sticky top-10 left-0 z-10">
          <ShopInfo isOwner={id === seller._id} />
        </div>
        <div className="w-[72%] rounded-[4px]">
          <ShopProfileData isOwner={id === seller._id} />
        </div>
      </div>
    </div>
  );
};

export default ShopProfilePage;
