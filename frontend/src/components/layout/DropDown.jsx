/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { Menu } from "@headlessui/react";

const DropDown = ({ categoriesData }) => {
  return (
    <div className="pb-4 w-[270px] h-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm overflow-y-auto">
      {categoriesData &&
        categoriesData.map((item, index) => (
          <Menu.Item key={index}>
            <Link
              to={`/products?category=${item.title}`}
              className={`${styles.noramlFlex} hover:bg-slate-200 ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 duration-300 rounded-md cursor-pointer`}>
              <img
                src={item.image_Url}
                style={{
                  width: "25px",
                  height: "25px",
                  objectFit: "contain",
                  marginLeft: "10px",
                  userSelect: "none",
                }}
                alt="categories_img"
              />
              <h3 className="m-3 cursor-pointer select-none">{item.title}</h3>
            </Link>
          </Menu.Item>
        ))}
    </div>
  );
};

export default DropDown;
