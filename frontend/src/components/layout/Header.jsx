import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { categoriesData, productData } from "../../static/data";
import { useSelector } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowUp,
} from "react-icons/io";
import { RiCustomerService2Fill } from "react-icons/ri";
import Styles from "../../styles/styles";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { SERVER_URL } from "../../constants/data";
import { SkeletonCircle } from "@chakra-ui/react";
import { BiMenuAltLeft } from "react-icons/bi";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import CartDialog from "./CartDialog";
import WishListDialog from "./WishListDialog";

// eslint-disable-next-line react/prop-types
const Header = ({ activeHeading }) => {
  const [searchQuery, setSearchQuery] = useSearchParams({ query: "" });
  const searchQueryString = searchQuery.get("query");
  const [searchResult, setSearchResult] = useState([]);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openSlidebar, setOpenSlidebar] = useState(false);
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

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
        <div className="flex items-center justify-between pt-2">
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
            <Link to={`/shop/dashboard`}>
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
          <Menu as="div" className="relative inline-block text-left">
            <div onClick={() => setDropDown((prev) => !prev)}>
              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                All Categories
                {!dropDown ? (
                  <IoIosArrowDown size={20} />
                ) : (
                  <IoIosArrowUp size={20} />
                )}
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95">
              <Menu.Items className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <DropDown categoriesData={categoriesData} />
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          {/* Navitems */}

          <div className={`${Styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>
          <div className="flex gap-2">
            {/* wish list */}
            <div className={`${Styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px] ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300">
                <WishListDialog />
              </div>
            </div>

            {/* Cart list */}

            <div className={`${Styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px] ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300">
                <CartDialog />
              </div>
            </div>

            {/* Login user profile */}

            <div className={`${Styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px] ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300">
                {loading ? (
                  <SkeletonCircle size="10" />
                ) : (
                  <div>
                    {isAuthenticated ? (
                      <Link to="/profile">
                        {/* avtar url may be change later */}
                        <img
                          src={`${SERVER_URL}/${user.avatar.url}`}
                          alt="profile_img"
                          className="w-[35px] h-[35px] rounded-full object-cover"
                        />
                      </Link>
                    ) : (
                      <Link to="/login">
                        <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* mobile header */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
      w-full h-[60px] bg-[#101820] z-50 top-0 left-0 shadow-sm 800px:hidden`}>
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4 cursor-pointer"
              color="white"
              onClick={() => setOpenSlidebar((prev) => !prev)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
                className="mt-3 cursor-pointer"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </Link>
          </div>

          <div className="">
            {/* header sidebar */}
            {openSlidebar && (
              <div
                className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}>
                <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
                  <div className="my-8 w-[92%] m-auto h-[40px relative]">
                    <div className="flex gap-2">
                      <input
                        type="search"
                        placeholder="Search Product..."
                        className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                        value={searchQueryString || ""}
                        onChange={handleSearchChange}
                      />
                      <RxCross1
                        size={20}
                        className="cursor-pointer -mt-2"
                        onClick={() => setOpenSlidebar((prev) => !prev)}
                      />
                    </div>

                    {searchResult && (
                      <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                        {searchResult.map((item, index) => {
                          const d = item.name;
                          const Product_name = d.replace(/\s+/g, "-");
                          return (
                            <Link to={`/product/${Product_name}`} key={index}>
                              <div className="flex items-center">
                                <img
                                  src={`${item.image_Url[0].url}`}
                                  alt="product_image"
                                  className="w-[40px] h-[40px] mr-[10px]"
                                />
                                <img
                                  src={`${item.image_Url[0].url}`}
                                  alt=""
                                  className="w-[50px] mr-2"
                                />
                                <h5>{item.name}</h5>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <Navbar active={activeHeading} />
                  <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                    <Link to="/create-shop">
                      <h1 className="text-[#fff] flex items-center">
                        Become Seller <IoIosArrowForward className="ml-1" />
                      </h1>
                    </Link>
                  </div>
                  <br />
                  <br />
                  <div className="flex w-full justify-center">
                    {isAuthenticated ? (
                      <div>
                        <Link to="/profile">
                          <img
                            src={`${SERVER_URL}/${user.avatar.url}`}
                            alt="profile_img"
                            className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                          />
                        </Link>
                      </div>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="text-[18px] pr-[10px] text-[#000000b7]">
                          Login
                        </Link>
                        <Link
                          to="/sign-up"
                          className="text-[18px] text-[#000000b7]">
                          Sign up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-3 mr-3">
            <CartDialog />
            <WishListDialog />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
