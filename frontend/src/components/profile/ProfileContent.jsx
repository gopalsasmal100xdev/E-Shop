import Profile from "../Profile/Profile";
import AllOrders from "../Orders/AllOrders";
import RefoundPage from "../Refound/RefoundPage";
import InboxPage from "../Message/InboxPage";
import TrackOrderPage from "../Orders/TrackOrderPage";

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
