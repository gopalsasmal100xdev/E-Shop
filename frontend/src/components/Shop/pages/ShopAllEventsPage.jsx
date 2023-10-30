import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import ShopEvents from "../events/ShopEvents";

const ShopAllEventsPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSidebar active={5} />
        </div>
        <div className="w-full justify-center flex">
          <ShopEvents />
        </div>
      </div>
    </div>
  );
};

export default ShopAllEventsPage;
