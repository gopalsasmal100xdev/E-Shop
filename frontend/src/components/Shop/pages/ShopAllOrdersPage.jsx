import ShopAllOrders from "../Orders/ShopAllOrders";
import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardSidebar from "../dashboard/DashboardSidebar";

const ShopAllOrdersPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSidebar active={2} />
        </div>
        <div className="w-full justify-center flex">
          <ShopAllOrders />
        </div>
      </div>
    </div>
  );
};

export default ShopAllOrdersPage;
