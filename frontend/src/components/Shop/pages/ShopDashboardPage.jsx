import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import ShopDashboardHero from "./ShopDashboardHero";

const ShopDashboardPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSidebar active={1} />
        </div>
        <ShopDashboardHero />
      </div>
    </div>
  );
};

export default ShopDashboardPage;
