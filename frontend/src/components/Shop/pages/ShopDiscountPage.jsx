import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import ShopDiscount from "../discount/ShopDiscount";

const ShopDiscountPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSidebar active={9} />
        </div>
        <div className="w-full justify-center flex">
          <ShopDiscount />
        </div>
      </div>
    </div>
  );
};

export default ShopDiscountPage;
