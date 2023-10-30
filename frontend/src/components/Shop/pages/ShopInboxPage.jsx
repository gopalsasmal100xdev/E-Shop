import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import ShopInbox from "../inbox/ShopInbox";

const ShopInboxPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSidebar active={8} />
        </div>
        <div className="w-full justify-center flex">
          <ShopInbox />
        </div>
      </div>
    </div>
  );
};

export default ShopInboxPage;
