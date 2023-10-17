import { useState } from "react";
import styles from "../../styles/styles";
import Header from "../layout/Header";
import ProfileContent from "./ProfileContent";
import ProfileSidebar from "./ProfileSidebar";
import { useSelector } from "react-redux";

function ProfilePage() {
  const { loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);
  return (
    <div>
      <Header />
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
          <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
            <ProfileSidebar active={active} setActive={setActive} />
          </div>
          <ProfileContent active={active} />
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
