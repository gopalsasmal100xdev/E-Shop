import { lazy } from "react";
const DashboardHeader = lazy(() => import("../dashboard/DashboardHeader"));
const DashboardSidebar = lazy(() => import("../dashboard/DashboardSidebar"));
const ShopDashboardHero = lazy(() => import("./ShopDashboardHero"));

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
