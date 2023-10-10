import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { categoriesData, productData } from "../../static/data";
import { useSelector } from "react-redux";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RiCustomerService2Fill } from "react-icons/ri";
import { BiMenuAltLeft } from "react-icons/bi";
import Styles from "../../styles/styles";
import DropDown from "./DropDown";
import Navbar from "./Navbar";

// eslint-disable-next-line react/prop-types
const Header = ({ activeHeading }) => {
  const [searchQuery, setSearchQuery] = useSearchParams({ query: "" });
  const searchQueryString = searchQuery.get("query");
  const [searchResult, setSearchResult] = useState([]);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  // scroll action
  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) setActive(true);
    else setActive(false);
  });

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(
      (prev) => {
        prev.set("query", query);
        return prev;
      },
      { replace: true }
    );
  };

  useEffect(() => {
    const filteredProducts =
      productData &&
      searchQueryString &&
      productData.filter((product) =>
        product.name.toLowerCase().includes(searchQueryString.toLowerCase())
      );
    setSearchResult(filteredProducts);
  }, [searchQueryString, setSearchResult]);

  return (
    <>
      {/* Section */}
      <div className="w-11/12 mx-auto">
        <div className="flex items-center justify-between pt-4">
          <div className="">
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt="logo"
              />
            </Link>
          </div>

          {/* Search Box */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchQueryString || ""}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />

            {searchResult && searchResult.length > 0 ? (
              <div className="absolute bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchResult.length > 0 &&
                  searchResult.map((item, index) => {
                    //! TODO: this should be replace with product _id
                    const name = item.name || "";
                    const linkUrl = name.replace(/\s+/g, "-");
                    return (
                      <Link to={linkUrl} key={index}>
                        <div className="w-full flex items-start-py-3">
                          <img
                            src={`${item.image_Url[0].url}`}
                            alt="product_image"
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{item.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>
          {/* Became a seller */}
          <div className={`${Styles.button} bg-[#3c2eff] hover:bg-[#4d97ff]`}>
            <Link to={"/seller"}>
              <h1 className="text-[#fff] flex items-center">
                Become Seller
                <RiCustomerService2Fill
                  className="ml-2"
                  size={20}
                  color="cyan"
                />
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${
          active ? "shadow-sm fixed top-0 left-0 z-10" : ""
        } transition hidden md:flex items-center justify-between w-full bg-[#101820FF] h-[70px] rounded-md`}>
        <div
          className={`${Styles.section} relative ${Styles.noramlFlex} justify-between`}>
          {/*  Categories  */}
          <div onClick={() => setDropDown((prev) => !prev)}>
            <div className="relative h-[55px] mt-[10px] w-[270px] hidden md:block">
              {/* <Select
                variant="filled"
                placeholder="All Categories"
                icon={<IoMdArrowDropdown />}
                className="cursor-pointer">
                {categoriesData &&
                  categoriesData.map((item, index) => {
                    return (
                      <section
                        value={item}
                        key={index}
                        className={`${Styles.noramlFlex}`}>
                        <img
                          src={item.image_Url}
                          alt="categorieImage"
                          style={{
                            width: "25px",
                            height: "25px",
                            objectFit: "contain",
                            marginLeft: "10px",
                            userSelect: "none",
                          }}
                        />
                        {item.title}
                      </section>
                    );
                  })}
              </Select> */}
              <BiMenuAltLeft
                size={27}
                className="absolute top-3 left-2 cursor-pointer"
              />
              <button className="h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md">
                All Categories
              </button>
              {!dropDown ? (
                <IoIosArrowDown
                  size={20}
                  className="absolute right-2 top-4 cursor-pointer"
                />
              ) : (
                <IoIosArrowUp
                  size={20}
                  className="absolute right-2 top-4 cursor-pointer"
                />
              )}
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : (
                <></>
              )}
            </div>
          </div>

          {/* Navitems */}

          <div className={`${Styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>
          {/*  */}
          <div className="flex">
            {/* wish list */}
            <div className={`${Styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px] ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300">
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                {/* TODO:- false will replace with wish list length */}
                {false && (
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                    {/* {wishlist && wishlist.length} */} 0
                  </span>
                )}
              </div>
            </div>

            {/* Cart list */}

            <div className={`${Styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px] ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300">
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                {/* false will be replace with cart length*/}
                {false && (
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                    {/* {cart && cart.length} */} 0
                  </span>
                )}
              </div>
            </div>

            {/* Login user profile */}

            <div className={`${Styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px] ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300">
                {isAuthenticated ? (
                  <Link to="/profile">
                    {/* avtar url may be change later */}
                    <img
                      src={user?.avatar?.url}
                      alt="profile_img"
                      className="w-[35px] h-[35px] rounded-full"
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>

            {/* Cart popup */}

            {/* wish list popup */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
