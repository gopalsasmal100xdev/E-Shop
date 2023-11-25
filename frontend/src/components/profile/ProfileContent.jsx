import { lazy } from "react";
const Profile = lazy(() => import("../Profile/Profile"));
const AllOrders = lazy(() => import("../Orders/AllOrders"));
const RefoundPage = lazy(() => import("../Refound/RefoundPage"));
const InboxPage = lazy(() => import("../Message/InboxPage"));
const TrackOrderPage = lazy(() => import("../Orders/TrackOrderPage"));

/* eslint-disable react/prop-types */
const ProfileContent = ({ active }) => {
  return (
    <>
      <div className="w-full">
        {/* Profile */}
        {active === 1 && <Profile />}

        {/* order */}
        {active === 2 && (
          <div>
            <AllOrders />
          </div>
        )}

        {/* Refound */}
        {active === 3 && (
          <div>
            <RefoundPage />
          </div>
        )}

        {/* Inbox */}
        {active === 4 && (
          <div>
            <InboxPage />
          </div>
        )}

        {/* Track Order */}
        {active === 5 && (
          <div>
            <TrackOrderPage />
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileContent;
