import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import ShopRefunds from "../refund/ShopRefunds";

const ShopRefundsPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSidebar active={10} />
        </div>
        <div className="w-full justify-center flex">
          <ShopRefunds />
        </div>
      </div>
    </div>
  );
};

export default ShopRefundsPage;
