import { Link } from "react-router-dom";
import { navItems } from "../../static/data";
import styles from "../../styles/styles";

/* eslint-disable react/prop-types */
const Navbar = ({ active }) => {
  return (
    <div className={`block md:${styles.noramlFlex}`}>
      {navItems.map((item, index) => (
        <div className="flex" key={index}>
          <Link
            to={item.url}
            className={`${
              active === index + 1
                ? "text-[#17dd1f]"
                : "text-black md:text-[#fff]"
            } pb-[30px] md:pb-0 font-[500] px-6 cursor-pointer}`}>
            {item.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
