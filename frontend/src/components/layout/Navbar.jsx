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
            } pb-[30px] md:pb-0 font-[500] px-6 cursor-pointer ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300`}>
            {item.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
